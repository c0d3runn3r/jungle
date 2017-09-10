const Victor=require("victor");
//const Player=require("./Player.js");

// Runloop delay, ms
const _runloop_delay=100;


/**
 * Jungle
 * 
 * Land of fear and dreams
 */
class Jungle {

	/**
	 * Constructor
	 *
	 */
	 constructor(){

	 	this._players=[];
	 	this._guest_runloop=function(){};

	 	// Start the game
	 	let self=this;
	 	setInterval(()=>{ self._runloop(); }, _runloop_delay);

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

	/**
	 * Find
	 *
	 * Find a player by ID
	 *
	 * @param {object} id
	 * @return {Player} or null if not found
	 */
	find(id){

		for(let p of this._players){

			if (p.id==id) return p;
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
	}

	/**
	 * Remove a player
	 *
	 * @param {Player} player the player to remove
	 */
	 remove_player(player) {

		for(let n in this._players){

			if (this._players[n].id==player.id) { 
				this._players.splice(n,1);
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
	  * Runloop
	  * 
	  */
	 _runloop() {

 		// Elapsed time, ms (TODO, we should actually measure this)
 		let dt=_runloop_delay/1000;

	 	for(let p of this._players) {

	 		// Update position with velocity
	 		let new_pos=p.get_position().add(p.get_velocity().multiply(dt, dt));
 
 	 		// If we hit a boundary, we stop
 	 		if(new_pos.x> 100) new_pos.x=100;
 	 		if(new_pos.y> 100) new_pos.y=100;
 	 		if(new_pos.x< -100) new_pos.x=-100;
 	 		if(new_pos.y< -100) new_pos.y=-100;

 	 		// Set it
	 		p.set_position(new_pos);

	 		this._guest_runloop(this, dt);
	 	}
	
	 }




}

module.exports=exports=Jungle;