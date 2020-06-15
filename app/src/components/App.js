import React, { Fragment, useEffect, useState } from "react";
import Container from "./Container";
import Navbar from "./Navbar";
import Web3 from "web3";
import ChitFund from "../contracts/ChitFund.json";
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
    if (networkData) {
      const chitfundd = new web3.eth.Contract(
        ChitFund.abi,
        networkData.address
      );

      setChitfund(chitfundd);

      const viewFund = await chitfundd.methods.viewFund().call();
      setViewfund(viewFund);

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
                      <About />
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
