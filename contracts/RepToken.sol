// SPDX-License-Identifier: MIT

pragma solidity ^0.6.8;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin\contracts\presets\ERC20PresetMinterPauser.sol";

contract RepToken is ERC20PresetMinterPauser {
    using SafeMath for uint256;

}