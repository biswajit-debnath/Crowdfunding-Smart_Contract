// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {MockV3Aggregator} from "../test/Mock/MockAggregatorV3.sol";


// Returns aggregatorv3 contract address based on chain id
contract HelperConfig is Script {

    struct NetworkConfig {
        address aggregatorV3Address;
    }

    uint256 constant SEPOLIA_CHAIN_ID = 11155111;
    uint8 constant DECIMALS = 8;
    int256 constant INITIAL_ANSWER = 2000e8;

    NetworkConfig public currentNetworkConfig;

    constructor() {
        if(block.chainid == SEPOLIA_CHAIN_ID) {
            currentNetworkConfig = getSepoliaNetworkConfig();
        } else {
            currentNetworkConfig = getAnvilChainConfig();
        }
    }

    // sepolia config
    function getSepoliaNetworkConfig() public pure returns(NetworkConfig memory) {
        NetworkConfig memory sepoliaChainConfig = NetworkConfig({ aggregatorV3Address : 0x694AA1769357215DE4FAC081bf1f309aDC325306});
        return sepoliaChainConfig;
    }

    // anvil config
    function getAnvilChainConfig() public returns(NetworkConfig memory) {
        if(currentNetworkConfig.aggregatorV3Address != address(0)) {
            return currentNetworkConfig;
        }
        else {
            // Create and deploy a mock aggregatorV3 contract and get the address

            vm.startBroadcast();
            MockV3Aggregator aggregatorV3 =  new MockV3Aggregator(DECIMALS, INITIAL_ANSWER);
            vm.stopBroadcast();

            NetworkConfig memory anvilChainConfig = NetworkConfig({
                aggregatorV3Address : address(aggregatorV3)
            });
            return anvilChainConfig;
        }
    }

}
