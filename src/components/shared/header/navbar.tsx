'use client';
import { WalletConnect } from '@/components/wallet-connect';
import { ThemeSwitcher } from './theme-switcher';

export default function Navbar() {
	return (
		<nav className="flex items-center justify-between p-2 bg-background my-5 rounded-xl border px-4 sticky top-3 z-50">
			<div className="flex items-center">
				<svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
					/>
				</svg>
				<h1 className="text-lg font-bold">Privacy Protected NFT</h1>
			</div>
			<div className="flex items-center space-x-4">
				<WalletConnect />
				<ThemeSwitcher />
			</div>
		</nav>
	);
}
