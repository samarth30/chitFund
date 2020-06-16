import React, { Fragment, useEffect, useState } from "react";
import Container from "./Container";
import Navbar from "./Navbar";
import Web3 from "web3";
import ChitFund from "../contracts/ChitFund.json";
import ChitFundFactory from "../contracts/ChitFundFactory.json";
import Footer from "./Footer.js";
import Home from "./Home.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Loader from "./Loader";
import About from "./About";

const App = () => {
  const [Loading, setLoading] = useState(true);
  const [Chitfund, setChitfund] = useState({});
  const [viewfund, setViewfund] = useState([]);
  const [fundName, setFundName] = useState("");
  const [account, setAccount] = useState("");
  const [chitfundfactory, setChitfundfactory] = useState("");
  const [factories, setFactories] = useState([]);
  const [ChitFundFactorycount, setChitFundFactorycount] = useState(0);

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

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = ChitFund.networks[networkId];
    const networkData2 = ChitFundFactory.networks[networkId];
    if (networkData) {
      const chitfundd = new web3.eth.Contract(
        ChitFund.abi,
        networkData.address
      );

      const chitFundFactoryy = new web3.eth.Contract(
        ChitFundFactory.abi,
        networkData2.address
      );

      setChitfundfactory(chitFundFactoryy);
      setChitfund(chitfundd);

      const viewFund = await chitfundd.methods.viewFund().call();
      setViewfund(viewFund);

      const chitfundcount = await chitFundFactoryy.methods
        .ChitfundCount()
        .call();
      setChitFundFactorycount(chitfundcount);
      let f = [];
      // for (var i = 1; i <= chitfundcount; i++) {
      //   const x = await chitFundFactoryy.methods.launchedChitfunds(i).call();
      //   f.push(x);
      // }

      setFactories(f);
      console.log(ChitFundFactorycount);
      console.log(factories);
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

  const createChitFund = (name, amount, installments, participants) => {
    console.log(name);
    console.log(amount);
    console.log(installments);
    console.log(participants);
    setLoading(true);
    chitfundfactory.methods
      .createFund(name, amount, installments, participants)
      .send({ from: account })
      .once("recepient", async (recepient) => {
        await chitfundfactory.launchedChitfunds().sendTransaction();

        setLoading(false);
      });
  };

  const products = async () => {
    const chitfundcount = await chitfundfactory.methods.ChitfundCount().call();
    setChitFundFactorycount(chitfundcount);
    let f = [];
    for (var i = 1; i <= chitfundcount; i++) {
      const x = await chitfundfactory.methods.launchedChitfunds(i).call();
      f.push(x);
    }

    setFactories(f);
    console.log(ChitFundFactorycount);
    console.log(factories);
  };

  return (
    <Router>
      <div className="App">
        <Navbar account={account} viewfund={viewfund} />
        <div className="container-fluid mt-5">
          <div className="row">
            <div>
              <Switch>
                {/* {Loading ? (
                <Loader viewfund={viewfund} />
              ) : ( */}

                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Fragment>
                      <Home
                        loadWeb3={loadWeb3}
                        loadBlockchainData={loadBlockchainData}
                        viewfund={viewfund}
                        bidForJackpot={bidForJackpot}
                        releaseFund={releaseFund}
                        getWinner={getWinner}
                        contribute={contribute}
                        joinFund={joinFund}
                      />
                      <Footer />
                    </Fragment>
                  )}
                />
                <Route
                  exact
                  path="/about"
                  render={(props) => (
                    <Fragment>
                      <About
                        loadWeb3={loadWeb3}
                        loadBlockchainData={loadBlockchainData}
                        createChitFund={createChitFund}
                        factories={factories}
                        ChitFundFactorycount={ChitFundFactorycount}
                        account={account}
                      />
                      <Footer />
                    </Fragment>
                  )}
                />

                {/* )} */}
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
