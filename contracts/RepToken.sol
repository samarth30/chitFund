// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin\contracts\presets\ERC20PresetMinterPauser.sol";

contract RepToken is ERC20PresetMinterPauser {

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) public {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
    }
}