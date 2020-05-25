import ChitFund from './contracts/ChitFund.json';
const options = {
  contracts: [ChitFund],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  }
};

export default options;
