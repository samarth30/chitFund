const ChitFund = artifacts.require("ChitFund");
const ChitFundFactory = artifacts.require("ChitFundFactory");

module.exports = function (deployer) {
  deployer.deploy(ChitFund, "BeatInflation", 1, 3, 3);
  deployer.deploy(ChitFundFactory);
};
