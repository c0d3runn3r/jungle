const Jungle=require("./lib/Jungle.js");
const Player=require("./lib/Player.js");
const Victor=require("victor");
const Sockhop=require("sockhop");




/**
 * Jungle Client
 * 
 * Connects to a Jungle game server
 */
class JungleClient extends Jungle {

	/**
	 * Constructor
	 *
	 * @param {object} opts options
	 * @param {string} [opts.address="127.0.0.1"] IP address of server
	 * @param {number} [opts.port=50000] IP port of server
	 * @param {object} [opts.logger] logger object containing methods for info, warn, and error 
	 * @param {Player} our player
	 */
	 constructor(player, opts){

	 	super(opts);
	 	let self=this;
	 	this._player=player;
		this._client=new Sockhop.client({address: this._opts.address, port: this._opts.port, peer_type: "json" });

		this._client.on("receive",(o, meta)=>{

			// We receive a "set id" command
			if(o.set && o.set.id)  {

				this._player.id=o.set.id;
			}

			// We receive an event
			if(o.event) {

				// Add player
				if (o.event=="add" && o.type && o.type=="player") {

						// Player is either ourself or someone new
						let p=(o.id==self._player.id)?self._player:(new Player(o.attributes.name, o.id));

						// Add the player to the map
						p.set_position(Victor(o.attributes.position.x, o.attributes.position.y));
						self.add_player(p);

				// Delete player
				} else if (o.event=="delete" && o.type && o.type=="player") {

						// Delete the player 
						let p=self.get_player_by_id(o.id);
						self.delete_player(p);

				// Update attribute
				} else if (o.event=="update" && o.type && o.type=="player") {

					// Find the player
					let p=self.get_player_by_id(o.id);

					// Name change
					if(o.attributes.name) {

						p.name=o.attributes.name;
					}

					// Position change
					if(o.attributes.position) {

						p.set_position(Victor(o.attributes.position.x, o.attributes.position.y));
					}


				}

			}

		});
	 }


	/**
	 * Connect to server
	 *
	 * @return {Promise} promise resolved when we are connected and set up (name sent, etc)
	 */
	connect() {

		let self=this;

		return new Promise((resolve)=>{

			this._client.connect().then(()=>{

				// Set our name once we connect
				this._client.send({ "set" : {

					"name" : self._player.name

				}});

				// Set up event handlers for future changes
				self._player.on("velocity",(player)=>{

					this._client.send({ "set" : {

						"velocity" : player.get_velocity().toObject(),
						"id" : player.id

					}});

				});

				resolve();
			});
		});

	}

}


module.exports=exports={

	"Jungle" : Jungle,
	"Player" : Player,
	"Client" : JungleClient

};







