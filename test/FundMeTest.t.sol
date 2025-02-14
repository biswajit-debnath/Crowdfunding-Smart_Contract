// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;
import {Test, console} from "forge-std/Test.sol";
import {FundMe} from "../src/FundMe.sol";
import {DeployFundMe} from "../script/DeployFundMe.s.sol";

contract FundMeTest is Test {

    FundMe fundMe;
    address aggregatorV3Address;
    DeployFundMe deployer;

    function setUp() external {
   
        deployer = new DeployFundMe();
        (fundMe, aggregatorV3Address) = deployer.run();
    }

    function testMinimumAmountForFunding() public {
        // Arrage
        uint256 minimumAmountForFunding = 5e18;

        // Act
        uint256 minimumAmountInContract = fundMe.getMinimumAmountForFunding();
        console.log("minimumAmountInContract::", minimumAmountInContract);
        console.log("minimumAmountForFunding::", minimumAmountForFunding);


        // Assert
        assertEq(minimumAmountForFunding, minimumAmountInContract);
    }

    function testFundFailsIfLessThanMinAmount() public {
        // This test need to done by a new user
        
        // Create a address
        address FundingUser = makeAddr("FundingUser");
        
        // Create a user using the address in the current context
        vm.prank(FundingUser);

        vm.expectRevert();
        // call the fund function
        fundMe.fund();
    }

    function testFunderVariablesAfterCallingFund() public {
        uint256 funder1Balance = 1e17;
        uint256 funder2Balance = 11e16;
        // Create two test user
        address funder1 = makeAddr("funder1");
        address funder2 = makeAddr("funder2");

        vm.deal(funder1, funder1Balance);
        vm.deal(funder2, funder2Balance);

        // Fund the contract by the two users
        vm.prank(funder1);
        fundMe.fund{value: funder1Balance}();

        vm.prank(funder2);
        fundMe.fund{value: funder2Balance}();
        // check if funders array has two users
        assertEq(fundMe.getAllFunders().length, 2);
        // Check if both address are the address that we created
        assertEq(funder1, fundMe.getFunderAddressByIndex(0));
        assertEq(funder2, fundMe.getFunderAddressByIndex(1));
        // Check if funderToAmount has two users
            // Check the both address with our address
            // Check if funding amount is correct with the provided data
        
        assertEq(fundMe.getAmountFundedByFunderAddress(funder1), funder1Balance );
        assertEq(fundMe.getAmountFundedByFunderAddress(funder2), funder2Balance);
    }

    function testContractBalanceAfterFunded() public {
        // Arrange
        uint256 funder1Balance = 1e17;
        uint256 funder2Balance = 11e16;
        // Create two test users
        address funder1 = makeAddr("funder1");
        address funder2 = makeAddr("funder2");

        vm.deal(funder1, funder1Balance);
        vm.deal(funder2, funder2Balance);

        // Act
        // Fund the contract by the two users
        vm.prank(funder1);
        fundMe.fund{value: funder1Balance}();

        vm.prank(funder2);
        fundMe.fund{value: funder2Balance}();

        // Assert
        // Assert if contract balance equals to sum of the funded balance
        uint256 expectedBalance = funder1Balance + funder2Balance;
        assertEq(address(fundMe).balance, expectedBalance);
     
    }

    function testRevertWithdrawWithZeroBalance() public {
        // Revert test if owner calls the withdrawAllFundsFromContract with no balance in the contract
        // With custom error defined in the FundMe contract as FundMe__No_Funds_To_Withdraw
        vm.expectRevert(FundMe.FundMe__No_Funds_To_Withdraw.selector);
        fundMe.withdrawAllFundsFromContract();
    }

    function testOwnerCanWithdrawFunds() public {
        // Create two users and assign some funds to each
        uint256 funder1Balance = 1e17;
        uint256 funder2Balance = 11e16;
        address funder1 = makeAddr("funder1");
        address funder2 = makeAddr("funder2");

        vm.deal(funder1, funder1Balance);
        vm.deal(funder2, funder2Balance);
        // Call the fund function from both the user
        vm.prank(funder1);
        fundMe.fund{value: funder1Balance}();

        vm.prank(funder2);
        fundMe.fund{value: funder2Balance}();

        // Store the initial balance of the contract
        uint256 initialContractBalance = address(fundMe).balance;
        uint256 ownerInitialBalance = address(this).balance;

        // call the withdrawAllFundsFromContract by the owner
        vm.prank(address(deployer));
        fundMe.withdrawAllFundsFromContract();

        // Assert the contract balance to be zero
        assertEq(address(fundMe).balance, 0);
        // Assert the owner balance to the contracts initial balance
        assertEq(address(this).balance, ownerInitialBalance + initialContractBalance);
        // Assert that funders array is empty after withdrawal function is called
        assertEq(fundMe.getAllFunders().length, 0);
        // Assert funderToAmount varialbe
        assertEq(fundMe.getAmountFundedByFunderAddress(funder1), 0);
        assertEq(fundMe.getAmountFundedByFunderAddress(funder2), 0);
    }

}