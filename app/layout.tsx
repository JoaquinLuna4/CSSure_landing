import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
	preload: true,
});

export const metadata: Metadata = {
	title: "CSSure - Validación de HTML para Emails",
	icons: {
		icon: "/favicon.png",
	},
	description:
		"A simple and accessible tool for validating and cleaning your HTML code, ensuring your emails look perfect on all clients",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<style>{`
					html {
						font-family: ${inter.style.fontFamily};
						--font-sans: ${inter.variable};
						--font-mono: ${inter.variable};
					}
				`}</style>
			</head>
			<body>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
