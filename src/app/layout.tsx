import type { Metadata } from "next";
import { Poppins, Baskervville } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { rubik } from "@/data/font";

export const metadata: Metadata = {
	title: "Whisper Box",
	description: "An anonymous feedback application for the people.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className={rubik.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<Navbar />
						{children}
						<Footer />
					</ThemeProvider>
					<Toaster />
				</body>
			</AuthProvider>
		</html>
	);
}
