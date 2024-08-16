import type { Metadata } from 'next';

import ClientLayout from '../styles/ClientLayout';
import CssBaseline from '@mui/material/CssBaseline';

import '../styles/globals.css';

export const metadata: Metadata = {
	title: 'Avionics Website',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<CssBaseline />
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
