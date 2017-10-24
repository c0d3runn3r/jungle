const Jungle=require("./lib/Jungle.js");
const Player=require("./lib/Player.js");
const Uuid=require("uuid/v4");
const Sockhop=require("sockhop");
const log = require("bunyan").createLogger({"name":"jungle"});
const nconf = require('nconf');


log.level("debug");

// Read the config
nconf.argv().file({ file: 'config.json' });

// Create the Jungle and start it
var jungle=new Jungle();
jungle.start();

// Create the server
let server=new Sockhop.server({address: nconf.get("server").address, port: nconf.get("server").port, peer_type: "json" });
server
	.on("connect", (sock)=>{

		// Create new player
		let p=new Player("Mystery "+jungle.random_name(), Uuid(), sock);

		// Tell the client who they are
		server.send(sock, { set: { id : p.id, name: p.name} });

		// Add the player
		jungle.add_player(p);
		log.info(`${p.name} connected`);

		// Broadcast the news (after this event exits .. // sockhop bug?)
		setTimeout(()=>{
			server.sendall({ 
				"event" : "add",
				"type" : "player",
				"id" : p.id,
				"attributes" : {

					"name" :  p.name,
					"position" : p.get_position()
				}
			});
		},0);

	})
	.on("disconnect", (sock)=>{

		// Find this player
		let p=jungle.get_player_by_sock(sock);

		// jungle.delete_player sends data to everyone, which causes a second disconnect event for us.  // sockhop bug?  Anyway, the second time the player has already been removed and p===null.  I suspect Sockhop fires disconnect before removing the socket from its list
		if(p) {

			// Remove it
			jungle.delete_player(p);
			log.info(`${p.name} disconnected`);

			// Broadcast the news
			server.sendall({ 
				"event" : "delete",
				"type" : "player",
				"id" : p.id
			});
		}


	})
	.on("error", (e)=>{

		log.error("Sockhop error: "+e);
	})
	.on("receive", (obj, meta)=>{

		if(meta.type=="Request"){

			log.error("Received data - don't know what to do with it - "+obj);
			//meta.callback(self._handle_request(obj, meta.socket));
		}
});

// Broadcast move events
jungle.on("move_player", (p)=>{

	server.sendall({ 
		"event" : "move",
		"type" : "player",
		"id" : p.id,
		"attributes" : {
			"position" : p.get_position()
		}
	});
});


// Use the runloop to watch the game
jungle.runloop((jungle /*,dt*/ )=>{

	for(let p of jungle.players) {

		//console.log(`${p.name} position: ${p.get_position()} velocity: ${p.get_velocity()}`);
	}

});

// Start the game
server.listen().then(()=>{

	log.info("Server listening");
});
//server.close();

