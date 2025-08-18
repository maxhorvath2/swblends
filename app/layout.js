import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const interTight = Inter_Tight({
	variable: "--font-inter-tight",
	subsets: ["latin"],
});

export const metadata = {
	title: "SWBlends - Professional Barbering & Hair Styling in Manly, Sydney",
	description:
		"Professional barbering and hair styling services in Manly, Sydney. Expert fade creations, classic cuts, and modern techniques. Book your appointment at our Wentworth Street or Laurence Street locations.",
	keywords:
		"barbering, hair styling, fade cuts, Manly barber, Sydney barber, men's haircuts, professional grooming, hair salon, barber manly, fade haircuts, classic cuts, modern barbering, SWBlends, men's haircuts manly, sydney barbering, barber shop manly, hair salon manly, barber near me, barbering services, hair styling manly, fade styles, classic barber cuts, modern haircuts, professional barbershop",
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
			<head>
				<meta name="apple-mobile-web-app-title" content="SWBlends" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Barbershop",
							name: "SWBlends",
							image: "https://swblends.com/logo.svg",
							"@id": "https://swblends.com",
							url: "https://swblends.com",
							sameAs: ["https://www.instagram.com/sw_blends_/", "https://www.tiktok.com/@sw.blends"],
							address: [
								{
									"@type": "PostalAddress",
									streetAddress: "16 Laurence Street",
									addressLocality: "Manly",
									addressRegion: "NSW",
									postalCode: "2095",
									addressCountry: "AU",
								},
								{
									"@type": "PostalAddress",
									streetAddress: "Wentworth Street",
									addressLocality: "Manly",
									addressRegion: "NSW",
									postalCode: "2095",
									addressCountry: "AU",
								},
							],
						}),
					}}
				/>
			</head>
			<body className={`${interTight} antialiased bg-slate-50 text-gray-900`}>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
