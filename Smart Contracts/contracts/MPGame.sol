pragma solidity ^0.4.4;

import './Mortal.sol';
import './MPPlayer.sol';

contract MPGame is Mortal {

    // We will use game state enum to control whether or not we can move points around
	// and do any other gameplay actions
	enum GAME_STATE {
		locked,
		ready
	}
	GAME_STATE gameState;

	uint8 maxPoints = 100;
    uint8 gamePoints;

    uint8 maxPlayers = 4; // only four buttons on my internet button :(
	uint8 currentNumPlayers = 0;

    mapping(bytes32 => address) players;
    mapping(address => uint8) scores;
    address[] playersIter; // iterable player storage

    // Notifies front-end of player address and how many more players can join
    event PlayerAdded(address indexed playerAddress, uint8 slotsAvailable);

    // Notifies front-end that we are ready to play the game
    event GameReady(bool isReady);

    function MPGame(uint8 initPoints) {
        require(initPoints <= maxPoints);

        // Set points to points available
		gamePoints = initPoints;

        // Set game to locked (until players have all been added)
		gameState = GAME_STATE.locked;
    }

    function addPlayer(bytes32 playerEmail, bytes32 playerName, bytes6 playerColour) public {

		// Do not allow more players than max or additon of players mid game
		require(currentNumPlayers < maxPlayers && gameState == GAME_STATE.locked);

		// Issue new player contract, save address mapped to their email
        address newPlayer = new MPPlayer(playerEmail, playerName, playerColour);
        players[playerEmail] = newPlayer;
        playersIter.push(newPlayer);
		
		currentNumPlayers++;

        PlayerAdded(newPlayer, maxPlayers - currentNumPlayers);
	}

    function awardPoint(address player) public {
        require(gameState == GAME_STATE.ready && gamePoints > 0);
        gamePoints--;
        scores[player]++;
    }

    function getPlayerAddress(bytes32 email) public returns(address) {
        return players[email];
    }

    // Unlocks game for play if conditions met
	function startGame() public {
		require(currentNumPlayers >= 1);
		gameState = GAME_STATE.ready;
        GameReady(true);
	}

    function kill() public {
        // Kill all players created during game
        for (uint8 index = 0; index < playersIter.length; index++) {
            MPPlayer player = MPPlayer(playersIter[index]);
            player.kill();
        }

        // 3 ... 2 ... 1 ...
        selfdestruct(owner);
    }
}