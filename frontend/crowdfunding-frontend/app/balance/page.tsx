'use client';

import { useState } from 'react';
import { Navigation } from '../../components/Navigation';
import { useWeb3 } from '../../context/Web3Context';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../config/contract';

export default function BalanceChecker() {
  const { isConnected, web3 } = useWeb3();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [contractBalance, setContractBalance] = useState<string>('');

  const checkBalance = async () => {
    if (!web3) {
      alert("Please connect your MetaMask wallet first!");
      return;
    }

    const addressInput = document.getElementById('address') as HTMLInputElement;
    const address = addressInput.value;
    
    if (!address) {
      setError("Please enter an address");
      return;
    }

    if (!web3.utils.isAddress(address)) {
      setError("Invalid Ethereum address");
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

      const balanceWei: string = await contract.methods.getAmountFundedByFunderAddress(address).call({
        from: accounts[0]
      });
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
      setBalance(balanceEth);
    } catch (err: any) {
      setError(`Failed to fetch balance: ${err.message}`);
      setBalance('');
    } finally {
      setIsLoading(false);
    }
  }

  const checkContractBalance = async () => {
    if (!web3) {
      alert("Please connect your MetaMask wallet first!");
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const contractBalance = await web3.eth.getBalance(CONTRACT_ADDRESS);
      const balanceEth = web3.utils.fromWei(contractBalance, 'ether');
      setContractBalance(balanceEth);
    } catch (err: any) {
      setError(`Failed to fetch contract balance: ${err.message}`);
      setContractBalance('');
    } finally {
      setIsLoading(false);
    }
  };
 

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-700 font-medium">Fetching Balance...</p>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navigation
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 py-8">
          <div className="flex flex-col items-center space-y-5">
            {/* Contract Balance Section */}
            <div className="w-full flex justify-center">
              <div className="flex items-center space-x-4">
                <h3 className="text-sm font-normal text-gray-800">
                  Contract Balance
                </h3>
                
                {!contractBalance ? (
                  <button
                    onClick={checkContractBalance}
                    disabled={!isConnected}
                    className={`px-4 py-1.5 bg-indigo-400 text-white font-medium rounded-lg transition-all duration-300 text-xs ${
                      isConnected 
                        ? 'hover:bg-indigo-600 hover:scale-105' 
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    Check Balance
                  </button>
                ) : (
                  <div className="px-4 py-1.5 bg-indigo-500 text-white font-medium rounded-lg text-xs">
                    {contractBalance} ETH
                  </div>
                )}
              </div>
            </div>

            {/* Check ETH Balance Section */}
            <div className="flex flex-col items-center w-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                Check Your ETH Balance
              </h2>

              <div className="flex flex-wrap gap-4 justify-center mb-4 w-full max-w-xl">
                <input
                  type="text"
                  id="address"
                  placeholder="Enter Ethereum Address"
                  disabled={!isConnected}
                  className={`px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-400 flex-1 text-base transition-colors duration-300 ${
                    !isConnected ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
                <button
                  onClick={checkBalance}
                  disabled={!isConnected}
                  className={`px-5 py-2.5 bg-emerald-400 text-white font-medium rounded-lg transition-all duration-300 text-sm ${
                    isConnected 
                      ? 'hover:bg-emerald-500 hover:scale-105' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  Check Balance
                </button>
              </div>

              {!isConnected && (
                <p className="text-sm text-red-500 mt-2">
                  Please connect your wallet to check balances
                </p>
              )}

              {error && (
                <p className="text-sm text-red-500 mt-2">
                  {error}
                </p>
              )}

              {balance && (
                <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
                  <p className="text-lg text-gray-700">
                    Balance: <span className="font-semibold">{balance} ETH</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};