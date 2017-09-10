const Player=require("./lib/Player.js");
const Jungle=require("./lib/Jungle.js");
const Sockhop=require("sockhop");
const log = require("bunyan").createLogger({"name":"jungle"});
const nconf = require('nconf');


log.level("debug");

// Read the config
nconf.argv().file({ file: 'config.json' });

// Start a game
var jungle=new Jungle();

// Start up the server
var server=new Sockhop.server(nconf.get("server"));

var random_names=["Ant","Aphid","Assassin bug","Butterfly","Bee","Bedbug","Cricket","Cockroach","Cicada","Dung beetle","Dragonfly","Damselfly","Earwig","Elephant hawk moth","Eyed click beetle","Fly","Flea","Firefly","Grasshopper","Glowworm","Green stink bug","Horsefly","Hornet","Honey bee","Insect","Inchworm","Io moth","Jassid","Junebug","Jewel beetle","Kissing bug","Katydid","Ked","Locust","Lacewing","Ladybird beetle","Mosquito","Maggot","Mayfly","Nit","Netwing","Nymph","Orange dog","Owlfly","Orange Sulfur Butterfly","Praying mantis","Pea weevil","Planthopper","Queen bee","Question mark butterfly","Queen butterfly","Rhinoceros beetle","Rice weevil","Robber fly","Stick insect","Stink bug","Swallowtail butterfly","Termite","Thrips","Tsetse fly","Underwing","Unlined giant chafer","Uncas skipper","Viceroy butterfly","Vine borer","Velvet ant","Wasp","Water bug","Webspinner","Xerces blue butterfly","Xylophagous insect","Xylodromus","Yellow jacket","Yellow mealworm","Yellow plant bug","Zebra butterfly","Zorapteran","Zimmerman pine moth"];

// Handle events
server
	// .on("receive", (obj, meta)=>{



	// })
	.on("connect", (sock)=>{

		// Create and add a new player
		let p=new Player("Mystery "+random_names[Math.round(Math.random(random_names.length))], sock);
		jungle.add_player(p);
		log.info(`${p.name} connected`);

	})
	.on("disconnect", (sock)=>{

		// Find this player
		let p=jungle.find(sock);

		// Remove it
		jungle.remove_player(p);
		log.info(`${p.name} disconnected`);

	})
	.on("error", (e)=>{

		log.error("Sockhop error: "+e);
	})
	.listen().then(()=>{

		log.info("Server listening");
	});



// Use the runloop to watch the game
jungle.runloop((jungle /*,dt*/ )=>{

	for(let p of jungle.players) {

		console.log(`${p.name} position: ${p.get_position()} velocity: ${p.get_velocity()}`);
	}

});



