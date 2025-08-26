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
		"Herramienta simple y accesible para validar y limpiar tu código HTML, garantizando que tus emails se vean perfectos en todos los clientes.",
	generator: "v0.app",
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
			<body>{children}</body>
		</html>
	);
}
