import type { Metadata } from 'next';
import { DEV } from 'esm-env';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'ChatGPT Usage Analytics',
	description: 'Track your AI interaction patterns over time',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				{ DEV && (<script src="https://unpkg.com/react-scan/dist/auto.global.js" async />) }
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}

			</body>
		</html>
	);
}
