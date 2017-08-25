pragma solidity ^0.4.4;

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

	mapping (string => Man) scores;
	uint8 totalPoints;

	function Mansplaining(uint8 _pointsAvailable, string _menJSON) {
		totalPoints = _pointsAvailable;
	}
}
