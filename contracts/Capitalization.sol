// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./RepToken.sol";

contract Capitalization {
    using SafeMath for uint256;

    string public poolName;
    uint256 public noOfUndewritersJoined;
    uint256 public poolBalance;
    uint256 public poolMaxAmount;
    uint256 public minimumContributionAmount;
    uint256 public contributionIncrementAmount;
    string public repTokenName;
    string public repTokenSymbol;
    address public capitalManager;

    struct Underwriter {
        bool hasJoined;
        uint256 contributionAmount;
        uint256 currentRepTokenHoldings;
        address underwriterAddress;
    }

    mapping(address => Underwriter) public underwriters;

    RepToken repToken = new RepToken(0);

    constructor(
        string memory _poolName,
        uint256 _poolMaxAmount,
        uint256 _minimumContributionAmount,
        uint256 _contributionIncrementAmount,
        string memory _repTokenName,
        string memory _repTokenSymbol
    ) public {
        poolName = _poolName;
        poolMaxAmount = _poolMaxAmount;
        minimumContributionAmount = _minimumContributionAmount * 1e18; // 1e18 = 1eth, or 10000000000000000 wei
        contributionIncrementAmount = _contributionIncrementAmount * 1e18;
        repTokenName = _repTokenName;
        repTokenSymbol = _repTokenSymbol;
        capitalManager = msg.sender;  //TODO: consider adding this to constructor to make it configurable?
    }

    function joinPool() public {
        require(
            !underwriters[msg.sender].hasJoined, "You are already part of the current fund"
        );
        underwriters[msg.sender].underwriterAddress = msg.sender;
        underwriters[msg.sender].hasJoined = true;
        noOfUndewritersJoined++;
    }

    function contributeToPool() public payable {
        require( msg.value > minimumContributionAmount,
            "You are attempting to contribute an amount into the fund that is less than the minimum amount, you must at least contribute the minimum amount"
        );
        require( msg.value < poolMaxAmount,
            "You are attempting to contribute an amount that is above the maximum amount the fund is seeking for capitalization, please reduce your contribution amount"
        );
        require( msg.value % 1 ether != 0, // check if contribution is in increment of exactly 1 eth
            "You are attempting to contribute an amount that is not an increment of 1 ETH, please contribute in increments of 1 ETH"
        );
        if (underwriters[msg.sender].hasJoined == false) {
            joinPool();
        }
        poolBalance += msg.value;
        underwriters[msg.sender].contributionAmount += msg.value;
        repToken.mint(msg.sender, msg.value);  // mint an equal amount of rep token to correspond with the amount of eth contributed
        underwriters[msg.sender].currentRepTokenHoldings += msg.value;
    }

    function viewCapitalization()
        public
        view
        returns (
            string memory _poolName,
            uint256 _noOfUndewritersJoined,
            uint256 _poolBalance,
            uint256 _poolMaxAmount,
            uint256 _minimumContributionAmount,
            uint256 _contributionIncrementAmount,
            string memory _repTokenName,
            string memory _repTokenSymbol,
            address _capitalManager
        )
    {
        return (
            poolName,
            noOfUndewritersJoined,
            poolBalance,
            poolMaxAmount,
            minimumContributionAmount,
            contributionIncrementAmount,
            repTokenName,
            repTokenSymbol,
            capitalManager
        );
    }

    function viewUnderwriter(address underwriterAddressParam)
        public
        view
        returns (
            bool _hasJoined,
            uint256 _contributionAmount,
            uint256 _currentRepTokenHoldings,
            address underwriterAddress
        )
    {
        return (
            underwriters[underwriterAddressParam].hasJoined,
            underwriters[underwriterAddressParam].contributionAmount,
            underwriters[underwriterAddressParam].currentRepTokenHoldings,
            underwriters[underwriterAddressParam].underwriterAddress
        );
    }


    //TODO: make function to destroy this contract, have funds returned to underwriters

}