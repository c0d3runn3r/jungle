const Jungle=require("../index.js");
const Victor=require("victor");


// Connect to the server
let player=new Jungle.Player("dodo");
let client=new Jungle.Client(player, { "address" : "192.168.56.101", "port" : 50000});
client.connect();

// Log events
client.on("add_player",(player)=>{ console.log(`${player.name} joined`)});
client.on("delete_player",(player)=>{ console.log(`${player.name} left`)});
player.on("move",(player)=>{ console.log(`...moving to (${p.get_position()})`); });

// Every 3 seconds, move a little
setInterval(function(){

	let x=(Math.random()*20)-10;		// (-10..10)
	let y=(Math.random()*20)-10;

	player.set_velocity(Victor(x,y));

}, 3000);
