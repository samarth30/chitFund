const Capitalization = artifacts.require("Capitalization");
const ChitFund = artifacts.require("ChitFund");
const ChitFundFactory = artifacts.require("ChitFundFactory");

module.exports = function (deployer) {
  deployer.deploy(Capitalization, "NewCapital", 10, 1, 1, "CHITFUNDREP", "CHIT");
  deployer.deploy(ChitFund, "NewFund2", 1, 3, 3);
  deployer.deploy(ChitFundFactory);
};
