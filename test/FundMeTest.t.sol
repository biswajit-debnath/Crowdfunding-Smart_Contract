// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;
import {Test, console} from "forge-std/Test.sol";
import {FundMe} from "../src/FundMe.sol";

contract FundMeTest is Test {

    FundMe fundMe;

    function setUp() external {
        // vm.startBroadcast();
        // fundMe = new FundMe();
        // vm.stopBroadcast();
    }

    // function testMinimumAmountForFunding() public {
    //     // Arrage
    //     uint256 minimumAmountForFunding = 5e18;

    //     // Act
    //     uint256 minimumAmountInContract = fundMe.getMinimumAmountForFunding();
    //     console.log("minimumAmountInContract::", minimumAmountInContract);
    //     console.log("minimumAmountForFunding::", minimumAmountForFunding);


    //     // Assert
    //     assertEq(minimumAmountForFunding, minimumAmountInContract);
    // }

}