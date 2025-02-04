// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


contract FundMe {
    error FundeMe__Require_More_Fund();

    address[] public funders;
    mapping(address => uint256) public fundersToAmount;

    const MINIMUM_AMOUNT_FUNDING_USD = 5 * 10 ** 18; // 5 e18 values are handled in wei and it is e18 to 1eth

    // Fund the contract by anyone
        // Minimum 5$ value of eth should be sent for qualifing
        // Follows CEI
    function fund() public {
        uint256 amountSentInUsd = convertEthToUsd(this.value);
        // Check if correct amount is sent if not revert with custom error
        if(amountSentInUsd < MINIMUM_AMOUNT_FUNDING_USD) {
            revert FundeMe__Require_More_Fund();
        }

        // Keep a list of funders addresses in an array
        funders.push(msg.sender)
        // Keep a mapping of funder's address to amount funded 
            // Consider the case if the same funder funds multiple time
        funderToAmount[msg.sender] += msg.value;


    }

    // Withdraw all funds from contract by the owner of the contract

}