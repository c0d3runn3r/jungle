const Victor=require("victor");
const EventEmitter=require("events").EventEmitter;
const random_names=["Ant","Aphid","Assassin bug","Butterfly","Bee","Bedbug","Cricket","Cockroach","Cicada","Dung beetle","Dragonfly","Damselfly","Earwig","Elephant hawk moth","Eyed click beetle","Fly","Flea","Firefly","Grasshopper","Glowworm","Green stink bug","Horsefly","Hornet","Honey bee","Insect","Inchworm","Io moth","Jassid","Junebug","Jewel beetle","Kissing bug","Katydid","Ked","Locust","Lacewing","Ladybird beetle","Mosquito","Maggot","Mayfly","Nit","Netwing","Nymph","Orange dog","Owlfly","Orange Sulfur Butterfly","Praying mantis","Pea weevil","Planthopper","Queen bee","Question mark butterfly","Queen butterfly","Rhinoceros beetle","Rice weevil","Robber fly","Stick insect","Stink bug","Swallowtail butterfly","Termite","Thrips","Tsetse fly","Underwing","Unlined giant chafer","Uncas skipper","Viceroy butterfly","Vine borer","Velvet ant","Wasp","Water bug","Webspinner","Xerces blue butterfly","Xylophagous insect","Xylodromus","Yellow jacket","Yellow mealworm","Yellow plant bug","Zebra butterfly","Zorapteran","Zimmerman pine moth"];

// Runloop delay, ms
const _runloop_delay=100;

/**
 * Jungle
 * 
 * Land of fear and dreams
 */
class Jungle extends EventEmitter {


	/**
	 * Constructor
	 *
	 * @param {object} opts options
	 */
	 constructor(/*opts={}*/){
	 	
	 	super();
	 	this._guest_runloop=function(){};
	 	this._timer=null;
	 	this._players=[];
	 }

	/**
	 * Get a random name
	 *
	 * @return {string} name a random animal name
	 */
	random_name() {

		return random_names[Math.round(Math.random()*random_names.length)];
	}


	/**
	 * Get player
	 *
	 * Find a player by ID
	 *
	 * @param {object} id
	 * @return {Player} or null if not found
	 */
	get_player_by_id(id){

		for(let p of this._players){

			if (p.id==id) return p;
		}

		return null;
	}	 

	/**
	 * Get player
	 *
	 * Find a player by sock
	 *
	 * @param {object} sock
	 * @return {Player} or null if not found
	 */
	get_player_by_sock(sock){

		for(let p of this._players){

			if (p.sock==sock) return p; 
		}

		return null;
	}	

	/**
	 * Add a new player
	 *
	 * @param {Player} player the player to add
	 *
	 */
	add_player(player) {

	 	// Give player a random position
	 	player.set_position(Victor().randomize(Victor(-100,100), Victor(100,-100)));

 		this._players.push(player);
// 		this.emit("add_player", player);
	}

	/**
	 * Remove a player
	 *
	 * @param {Player} player the player to remove
	 */
	 delete_player(player) {

		for(let n in this._players){

			if (this._players[n].id==player.id) { 
				this._players.splice(n,1);
//		 		this.emit("delete_player", player);
				return;
			}
		}
	 }

	/**
	 * Players getter
	 *
	 * @return {array} an array of all players in the game
	 */
	 get players() {

	 	return this._players;
	 }


	/**
	 * Start
	 *
	 * Start the game runloop
	 *
	 */
	start() {

	 	// Start the game
	 	let self=this;
	 	this._timer=setInterval(()=>{ self._runloop(); }, _runloop_delay);

	}

	/**
	 * End
	 *
	 * Ends the runloop
	 */
	end() {

		this.clearInterval(this._timer);
	}

	/**
	* Runloop
	* 
	*/
	_runloop() {

		// Elapsed time, ms (TODO, we should actually measure this)
		let dt=_runloop_delay/1000;

		for(let p of this._players) {

			let v=p.get_velocity();
			if(v.x !=0 || v.y !=0 ) {

				// Update position with velocity
				let new_pos=p.get_position().add(v.multiply(Victor(dt, dt)));

		 		// If we hit a boundary, we stop
		 		if(new_pos.x> 100) {
		 		
		 			new_pos.x=100;
		 			p._velocity.x=0;
		 		}
		 		if(new_pos.y> 100) { 

		 			new_pos.y=100;
		 			p._velocity.y=0;
		 		}
		 		if(new_pos.x< -100) {

		 			new_pos.x=-100;
		 			p._velocity.x=0;
		 		}

		 		if(new_pos.y< -100) {

		 			new_pos.y=-100;
		 			p._velocity.y=0;
		 		}

		 		// Set it
				p.set_position(new_pos);


				// Emit event
				this.emit("move_player", p);

			}
		}

		this._guest_runloop(this, dt);
	}

	/**
	 * Set runloop
	 *
	 * Sets a runloop function
	 * @param {function} func the function to call every runloop.  func will be passed elapsed time and this
	 */
	runloop(func){

		this._guest_runloop=func;
	}
}






module.exports=exports=Jungle;
