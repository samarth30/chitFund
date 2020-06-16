pragma solidity ^0.6.8;

import "./ChitFund.sol";

contract ChitFundFactory {
    ChitFund[] public deployedFunds;
    uint256 public ChitfundCount;

    mapping(address => ChitFund) public chitfunds;

    event launchedChitfunds(uint256 count, address manager, ChitFund chitfund);

    function createFund(
        string memory name,
        uint256 amount,
        uint256 installments,
        uint256 participants
    ) public {
        require(amount > 0);
        require(installments > 0);
        require(participants > 0);
        ChitFund newFund = new ChitFund(
            name,
            amount,
            installments,
            participants
        );
        deployedFunds.push(newFund);
        ChitfundCount++;
        chitfunds[msg.sender] = newFund;
        emit launchedChitfunds(ChitfundCount, msg.sender, newFund);
    }
}
