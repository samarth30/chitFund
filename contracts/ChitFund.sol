// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;
// import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChitFund {
    using SafeMath for uint256;

    string public fundName;
    uint256 public jackpot;
    uint256 public noOfInstallments;
    uint256 public noOfInvestors;
    address private manager;
    uint256 public fundBalance;
    uint256 public installmentAmount;
    uint256 public noOfInvestorsJoined;
    address payable private winner = address(0);
    uint256 private winnersBid = 0;
    uint256 private winnersAmount;

    // string private fundName;
    // uint256 private jackpot;
    // uint256 private noOfInstallments;
    // uint256 private noOfInvestors;
    // address private manager;
    // uint256 private fundBalance;
    // uint256 private installmentAmount;
    // uint256 private noOfInvestorsJoined;
    // address payable private winner = address(0);
    // uint256 private winnersBid = 0;
    // uint256 private winnersAmount;

    struct Investor {
        bool hasJoined;
        bool gotJackpot;
        uint256 installementCounter;
        bool isReadytoInvest;
        bool canBid;
        uint256 currentBidPercentage;
    }

    mapping(address => Investor) public investors;

    modifier isManager() {
        require(msg.sender == manager, "Only Manager ");
        _;
    }

    function checkManager() public view returns (bool) {
        require(msg.sender == manager, "Only Manager ");
        return true;
    }

    constructor(
        string memory _fundName,
        uint256 _installmentAmount,
        uint256 _noOfInstallments,
        uint256 _noOfInvestors
    ) public {
        fundName = _fundName;
        noOfInstallments = _noOfInstallments;
        noOfInvestors = _noOfInvestors;
        manager = msg.sender;
        installmentAmount = _installmentAmount * 1e18;
        jackpot = SafeMath.mul(installmentAmount, noOfInvestors);
    }

    // function getinstallmentAmount() public view returns (uint _amount) {
    //   return installmentAmount;
    // }

    function joinFund() public {
        require(
            noOfInvestorsJoined < noOfInvestors,
            "The fund reached its maximum investors, ply try another fund"
        );
        require(
            !investors[msg.sender].hasJoined,
            "You are already part of the current fund"
        );
        investors[msg.sender].hasJoined = true;
        investors[msg.sender].isReadytoInvest = true;
        noOfInvestorsJoined++;
    }

    function contribute() public payable {
        require(
            msg.value == installmentAmount,
            "Supplied amount is different from the Installment amount"
        );
        require(
            investors[msg.sender].hasJoined,
            "You are not part of the current fund"
        );
        require(
            investors[msg.sender].isReadytoInvest,
            "You Can invest after the jackpot is announced"
        );
        require(fundBalance < jackpot, "Fund is full");
        require(
            investors[msg.sender].installementCounter < noOfInstallments,
            "You have allready pail all the installments"
        );
        investors[msg.sender].installementCounter += 1;
        investors[msg.sender].isReadytoInvest = false;
        investors[msg.sender].canBid = true;

        fundBalance += msg.value;
    }

    function bidForJackpot(uint256 _bid) public {
        require(
            investors[msg.sender].canBid,
            "You were a winner in previous biddings"
        );
        investors[msg.sender].currentBidPercentage = _bid;
        investors[msg.sender].isReadytoInvest = true;
        // winnersBid = _bid;
        if (_bid > winnersBid) {
            winner = msg.sender;
            winnersBid = _bid;
        }
    }

    function getWinner() public view returns (address) {
        return winner;
    }

    function calculateWinnesJackpot(address _winner) private returns (uint256) {
        uint256 percentage = investors[_winner].currentBidPercentage;
        uint256 x = SafeMath.mul(fundBalance, percentage);
        uint256 y = SafeMath.div(x, 100);
        winnersAmount = fundBalance - y;
        investors[_winner].canBid = false;
        return winnersAmount;
    }

    function releaseFund() public payable isManager {
        require(fundBalance == jackpot, "Contributions required");
        uint256 _winnersAmount = calculateWinnesJackpot(winner);
        winner.transfer(_winnersAmount);
        fundBalance = fundBalance - _winnersAmount;
    }

    function viewFund()
        public
        view
        returns (
            string memory _fundName,
            uint256 _jackpot,
            uint256 _noOfInstallments,
            uint256 _noOfInvestors,
            uint256 _fundBalance,
            uint256 _installmentAmount,
            uint256 _noOfInvestorsJoined
        )
    {
        return (
            fundName,
            jackpot,
            noOfInstallments,
            noOfInvestors,
            fundBalance,
            installmentAmount,
            noOfInvestorsJoined
        );
    }
}

contract ChitFundFactory {
    ChitFund[] public deployedFunds;

    function createFund(
        string name,
        uint256 amount,
        uint256 installments,
        uint256 participants
    ) public {
        address newFund = new ChitFund(
            name,
            amount,
            installments,
            participants
        );
        deployedFunds.push(newFund);
    }

    function getDeployedFunds() public view returns (ChitFunds[]) {
        return deployedFunds;
    }

    function getNoOfDeployedFunds() public returns (uint256) {
        return deployesFunds.length();
    }
}
