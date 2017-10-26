const EventEmitter=require("events").EventEmitter;
const Victor=require("victor");

/**
 * Player move event
 *
 * @event Player#move
 * @type {Player}
 */


/**
 * Player
 * 
 * Base class for all players in the Jungle
 */
class Player extends EventEmitter {

	/**
	 * Constructor
	 *
	 * @param {string} name the name of our new player
	 * @param {object} id something unique to use as an identifier
	 * @param {object} [sock] an optional place to store a socket handle
	 * @throws {Error}
	 */
	 constructor(name, id, sock=null){

	 	super();

	 	// Make sure we have an ID and name
	 	if(!name) throw new Error("Name is required");
	 	// if(!id) throw new Error("id is required");

	 	this.name=name;
	 	this.id=id;
	 	this.sock=sock;
	 	this._state="inactive";

	 	this._position=new Victor(0,0);
	 	this._velocity=new Victor(0,0);
	 }

	/**
	 * State getter
	 *
	 * @return {string} state
	 */
	get state(){

		return this._state;
	}

	/**
	 * State setter
	 *
	 * @param {string} new_state the new state, one of "inactive", "active", "dead"
	 * @throws Error
	 */
	set state(new_state){

		if(new_state!="inactive" && new_state != "active" && new_state != "dead") throw new Error("Invalid state");

		this._state=new_state;
	}


	/**
	 * Velocity getter
	 *
	 * We use get_ and set_ instead of native getters and setters because it is more clear what is going on
	 * @return {Victor} velocity
	 */
	get_velocity(){

		return this._velocity.clone();
	}

	/**
	 * Velocity setter
	 *
	 * @param {Victor} v 
	 */
	set_velocity(v) {

		this._velocity=v;
		this.emit("velocity", this);
	}

	/**
	 * Position getter
	 *
	 * @return {Victor} position
	 */
	get_position(){

		return this._position.clone();
	}

	/**
	 * Position setter
	 *
	 * @param {Victor} p
	 * @emits Player#move
	 */
	set_position(p) {

		this._position=p;
		this.emit("position", this);
	}



}

module.exports=exports=Player;