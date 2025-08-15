import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
	variable: "--font-inter-tight",
	subsets: ["latin"],
});

export const metadata = {
	title: "SWBlends - Professional Barbering & Hair Styling in Manly, Sydney",
	description:
		"Professional barbering and hair styling services in Manly, Sydney. Expert fade creations, classic cuts, and modern techniques. Book your appointment at our Wentworth Street or Laurence Street locations.",
	keywords: "barbering, hair styling, fade cuts, Manly barber, Sydney barber, men's haircuts, professional grooming, hair salon",
	authors: [{ name: "SWBlends" }],
	creator: "SWBlends",
	publisher: "SWBlends",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://swblends.com"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "SWBlends - Professional Barbering & Hair Styling in Manly, Sydney",
		description:
			"Professional barbering and hair styling services in Manly, Sydney. Expert fade creations, classic cuts, and modern techniques.",
		url: "https://swblends.com",
		siteName: "SWBlends",
		locale: "en_AU",
		type: "website",
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${interTight} antialiased bg-slate-50 text-gray-900`}>{children}</body>
		</html>
	);
}
