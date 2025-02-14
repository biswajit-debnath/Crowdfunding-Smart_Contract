'use client';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { useWeb3 } from '@/context/Web3Context';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../config/contract';

export default function WithdrawFunds() {
    const { isConnected, web3 } = useWeb3();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const withdrawFunds = async () => {
        if (!web3) {
          alert("Please connect your MetaMask wallet first!");
          return;
        }
    
        setIsLoading(true);
        try {
          const accounts = await web3.eth.getAccounts();
          const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    
          await contract.methods.withdrawAllFundsFromContract().send({
            from: accounts[0]
          });
    
          alert("Withdrawal successful!");
        } catch (err: any) {
          if (err.message.includes("execution reverted")) {
            alert("Withdrawal failed: Only the contract owner can withdraw funds");
          } else {
            alert(`Withdrawal failed: ${err.message}`);
          }
        } finally {
          setIsLoading(false);
        }
      };


    return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
        {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-700 font-medium">Processing Withdrawal...</p>
            </div>
        </div>
        )}

        <Navigation
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 py-16">
            <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-12">
                Withdraw All Funds
            </h2>

            <button
                onClick={withdrawFunds}
                disabled={!isConnected}
                className={`px-8 py-4 bg-red-500 text-white font-semibold rounded-lg transition-all duration-300 mb-6 ${
                isConnected 
                    ? 'hover:bg-red-600 hover:scale-105 shadow-lg' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
            >
                Withdraw
            </button>

            {!isConnected && (
                <p className="text-sm text-red-500 mt-2">
                Please connect your wallet to withdraw funds
                </p>
            )}

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md">
                <p className="text-sm text-yellow-800 text-center">
                ⚠️ Note: Withdrawals can only be performed by the contract owner
                </p>
            </div>
            </div>
        </div>
        </main>
    </div>
    );
};