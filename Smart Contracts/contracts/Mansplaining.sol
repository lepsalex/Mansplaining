pragma solidity ^0.4.4;

/*
 * Mansplaining
 * A simple contract that acts as the back-end for our
 * real-world mansplaining game scoreboard
*/
contract Mansplaining {

	struct Player {
		string name;
		string email;
		uint8 points;
	}

	// We will use game state enum to control whether or not we can move points around
	// and do any other gameplay actions
	enum GAME_STATE {
		locked,
		ready
	}
	GAME_STATE gameState;

	uint8 maxPoints = 100;
	uint8 totalPoints;

	uint8 maxPlayers = 10;
	uint8 currentNumPlayers;
	mapping (string => Player) scores;
	string[] playersItr;

	function newGame(uint8 pointsAvailable) {

		require(pointsAvailable <= maxPoints);

		// call reset method
		reset();
		
		// Set points to points available
		totalPoints = pointsAvailable;
	}

	function addPlayer(string playerEmail, string playerName) public constant {

		// Do not allow more players than max or additon of players mid game
		require(currentNumPlayers < maxPlayers && gameState == GAME_STATE.locked);

		// Save new player to mapping and also create iterable array entry for
		// access via a loop since maps are non-iterable
		scores[playerEmail] = Player({
			email: playerEmail,
			name: playerName,
			points: 0
		});
		playersItr.push(playerEmail);
		currentNumPlayers++;
	}

	// Unlocks game for play if conditions met
	function startGame() public constant {
		require(currentNumPlayers >= 1);
		gameState = GAME_STATE.ready;
	}

	// Reset contract state
	function reset() {
		totalPoints = 0;
		currentNumPlayers = 0;

		// Set game to locked (until players have all been added)
		gameState = GAME_STATE.locked;

		// Since it's too costly to zero out a mapping, we instead
		// blank the player array and use it as our mapping guide if you will
		playersItr = new string[](0);
	}

	function getPlayerByEmail(string playerEmail) public constant returns(string, string, uint8) {
		return (scores[playerEmail].email, scores[playerEmail].name, scores[playerEmail].points);
	}
}
