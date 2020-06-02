import React, { useEffect, useState } from "react";
import Container from "./Container";
import Navbar from "./Navbar";
import Web3 from "web3";
import ChitFund from "../contracts/ChitFund.json";

// string public fundName;
//     uint256 public jackpot;
//     uint256 public noOfInstallments;
//     uint256 public noOfInvestors;
//     address private manager;
//     uint256 public fundBalance;
//     uint256 public installmentAmount;
//     uint256 public noOfInvestorsJoined;
//     address payable private winner = address(0);
//     uint256 private winnersBid = 0;
//     uint256 private winnersAmount;

const App = () => {
  const [Loading, setLoading] = useState(true);
  const [Chitfund, setChitfund] = useState({});
  const [viewfund, setViewfund] = useState([]);
  const [fundName, setFundName] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = ChitFund.networks[networkId];
    if (networkData) {
      const chitfundd = new web3.eth.Contract(
        ChitFund.abi,
        networkData.address
      );
      setChitfund(chitfundd);

      const viewFund = await chitfundd.methods.viewFund().call();
      setViewfund(viewFund);

      // console.log(productCount);
      // // Load products
      // for (var i = 1; i <= productCount; i++) {
      //   const product = await marketplace.methods.products(i).call();
      //   products.push(product);
      // }
      // setproducts(products);
      setLoading(false);
    } else {
      window.alert("Chitfund contract not deployed to detected network.");
    }
  };

  const joinFund = () => {
    setLoading(true);
    Chitfund.methods
      .joinFund()
      .send({ from: account })
      .once("recepient", (recepient) => {
        setLoading(false);
      });
  };

  const contribute = () => {
    setLoading(true);
    Chitfund.methods
      .contribute()
      .send({ from: account, value: 1000000000000000000 })
      .once("recepient", (recepient) => {
        setLoading(false);
      });
  };

  const getWinner = () => {
    setLoading(true);
    Chitfund.methods
      .getWinner()
      .send({ from: account })
      .once("recepient", (recepient) => {
        setLoading(false);
      });
  };

  // const checkManager = () => {
  //   setLoading(true);
  //   Chitfund.methods
  //     .checkManager()
  //     .send({ from: account })
  //     .once("recepient", (recepient) => {
  //       setLoading(false);
  //       console.log(recepient);
  //     });
  // };

  const releaseFund = () => {
    setLoading(true);
    Chitfund.methods
      .releaseFund()
      .send({ from: account })
      .once("recepient", (recepient) => {
        setLoading(false);
      });
  };

  const bidForJackpot = (id) => {
    setLoading(true);
    Chitfund.methods
      .bidForJackpot(id)
      .send({ from: account })
      .once("recepient", (recepient) => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex">
            {Loading ? (
              <div id="loader" className="text-center">
                <p className="text-center">Loading...</p>
              </div>
            ) : (
              <Container
                viewfund={viewfund}
                joinFund={joinFund}
                contribute={contribute}
                getWinner={getWinner}
                releaseFund={releaseFund}
                bidForProject={bidForJackpot}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
