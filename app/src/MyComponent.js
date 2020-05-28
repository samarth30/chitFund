import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  return (
    <div className="App">
      <div>
        <img src={logo} alt="drizzle-logo" />
        <h1>ChitFund Daap Demo</h1>
        <p>
          ChitFund: One Stop Investment Solution.
        </p>
      </div>

      <div className="section">
        <h2>Active Account</h2>
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={0}
          units="ether"
          precision={3}
        />
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={1}
          units="ether"
          precision={3}
        />
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={2}
          units="ether"
          precision={3}
        />
      </div>

      <div className="section">
        <h2>ChitFund</h2>
        <p>
          Get the fund details
        </p>

          <strong>Fund Details: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ChitFund"
            method="viewFund"
          />
          <strong>STEP 1: </strong>
          <strong>Join the Fund as Investor: </strong>
            <p></p>
        <ContractForm drizzle={drizzle} contract="ChitFund" method="joinFund" />
        <p></p>
        <strong>STEP 2: </strong>
        <strong>Contribute: </strong> <p></p>
        <ContractForm drizzle={drizzle} contract="ChitFund" method="contribute" />

      </div>










      <div className="section">
        <h2>SimpleStorage</h2>
        <p>
          This shows a simple ContractData component with no arguments, along
          with a form to set its value.
        </p>
        <p>
          <strong>Stored Value: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SimpleStorage"
            method="storedData"
          />
        </p>
        <ContractForm drizzle={drizzle} contract="SimpleStorage" method="set" />
      </div>

      <div className="section">
        <h2>TutorialToken</h2>
        <p>
          Here we have a form with custom, friendly labels. Also note the token
          symbol will not display a loading indicator. We've suppressed it with
          the <code>hideIndicator</code> prop because we know this variable is
          constant.
        </p>
        <p>
          <strong>Total Supply: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TutorialToken"
            method="totalSupply"
            methodArgs={[{ from: drizzleState.accounts[0] }]}
          />{" "}
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TutorialToken"
            method="symbol"
            hideIndicator
          />
        </p>
        <p>
          <strong>My Balance: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TutorialToken"
            method="balanceOf"
            methodArgs={[drizzleState.accounts[0]]}
          />
        </p>
        <h3>Send Tokens</h3>
        <ContractForm
          drizzle={drizzle}
          contract="TutorialToken"
          method="transfer"
          labels={["To Address", "Amount to Send"]}
        />
      </div>


    </div>
  );
};
