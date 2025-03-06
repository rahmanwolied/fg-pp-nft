import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Providers
import { Providers } from '../components/providers';
import { Toaster } from '../components/ui/sonner';
import Navbar from '@/components/shared/header/navbar';
import { Footer } from '@/components/shared/footer';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Privacy Preserving NFT',
	description: 'A simple application to mint encrypted text NFTs using Lit Protocol',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
				<Providers>
					<div className="container mx-auto">
						<Navbar />
						{children}
						<Footer />
						<Toaster />
					</div>
				</Providers>
			</body>
		</html>
	);
}
