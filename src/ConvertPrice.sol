// SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.20;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";


library ConvertPrice {


    function convertEthToUsd(uint256 ethAmount, address aggregatorV3Address) internal view  returns(uint256) {
        // Get price feed contract
        // Call function to get eth value in usd
        uint256 usdValOfOneEth = getEthValueInUsd(aggregatorV3Address);
        // mutiple the eth value with current ethAmount
        // Divided the result with 10^18 as ethAmount and usdValOfOneEth is also 10^18 and multplying both will give a result in 10^36
        uint256 ethAmountInUsd = (ethAmount * usdValOfOneEth) / 10 ** 18;
        return ethAmountInUsd;
    }

    function getEthValueInUsd(address aggregatorV3Address) internal view returns (uint256) {
        // Get price feed contract
            // Get the contract address 
                // 0x694AA1769357215DE4FAC081bf1f309aDC325306
            // Get the contract interface
                // Install smartcontractkit/chainlink-brownie-contracts
                // Import the AggregatorV3Interfact
            // Initialize the interface with the address
            AggregatorV3Interface priceFeed = AggregatorV3Interface(aggregatorV3Address);
            // Call the function in the interface to get eth value in usd
            (,int256 usdValOfOneEth,,,) = priceFeed.latestRoundData();
        
            return uint256(usdValOfOneEth * 10000000000);
    }

    function getPriceFeedVersionLib(address aggregatorV3Address) internal view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(aggregatorV3Address);

        return priceFeed.version();
    }
}