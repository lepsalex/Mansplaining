pragma solidity ^0.4.4;

import './Mortal.sol';

contract MPPlayer is Mortal {
    
    // Player attributes
	bytes32 email;
    bytes32 name;
    bytes6 colour;

    function MPPlayer(bytes32 playerEmail, bytes32 playerName, bytes6 playerColour) {
	    email = playerEmail;
        name = playerName;
        colour = playerColour;
    }
}