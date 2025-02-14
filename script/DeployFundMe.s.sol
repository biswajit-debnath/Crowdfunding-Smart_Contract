// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {FundMe} from "../src/FundMe.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

// returns
    // AggregatorV3 contract address
    // deployed fundme contract address
contract DeployFundMe is Script {

    function run() external returns (FundMe, address) {
        // Get the Aggregator v3 address
        HelperConfig helperConfig = new HelperConfig();
        address aggregatorV3Address = helperConfig.currentNetworkConfig();    

        vm.startBroadcast();
        FundMe fundme = new FundMe(aggregatorV3Address);
        vm.stopBroadcast();
        return (fundme, aggregatorV3Address);
    }

}


