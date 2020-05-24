// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol';
// import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChitFundFactory {
    address[] public funds;

    function createFund(string memory _fundName, uint _installmentAmount, uint _noOfInstallments, uint _noOfInvestors) public {
        ChitFund _newFund = new ChitFund(_fundName, _installmentAmount, _noOfInstallments, _noOfInvestors, msg.sender);
        address newFund= address(_newFund);
        funds.push(newFund);
    }

    function listAllFunds() public view returns (address[] memory) {
        return funds;
    }

    function getFunds(uint _index) public view returns (address) {
        return funds[_index];
    }
}

contract ChitFund {

    using SafeMath for uint;

    string public fundName;
    uint public jackpot;
    uint public noOfInstallments;
    uint public noOfInvestors;
    address public manager;
    uint public fundBalance;
    uint public installmentAmount;
    uint public noOfInvestorsJoined;
    address payable private winner =address(0);
    uint public previusBid = 0;
    uint public  winnersAmount;



    struct Investor{
      bool hasJoined;
      bool gotJackpot;
      uint installementCounter;
      bool isReadytoInvest;
      bool canBid;
      uint currentBidPercentage;
    }

    mapping(address => Investor) public investors;

    modifier isManager() {
        require(msg.sender == manager,'Only ');
        _;
    }
    constructor (string memory _fundName, uint _installmentAmount, uint _noOfInstallments, uint _noOfInvestors, address _manager) public {
        fundName = _fundName;
        noOfInstallments = _noOfInstallments;
        noOfInvestors = _noOfInvestors;
        manager = _manager;
        installmentAmount = _installmentAmount * 1e18;
        jackpot = SafeMath.mul(installmentAmount,noOfInvestors);
    }

    function getinstallmentAmount() public view returns (uint _amount) {
      return installmentAmount;
    }




    function joinFund() public {
        require(noOfInvestorsJoined < noOfInvestors, 'The fund reached its maximum investors, ply try another fund');
        require(!investors[msg.sender].hasJoined,'You are already part of the current fund');
        investors[msg.sender].hasJoined = true;
        investors[msg.sender].isReadytoInvest = true;
        noOfInvestorsJoined++;
    }

    function contribute()  payable public {
        require(msg.value == installmentAmount,'Supplied amount is different from the Installment amount');
        require(investors[msg.sender].hasJoined,'You are not part of the current fund');
        require(investors[msg.sender].isReadytoInvest,'You Can invest after the jackpot is announced');
        require(fundBalance < jackpot,'Fund is full');
        require(investors[msg.sender].installementCounter < noOfInstallments,'You have allready pail all the installments');
        investors[msg.sender].installementCounter += 1;
        investors[msg.sender].isReadytoInvest = false;
        investors[msg.sender].canBid = true;


        fundBalance += msg.value;
    }

    function bidForJackpot(uint _bid) public {
        require(investors[msg.sender].canBid,'You were a winner in previous biddings');
        investors[msg.sender].currentBidPercentage = _bid;
        investors[msg.sender].isReadytoInvest = true;
        uint previusBit = _bid;
        if(_bid > previusBid){
          winner = msg.sender;
        }
        previusBid = _bid;
    }

    function getWinner() view public returns (address) {
      return winner;
    }

    function calculateWinnesJackpot(address _winner) public {
      uint percentage = investors[_winner].currentBidPercentage;
      uint x = SafeMath.mul(fundBalance,percentage);
      uint y = SafeMath.div(x,100);
      winnersAmount = fundBalance - y;
      investors[_winner].canBid = false;

    }


    function releaseFund() public payable isManager {
      require(fundBalance == jackpot,'Contributions required');
          winner.transfer(address(this).balance);
    }



}
