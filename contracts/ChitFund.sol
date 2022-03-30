// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;
// import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./Capitalization.sol";

contract ChitFund {
    using SafeMath for uint256;
    
    // These are constants once the fund is created
    string public fundName;
    uint256 public jackpot;
    uint256 public numOfInstallments;
    uint256 public noOfMembers;
    address public manager;
    uint256 public installmentAmount;
    
    // This will be incremented but then remain throughout all of the subsequent rounds of bidding
    uint256 public noOfMembersJoined;
    
    // These will change between rounds
    uint256 public fundBalance;
    uint256 public currentRoundLowestBid = 0; //TODO maybe make private?, want public now for debugging
    address payable private winnerThisRound = address(0);
    uint256 public currentRound = 1;

    struct Member {
        bool hasJoined;
        uint256 installmentCounter;
        bool isReadyToInvest;
        bool canBid;
        bool hasWonARound;
    }

    mapping(address => Member) public investors;

    constructor(
        string memory _fundName,
        uint256 _installmentAmount,
        uint256 _numOfInstallments,
        uint256 _noOfMembers
    ) public {
        fundName = _fundName;
        numOfInstallments = _numOfInstallments;
        noOfMembers = _noOfMembers;
        manager = msg.sender;  // TODO determine who message.sender is on contract deployment, also consider adding this to constructor to make it configurable?
        installmentAmount = _installmentAmount * 1e18;  // 1e18 = 1eth, or 10000000000000000 wei
        jackpot = SafeMath.mul(installmentAmount, noOfMembers);
    }

    modifier isManager() {
        require(msg.sender == manager, "Only the manager can access this function");
        _;
    }

    function checkIfManager() public view returns (bool) {
        if(msg.sender == manager){
            return true;
        } else {
            return false;
        }
    }

    function joinFund() public {
        require(
            noOfMembersJoined < noOfMembers,
            "The fund has already reached its maximum investors. Please try another fund"
        );
        require(
            !investors[msg.sender].hasJoined, "You are already part of the current fund"
        );
        investors[msg.sender].hasJoined = true;
        investors[msg.sender].isReadyToInvest = true;
        investors[msg.sender].canBid = false;
        investors[msg.sender].hasWonARound = false;
        noOfMembersJoined++;
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
            !investors[msg.sender].hasWonARound,
            "You were a winner in a previous round. You are no longer allowed to bid."
        );
        require(
            investors[msg.sender].canBid == true, "You cannot bid until you have contributed for this round, and you may only bid once per round"
        );
        if (_bid > 0 && _bid < fundBalance) { // bids must be less than the total balance of the fund.
            if( currentRoundLowestBid == 0) {
                winnerThisRound = msg.sender;
                currentRoundLowestBid = _bid;
            } else if (_bid < currentRoundLowestBid){
                winnerThisRound = msg.sender;
                currentRoundLowestBid = _bid;
            }
        }
        investors[msg.sender].canBid = false;
    }


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
            uint256 _noOfMembers,
            uint256 _fundBalance,
            uint256 _installmentAmount,
            uint256 _noOfMembersJoined,
            uint256 _currentRound,
            address _manager,
            uint256 _currentRoundLowestBid
        )
    {
        return (
            fundName,
            jackpot,
            numOfInstallments,
            noOfMembers,
            fundBalance,
            installmentAmount,
            noOfMembersJoined,
            currentRound,
            manager,
            currentRoundLowestBid
        );
    }

    function viewMember()
        public
        view
        returns (
            bool _hasJoined,
            uint256 _installmentCounter,
            bool _isReadyToInvest,
            bool _canBid,
            bool _hasWonARound
        )
    {
        return (
            investors[msg.sender].hasJoined,
            investors[msg.sender].installmentCounter,
            investors[msg.sender].isReadyToInvest,
            investors[msg.sender].canBid,
            investors[msg.sender].hasWonARound
        );
    }


    // Some features to consider for later if time allows
    //TODO make a function to destroy fund
    //TODO make a function to kick member from fund, update variables to allow someone else to take their place
    //TODO make a function to reset the fund back to 0 assuming all of the installments and jackpots have been paid.
    //TODO make a function to return any funds left over after the last round to all members equally?

    //TODO be able to subsitute member for another if a user gets kicked before taking a distribution
    //
}
