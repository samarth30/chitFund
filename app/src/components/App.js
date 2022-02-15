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
import Aboutt from "./Aboutt";

const App = () => {
  const [Loading, setLoading] = useState(true);
  const [Chitfund, setChitfund] = useState({});
  const [viewfund, setViewfund] = useState([]);
  const [viewInvestor, setViewInvestor] = useState([]);
  const [viewIsManager, setViewIsManager] = useState([]);
  const [fundName, setFundName] = useState("");
  const [account, setAccount] = useState("");
  const [chitfundfactory, setChitfundfactory] = useState("");
  const [factories, setFactories] = useState([]);
  const [ChitFundFactorycount, setChitFundFactorycount] = useState(0);
  const [Jackpot, setJackpot] = useState(0);
  const [NoOfInstallments, setNoOfInstallments] = useState(0);
  const [FundBalance, setFundBalance] = useState(0);
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
      const chitfund = new web3.eth.Contract(
        ChitFund.abi,
        networkData.address
      );

      const chitFundFactoryy = new web3.eth.Contract(
        ChitFundFactory.abi,
        networkData2.address
      );

      setChitfundfactory(chitFundFactoryy);
      setChitfund(chitfund);

      const viewInvestor = await chitfund.methods.viewInvestor().call();
      const viewIsManager = await chitfund.methods.checkIfManager().call();
      const viewFund = await chitfund.methods.viewFund().call();
      const jackpot = await web3.utils.fromWei(viewFund[1], "ether");
      const NoOfinstallments = await web3.utils.fromWei(viewFund[5], "ether");
      const fundBalance = await web3.utils.fromWei(viewFund[4], "ether");
      setJackpot(jackpot);
      setNoOfInstallments(NoOfinstallments);
      setFundBalance(fundBalance);
      setViewfund(viewFund);
      setViewInvestor(viewInvestor);
      setViewIsManager(viewIsManager);

      const chitfundcount = await chitFundFactoryy.methods
        .ChitfundCount()
        .call();
      setChitFundFactorycount(chitfundcount);

      // for (var i = 1; i <= chitfundcount; i++) {
      //   const x = await chitFundFactoryy.methods.launchedChitfunds(i).call();
      //   console.log(x);
      //   factories.push(x);
      // }
      var a = new Array();
      await chitFundFactoryy.events
        .launchedChitfunds(
          {
            filter: {
              myIndexedParam: [20, 23],
              myOtherIndexedParam: "0x123456789...",
            }, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0,
          },
          function (error, event) {
            console.log(event);
          }
        )
        .on("data", function (event) {
          factories.push(event.returnValues);
        })
        .on("changed", function (event) {
          // remove event from local database
        })
        .on("error", console.error);
      setFactories(factories);
      const x = [...factories];
      console.log(factories);

      // setJackpot(window.web3.utils.fromWei(viewfund[1], "ether"));
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
      .once("recipient", (recipient) => {
        setLoading(false);
      });
  };

  const contribute = () => {
    setLoading(true);
    Chitfund.methods
      .contribute()
      .send({ from: account, value: 1000000000000000000 })
      .once("recipient", (recipient) => {
        setLoading(false);
      });
  };

  const getWinner = () => {
    setLoading(true);
    Chitfund.methods
      .getWinner()
      .send({ from: account })
      .once("recipient", (recipient) => {
        setLoading(false);
      });
  };

  const releaseFund = () => {
    setLoading(true);
    Chitfund.methods
      .releaseFund()
      .send({ from: account })
      .once("recipient", (recipient) => {
        setLoading(false);
      });
  };

  const bidForJackpot = (id) => {
    setLoading(true);
    Chitfund.methods
      .bidForJackpot(id)
      .send({ from: account })
      .once("recipient", (recipient) => {
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
      .once("recipient", async (recipient) => {
        // await chitfundfactory.launchedChitfunds().sendTransaction();

        setLoading(false);
      });
  };

  return (
    <Router>
      <div className="App">
        <Navbar account={account} viewfund={viewfund} viewInvestor={viewInvestor} viewIsManager={viewIsManager} />
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
                        viewInvestor={viewInvestor}
                        viewIsManager={viewIsManager}
                        bidForJackpot={bidForJackpot}
                        releaseFund={releaseFund}
                        getWinner={getWinner}
                        contribute={contribute}
                        joinFund={joinFund}
                        factories={factories}
                        jackpot={Jackpot}
                        NoOfInstallments={NoOfInstallments}
                        FundBalance={FundBalance}
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
                        createChitFund={createChitFund}
                        ChitFundFactorycount={ChitFundFactorycount}
                        account={account}
                        factories={factories}
                      />
                      <Footer />
                    </Fragment>
                  )}
                />
                <Route
                  exact
                  path="/aboutt"
                  render={(props) => (
                    <Fragment>
                      <Aboutt />
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
