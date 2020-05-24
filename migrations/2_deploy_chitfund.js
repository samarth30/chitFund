const ChitFundFactory = artifacts.require("ChitFundFactory");

module.exports = function(deployer) {
  deployer.deploy(ChitFundFactory);
};