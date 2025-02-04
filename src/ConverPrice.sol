// SPDX-Licence-Identifier: MIT

pragma solidity 0.8.20;


library ConvertPrice {


    function convertEthToUsd external (uint256 ethAmount) returns(uint256) {
        // Get price feed contract
        // Call function to get eth value in usd
        uint256 ethValInUsd = getEthValueInUsd();
        // mutiple the eth value with current ethAmount
    }

    function getEthValueInUsd public () returns (uint256) {
        // Get price feed contract
            // Get the contract address 
                // 0x694AA1769357215DE4FAC081bf1f309aDC325306
            // Get the contract interface
            // Initial the interface with the address
            // Call the function in the interface to get eth value in usd
        // Call function to get eth value in usd

        
    }
}