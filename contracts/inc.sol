//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract inc {
    uint256 public number;

    event Incremented(uint256, uint256);
    event Reseted();

    constructor(uint256 _initialNumber) {
        number = _initialNumber;
    }

    function increment(uint256 _value) public {
        number = number + _value;
        emit Incremented(_value, number);
    }

    function reset() public {
        number = 0;
        emit Reseted();
    }
}
