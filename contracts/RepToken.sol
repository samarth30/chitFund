// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";


//https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token


contract RepToken is ERC20PresetMinterPauser {
    constructor(uint256 initialSupply) public ERC20PresetMinterPauser("CHITFUNDREP", "CHIT") {
        _mint(msg.sender, initialSupply);
    }
}