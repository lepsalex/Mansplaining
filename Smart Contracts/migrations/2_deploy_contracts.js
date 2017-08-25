var Mansplaining = artifacts.require("./Mansplaining.sol");

console.log(Mansplaining);

module.exports = function(deployer) {
  deployer.deploy(Mansplaining);
};
