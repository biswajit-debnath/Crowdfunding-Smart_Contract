# 🚀 Crowdfunding Smart Contract

Welcome to the **Crowdfunding Smart Contract** project! This decentralized application (dApp) enables users to contribute ETH to a contract with a **minimum of $5 in ETH**, while the contract owner can withdraw the funds at any time. Built on **Ethereum** and powered by **Chainlink price feeds**, this smart contract ensures transparency and security. 💰

## 📜 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Smart Contract Breakdown](#smart-contract-breakdown)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## ✨ Features

✅ **Fund the Contract:** Users can send ETH, with a minimum contribution of **$5** worth of ETH.  
✅ **Withdraw Funds:** The contract owner can withdraw all collected funds.  
✅ **ETH/USD Conversion:** Uses **Chainlink AggregatorV3** to fetch real-time ETH price.  
✅ **Funder Tracking:** Keeps records of who contributed and how much.  
✅ **Security Considerations:** Proper checks and access control to prevent unauthorized withdrawals.  

## 🛠️ Prerequisites

Ensure you have the following installed before proceeding:

- [Foundry](https://getfoundry.sh/) - A fast and modular toolkit for Ethereum development.
- An Ethereum Wallet (e.g., MetaMask) with testnet ETH.
- An Ethereum RPC Provider (e.g., Alchemy, Infura, or QuickNode).

## 🚀 Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/biswajit-debnath/Crowdfunding-Smart_Contract.git
   cd Crowdfunding-Smart_Contract
   ```

2. **Install Dependencies:**
   ```bash
   forge install
   ```

3. **Compile the Contract:**
   ```bash
   forge build
   ```

4. **Run Tests:**
   ```bash
   forge test
   ```

5. **Deploy the Contract:**
   ```bash
   forge script script/DeployFundMe.s.sol --rpc-url <YOUR_RPC_URL> --private-key <YOUR_PRIVATE_KEY>
   ```
   Replace `<YOUR_RPC_URL>` with your Ethereum provider URL and `<YOUR_PRIVATE_KEY>` with your wallet’s private key.

## 📖 Usage

### ⛽ Funding the Contract

Users can fund the contract by calling the `fund()` function with a minimum of **$5 in ETH**.
```solidity
fundMe.fund{value: 0.01 ether}();
```

### 💵 Withdrawing Funds
The contract owner can withdraw all funds using:
```solidity
fundMe.withdrawAllFundsFromContract();
```

### 📊 Checking Contributions
Anyone can check how much a specific address has contributed:
```solidity
fundMe.getAmountFundedByFunderAddress(address funder);
```

## 🗂️ Project Structure

```
Crowdfunding-Smart_Contract/
├── src/
│   ├── FundMe.sol            # Main contract
│   ├── ConvertPrice.sol      # Chainlink price conversion library
├── script/
│   ├── DeployFundMe.s.sol    # Deployment script
│   ├── HelperConfig.s.sol    # Chain selection helper
├── test/
│   ├── FundMeTest.t.sol      # Unit tests
└── README.md                 # Project documentation
```

## 🔍 Smart Contract Breakdown

### 📌 `FundMe.sol`
- Manages **funding and withdrawals**.
- Enforces **minimum contribution** of $5.
- Uses `ConvertPrice.sol` to fetch ETH/USD prices.

### 📌 `ConvertPrice.sol`
- **Library** for real-time ETH price conversion using **Chainlink Oracles**.

### 📌 `DeployFundMe.s.sol`
- Deployment script that initializes **FundMe** contract with the **correct Chainlink Oracle**.

### 📌 `HelperConfig.s.sol`
- Helps with selecting the appropriate **AggregatorV3 price feed** based on the network.

## 🧪 Testing

The project includes **unit tests** using Foundry’s testing framework:

### ✅ Test: Minimum Contribution
Ensures funding only works when **at least $5** is sent.
```solidity
function testMinimumAmountForFunding() public {
    uint256 minimumAmountForFunding = 5e18;
    uint256 minimumAmountInContract = fundMe.getMinimumAmountForFunding();
    assertEq(minimumAmountForFunding, minimumAmountInContract);
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a **pull request**. 🚀

## 📄 License

This project is licensed under the **MIT License**.

## 📬 Contact

For any questions or suggestions, reach out via GitHub Issues or email me at [biswajitdebnath405@gmail.com](biswajitdebnath405@gmail.com). 🚀
