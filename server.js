const Jungle=require("./lib/Jungle.js");
const Player=require("./lib/Player.js");
const Uuid=require("uuid/v4");
const Sockhop=require("sockhop");
// const Sockhop=require("../sockhop/index.js");
const log = require("bunyan").createLogger({"name":"jungle"});
const nconf = require('nconf');
const Victor=require("victor");


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
		let player=new Player(jungle.random_name(), Uuid(), sock);

		// Tell the client who they are
		server.send(sock, { set: { id : player.id, name: player.name} });

	 	// Give player a random position
	 	player.set_position(Victor().randomize(Victor(-100,100), Victor(100,-100)));

		// Add the player
		jungle.add_player(player);
		log.info(`${player.name} connected`);

		// Broadcast the news of this new player
			server.sendall({ 
				"event" : "add",
				"type" : "player",
				"id" : player.id,
				"attributes" : {

					"name" :  player.name,
					"position" : player.get_position()
				}
			});

		// Send "add" events for all the other players to this player
		for(let p of jungle._players) {

			// Tell the new player about all the others
			if(p.id!=player.id){

				server.send(sock, { 
					"event" : "add",
					"type" : "player",
					"id" : p.id,
					"attributes" : {

						"name" :  p.name,
						"position" : p.get_position()
					}
				 }); 
			}
		}


	})
	.on("disconnect", (sock)=>{

		// Find this player
		let p=jungle.get_player_by_sock(sock);

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
	.on("receive", (o, meta)=>{


		// We got a set request from a player
		let p=jungle.get_player_by_sock(meta.socket);
		if (p) {

			if(o.set) {

				// Name change
				if(o.set.name) {

					log.info(`${p.name} is now known as ${o.set.name}`);
					p.name=o.set.name;
					server.sendall({
						"event" : "update",
						"type" : "player",
						"id" : p.id,
						"attributes" : {
							"name" : p.name
						}

					});
				}

				// Velocity change
				if(o.set.velocity) {

					p.set_velocity(new Victor(o.set.velocity.x, o.set.velocity.y));

				}
			}
		}
});

// Broadcast move events
jungle.on("move", (p)=>{

	server.sendall({ 
		"event" : "update",
		"type" : "player",
		"id" : p.id,
		"attributes" : {
			"position" : p.get_position()
		}
	});
});


// // Use the runloop to watch the game
// jungle.runloop((jungle /*,dt*/ )=>{

// 	for(let p of jungle.players) {

// 		console.log(`${p.name} position: ${p.get_position()} velocity: ${p.get_velocity()}`);
// 	}

// });

// Start the game
server.listen().then(()=>{

	log.info("Server listening");
});
//server.close();

