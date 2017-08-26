var Mortal = artifacts.require("./Mortal.sol");
var MPPlayer = artifacts.require("./MPPlayer.sol");
var MPGame = artifacts.require("./MPGame.sol");
var Mansplaining = artifacts.require("./Mansplaining.sol");

module.exports = function(deployer) {
  deployer.deploy(Mortal);
  deployer.link(Mortal, [MPPlayer, MPGame]);
  deployer.deploy(MPPlayer);
  deployer.link(MPPlayer, MPGame);
  deployer.deploy(MPGame);
  deployer.link(MPGame, Mansplaining);
  deployer.deploy(Mansplaining);
};
