var Mortal = artifacts.require("./Mortal.sol");
var Mansplaining = artifacts.require("./Mansplaining.sol");
var MPGame = artifacts.require("./MPGame.sol");

module.exports = function(deployer) {
  deployer.deploy(Mortal);
  deployer.link(Mortal, MPGame);
  deployer.deploy(MPGame);
  deployer.link(MPGame, Mansplaining);
  deployer.deploy(Mansplaining);
};
