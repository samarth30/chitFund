// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;
// import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChitFund {
    using SafeMath for uint256;
    
    // This are constants once the fund is created
    string public fundName;
    uint256 public jackpot;
    uint256 public numOfInstallments;
    uint256 public noOfInvestors;
    address public manager;
    uint256 public installmentAmount;
    
    // This will be incremented but then remain throughout all of the subsequent rounds of bidding
    uint256 public noOfInvestorsJoined;
    
    // These will change between rounds
    uint256 public fundBalance;
    uint256 private currentRoundLowestBid = 0;
    address payable private winnerThisRound = address(0);
    uint256 public currentRound = 1;

    struct Investor {
        bool hasJoined;
        uint256 installmentCounter;
        bool isReadyToInvest;
        bool canBid;
        bool hasWonARound;
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
        uint256 _numOfInstallments,
        uint256 _noOfInvestors
    ) public {
        fundName = _fundName;
        numOfInstallments = _numOfInstallments;
        noOfInvestors = _noOfInvestors;
        manager = msg.sender;  // TODO determine who message.sender is on contract deployment, also consider adding this to constructor to make it configurable?
        installmentAmount = _installmentAmount * 1e18;  // 1e18 = 1eth, or 10000000000000000 wei
        jackpot = SafeMath.mul(installmentAmount, noOfInvestors);
    }

    // function getinstallmentAmount() public view returns (uint _amount) {
    //   return installmentAmount;
    // }

    function joinFund() public {
        require(
            noOfInvestorsJoined < noOfInvestors,
            "The fund has already reached its maximum investors. Please try another fund"
        );
        require(
            !investors[msg.sender].hasJoined, "You are already part of the current fund"
        );
        investors[msg.sender].hasJoined = true;
        investors[msg.sender].isReadyToInvest = true;
        investors[msg.sender].canBid = false;
        investors[msg.sender].hasWonARound = false;
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
            investors[msg.sender].isReadyToInvest,
            "You have already contributed to this round, you cannot invest until after the jackpot of this round is announced"
        );
        require( investors[msg.sender].installmentCounter < currentRound,
            "You have already contributed to this round, you cannot invest until after the jackpot of this round is announced"
        );
        require(fundBalance < jackpot, "Fund is fully funded for this round. You cannot contribute until the funds have been dispursed to the winning bidder this round.");
        require(
            investors[msg.sender].installmentCounter < numOfInstallments,
            "You have already paid all the installments in this fund"
        );
        investors[msg.sender].installmentCounter = investors[msg.sender].installmentCounter + 1;
        investors[msg.sender].isReadyToInvest = false; // has contributed, cannot contribute again until the round is over
        if (!investors[msg.sender].hasWonARound == true) {
            investors[msg.sender].canBid = true;
        }
        fundBalance += msg.value;
    }

    function bidForJackpot(uint256 _bid) public {
        require(
            investors[msg.sender].hasWonARound,
            "You were a winner in a previous bid"
        );
        require(
            investors[msg.sender].canBid == true, "You cannot bid until you have contributed for this round, and you may only bid once per round"
        );
        investors[msg.sender].isReadyToInvest = true;
        if (_bid > 0 && _bid < currentRoundLowestBid) {
            winnerThisRound = msg.sender;
            currentRoundLowestBid = _bid;
        }
        investors[msg.sender].canBid = false;
    }

   // function calculateWinnersJackpot(address _winner) private returns (uint256) {  // TODO: why the math here? why not jackpot just be lowest bid?
    //    uint256 percentage = investors[_winner].currentBidPercentage;
    //    uint256 x = SafeMath.mul(fundBalance, percentage);
    //    uint256 y = SafeMath.div(x, 100);  //TODO what is this calc doing? Throwing this away for now
    //    winnersAmount = fundBalance - y;
    //    investors[_winner].canBid = false;
   //     return winnersAmount;
 //   }


    function releaseFund() public payable isManager {
        require(fundBalance >= jackpot, "Cannot release funds for this round until all investor contributions have been received.");        
        winnerThisRound.transfer(currentRoundLowestBid);  //TODO  look up transfer function later
        investors[winnerThisRound].hasWonARound = true;
        fundBalance = fundBalance - currentRoundLowestBid;
        currentRound = currentRound + 1;
        currentRoundLowestBid = 0;
    }

    function viewFund()
        public
        view
        returns (
            string memory _fundName,
            uint256 _jackpot,
            uint256 _numOfInstallments,
            uint256 _noOfInvestors,
            uint256 _fundBalance,
            uint256 _installmentAmount,
            uint256 _noOfInvestorsJoined,
            uint256 _currentRound
        )
    {
        return (
            fundName,
            jackpot,
            numOfInstallments,
            noOfInvestors,
            fundBalance,
            installmentAmount,
            noOfInvestorsJoined,
            currentRound
        );
    }


    // Some features to consider for later if time allows
    //TODO make a function to destroy fund
    //TODO make a function to kick member from fund, update variables to allow someone else to take their place
    //TODO make a function to reset the fund back to 0 assuming all of the installments and jackpots have been paid.
    //TODO make a function to return any funds left over after the last round to all members equally?
}
