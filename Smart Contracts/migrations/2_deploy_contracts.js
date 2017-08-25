var JsmnSolLib = artifacts.require("./JsmnSolLib.sol");
var Mansplaining = artifacts.require("./Mansplaining.sol");

module.exports = function(deployer) {
  deployer.deploy(JsmnSolLib);
  deployer.link(JsmnSolLib, Mansplaining);
  deployer.deploy(Mansplaining);
};
