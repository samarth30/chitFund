const ChitFund = artifacts.require("ChitFund");

module.exports = function(deployer) {
  deployer.deploy(ChitFund,'BeatInflation',1,3,3);
};
