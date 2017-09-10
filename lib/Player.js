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
	 * @throws {Error}
	 */
	 constructor(name, id){

	 	super();

	 	// Make sure we have an ID
	 	if(!id) throw new Error("Unique id is required");

	 	this._name=name;

	 	this._position=new Victor(0,0);
	 	this._velocity=new Victor(0,0);
	 	this.id=id;
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

	/**
	 * Name getter
	 *
	 * @return {string} name the player's name
	 */
	get name() {

		return this._name;
	}

}

module.exports=exports=Player;