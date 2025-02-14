'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Web3 } from 'web3';

interface Web3ContextType {
  isConnected: boolean;
  web3: Web3 | null;
  connectWallet: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setWeb3(web3Instance);
        setIsConnected(true);
        alert("Wallet Connected!");
      } catch (err) {
        console.error(err);
        alert("Failed to connect wallet!");
      }
    } else {
      alert("MetaMask not detected!");
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', () => {
        setIsConnected(false);
        setWeb3(null);
      });
    }
  }, []);

  return (
    <Web3Context.Provider value={{ isConnected, web3, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
    const context = useContext(Web3Context);
    if (context === undefined) {
      throw new Error('useWeb3 must be used within a Web3Provider');
    }
    return context;
}