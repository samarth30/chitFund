import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import TutorialToken from "./contracts/TutorialToken.json";
import ChitFund from "./contracts/ChitFund.json";

const options = {

  // var provider = new Web3(Web3.givenProvider || "ws://localhost:8545");



  web3: {
    block: false,
    // customProvider: new Web3(Web3.givenProvider || "ws://localhost:8545"),
    customProvider: new Web3("wss://kovan.infura.io/ws/v3/5b2a79e624554c8ab922b9a84b076645"),

  },
  contracts: [SimpleStorage, TutorialToken,ChitFund],
  events: {
    SimpleStorage: ["StorageSet"],
  },
};

export default options;
