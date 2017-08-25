pragma solidity ^0.4.4;

import "jsmnsol-lib/JsmnSolLib.sol";

/*
 * Mansplaining
 * A simple contract that acts as the back-end for our
 * real-world mansplaining game
*/
contract Mansplaining {

	struct Man {
		string name;
		string email;
		uint8 points;
	}

	uint8 maxPoints = 100;
	uint8 totalPoints;

	uint8 maxPlayers = 4;
	mapping (string => Man) scores;
	string[] playersItr;

	// Active players array?

	function newGame(uint8 pointsAvailable, string menJSON, uint8 numPlayers) {

		require(pointsAvailable <= maxPoints && numPlayers <= maxPlayers);

		// call reset method
		reset();
		
		// Set points to points available
		totalPoints = pointsAvailable;

		// Populate players into game state
		initPlayers(menJSON, numPlayers);
	}

	function initPlayers(string menJSON, uint8 numPlayers) {

		// Compute JSON parse length as num players x 2 + 1
		uint8 parseLimit = numPlayers * 2 + 1;

		uint returnValue;
		JsmnSolLib.Token[] memory tokens;
		uint actualNum;

		(returnValue, tokens, actualNum) = JsmnSolLib.parse(menJSON, parseLimit);

		// Loop through key/obj pairs
		for (uint8 index = 1; index < tokens.length; index += 2) {
			
			JsmnSolLib.Token memory k = tokens[index];
			JsmnSolLib.Token memory v = tokens[index + 1];
			
			string memory name = JsmnSolLib.getBytes(menJSON, k.start, k.end);
			string memory email = JsmnSolLib.getBytes(menJSON, v.start, v.end);
			
			Man memory newPlayer = Man({
				name: name,
				email: email,
				points: 0
			});

			// Save new Man to mapping and also create iterable array entry for
			// access via a loop since maps are non-iterable
			scores[name] = newPlayer;
			playersItr.push(name);
		}
	}

	// Reset contract state
	function reset() {
		totalPoints = 0;

		// Since it's too costly to zero out a mapping, we instead
		// blank the player array and use it as our mapping guide if you will
		playersItr = new string[](0);
	}

	function getPlayerPoints(string playerName) returns(uint8) {
		return scores[playerName].points;
	}
}
