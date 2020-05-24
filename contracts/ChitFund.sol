// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol';
// import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChitFundFactory {
    address[] public funds;

    function createFund(string memory _fundName, uint _fundAmount, uint _noOfInstallments, uint _noOfInvestors) public {
        ChitFund _newFund = new ChitFund(_fundName, _fundAmount, _noOfInstallments, _noOfInvestors, msg.sender);
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
    uint public fundAmount;
    uint public noOfInstallments;
    uint public noOfInvestors;
    address public manager;
    uint public fundBalance;
    uint public installmentAmount;
    uint public noOfInvestorsJoined;



    struct Investor{
      bool hasJoined;
      bool gotJackpot;
      uint installementCounter;
      bool isReadytoInvest;
      uint currentBidAmount;
    }

    mapping(address => Investor) public investors;

    modifier isManager() {
        require(msg.sender == manager,'Only ');
        _;
    }
    constructor (string memory _fundName, uint _fundAmount, uint _noOfInstallments, uint _noOfInvestors, address _manager) public {
        fundName = _fundName;
        fundAmount = _fundAmount * 1e18;
        noOfInstallments = _noOfInstallments;
        noOfInvestors = _noOfInvestors;
        manager = _manager;
        uint tmp = SafeMath.mul(noOfInstallments,noOfInvestors);
        installmentAmount = SafeMath.div(fundAmount,tmp);
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
        require(fundBalance < fundAmount,'Fund is full');
        require(investors[msg.sender].installementCounter < noOfInstallments,'You have allready pail all the installments');
        investors[msg.sender].installementCounter += 1;
        investors[msg.sender].isReadytoInvest = false;

        fundBalance += msg.value;
    }

    function biForJackpot(uint _bid) public {
        investors[msg.sender].currentBidAmount = _bid;
        investors[msg.sender].isReadytoInvest = true;
    }




    function releaseFund() public isManager {
      require(fundBalance == fundAmount,'Contributions required');

          // uint index = random() % noOfInvestors;
          address payable winner = msg.sender;
          winner.transfer(address(this).balance);

    }

    // // Generating pseudo random number
    // function random() private view returns (uint) {
    //     return uint(keccak256(abi.encodePacked(block.difficulty, now, noOfInvestors)));
    // }


}
