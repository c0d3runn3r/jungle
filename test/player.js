const Player=require("../lib/Player.js");
const Victor=require("victor");
const assert=require("assert");

describe("Player", ()=>{

	let player = new Player("Tiger", 45);

	it("set position", (done)=>{

		player.set_position(Victor(10,10));
		assert.equal(player.get_position().x, 10);
		assert.equal(player.get_position().y, 10);
		done();
	});

	it("set velocity", (done)=>{

		player.set_velocity(Victor(1000,-1000));
		assert.equal(player.get_velocity().x, 1000);
		assert.equal(player.get_velocity().y, -1000);
		done();
	});


});

