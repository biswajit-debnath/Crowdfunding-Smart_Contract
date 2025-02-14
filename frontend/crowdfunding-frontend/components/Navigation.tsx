'use client';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWeb3 } from '../context/Web3Context';

interface NavigationProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export function Navigation({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: NavigationProps) {
  const pathname = usePathname();
  const { isConnected, connectWallet } = useWeb3();

  const navLinks = [
    { name: 'Fund', href: '/' },
    { name: 'Owner', href: '/owner' },
    { name: 'Balance', href: '/balance' },
  ];

  const isActivePath = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-300 font-medium ${
                  isActivePath(link.href)
                    ? 'text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {isConnected ? (
            <div className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg flex items-center gap-2 text-sm md:text-base">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              Connected
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-sm md:text-base"
            >
              Connect to MetaMask
            </button>
          )}
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors duration-300 py-2 font-medium ${
                    isActivePath(link.href)
                      ? 'text-indigo-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}