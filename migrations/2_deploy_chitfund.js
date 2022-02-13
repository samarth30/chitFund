const ChitFund = artifacts.require("ChitFund");
const ChitFundFactory = artifacts.require("ChitFundFactory");

module.exports = function (deployer) {
  deployer.deploy(ChitFund, "NewFund", 1, 3, 3);
  deployer.deploy(ChitFundFactory);
};
