'use client';
declare global {
  interface Window {
    ethereum?: any;
  }
}

import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { useWeb3 } from '../context/Web3Context';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';


export default function Home() {
  const { isConnected, web3 } = useWeb3();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const fundContract = async () => {
    if (!web3) {
      alert("Please connect your MetaMask wallet first!");
      return;
    }

    const amountInput = document.getElementById('amount') as HTMLInputElement;
    const amount = amountInput.value;
    
    if (!amount) {
      alert("Please enter an amount");
      return;
    }

    setIsLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const amountInWei = web3.utils.toWei(amount, 'ether');

      await contract.methods.fund().send({
        from: accounts[0],
        value: amountInWei
      });

      alert("Transaction successful!");
      amountInput.value = '';
    } catch (err: any) {
      alert(`Transaction failed: ${err.message}`);
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
            <p className="mt-4 text-gray-700 font-medium">Processing Transaction...</p>
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
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 py-16">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-12">
              Fund the Contract
            </h2>

            <div className="flex flex-wrap gap-4 justify-center mb-4">
              <input
                type="number"
                id="amount"
                placeholder="Amount in ETH"
                disabled={!isConnected}
                className={`px-3 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-indigo-500 w-56 text-base transition-colors duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  !isConnected ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
              <button
                onClick={fundContract}
                disabled={!isConnected}
                className={`px-6 py-3 bg-emerald-400 text-white font-semibold rounded-lg transition-all duration-300 ${
                  isConnected 
                    ? 'hover:bg-emerald-500 hover:scale-105' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                {isLoading ? 'Processing...' : 'Fund'}
              </button>
            </div>

            {!isConnected && (
              <p className="text-sm text-red-500 mt-2">
                Please connect your wallet to fund the contract
              </p>
            )}

            <p className="text-sm text-gray-500 mt-4">
              * Minimum $5 value of ETH required
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}