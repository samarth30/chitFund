import React from 'react';
import {
  AccountData,
  ContractData,
  ContractForm
} from 'drizzle-react-components';
const MyComponent = () => (
  <div>
  <h2>Balance of the Current Accounts</h2>
  <AccountData accountIndex={0} units={"ether"} precision={3} />
  </div>
);
export default MyComponent;
// <h2>Fund Details</h2>
// <ContractData contract="ChitFund" method="viewFund" />
