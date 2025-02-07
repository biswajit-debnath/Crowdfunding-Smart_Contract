## Simple Decentralized Crowdfunding Smart Contract

**People can fund this contract with a minumin amount of $5, all the funded amount will stay in the contract, the owner can only withdraw funds from the contract.**

Primary Functions:

-   **Fund**: Users will call this function to fund the contract, with a minimum of $5.
-   **withdrawAllFundsFromContract**: Only owner of the contract call this funtion to withdraw all the funds from the contract.
-   **getAmountFundedByFunderAddress(address funderAddress)**: This function can be called by anyone to get the amount funded by a funder provinding the funnder address as the parameter.
-   **getOwnerAddress**: This gets the contract owner's address.



## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```



### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge create src/FundMe.sol:FundMe --rpc-url <your_rpc_url> --private-key <your_private_key> --broadcast
```

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ call call <contract address> "getMinimumAmountForFunding()"

```
```shell
$ call send <contract address> "fund()" --value <value in wei> --private-key <your_private_key>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
