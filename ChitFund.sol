// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol';
// import "@openzeppelin/contracts/math/SafeMath.sol";
contract ChitFund {

    using SafeMath for uint;

    string private fundName;
    uint private jackpot;
    uint private noOfInstallments;
    uint private noOfInvestors;
    address private manager;
    uint private fundBalance;
    uint private installmentAmount;
    uint private noOfInvestorsJoined;
    address payable private winner =address(0);
    uint private winnersBid = 0;
    uint private  winnersAmount;




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
        require(msg.sender == manager,'Only Manager ');
        _;
    }
    constructor (string memory _fundName, uint _installmentAmount, uint _noOfInstallments, uint _noOfInvestors) public {
        fundName = _fundName;
        noOfInstallments = _noOfInstallments;
        noOfInvestors = _noOfInvestors;
        manager = msg.sender;
        installmentAmount = _installmentAmount * 1e18;
        jackpot = SafeMath.mul(installmentAmount,noOfInvestors);
    }

    // function getinstallmentAmount() public view returns (uint _amount) {
    //   return installmentAmount;
    // }




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
         // winnersBid = _bid;
        if(_bid > winnersBid){
          winner = msg.sender;
          winnersBid = _bid;
        }

    }

    function getWinner() view public returns (address) {
      return winner;
    }

    function calculateWinnesJackpot(address  _winner) private returns(uint)  {
      uint percentage = investors[_winner].currentBidPercentage;
      uint x = SafeMath.mul(fundBalance,percentage);
      uint y = SafeMath.div(x,100);
      winnersAmount = fundBalance - y;
      investors[_winner].canBid = false;
      return winnersAmount;

    }


    function releaseFund() public payable isManager {
      require(fundBalance == jackpot,'Contributions required');
      uint _winnersAmount = calculateWinnesJackpot(winner);
      winner.transfer(_winnersAmount);
      fundBalance = fundBalance - _winnersAmount;

    }
    function viewFund() public view returns (
      string memory _fundName,
      uint _jackpot,
      uint _noOfInstallments,
      uint _noOfInvestors,
      uint _fundBalance,
      uint _installmentAmount,
      uint _noOfInvestorsJoined )
      {
      return(fundName,jackpot,noOfInstallments,noOfInvestors,fundBalance,installmentAmount,noOfInvestorsJoined
      );
    }





}
