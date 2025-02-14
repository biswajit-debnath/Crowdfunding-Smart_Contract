import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import { Web3Provider } from '../context/Web3Context';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Crowdfunding",
  description: "Funding the contract",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
