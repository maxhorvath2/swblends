"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import work01 from "@/assets/work-01.jpg";
import work02 from "@/assets/work-02.jpg";
import work03 from "@/assets/work-03.jpg";
import work04 from "@/assets/work-04.jpg";
import work05 from "@/assets/work-05.jpg";

const navLinks = [
	{ name: "Home", href: "#home" },
	{ name: "Contact", href: "#contact" },
	{ name: "Book Now", href: "#book" },
];

const workItems = [
	{
		img: work01,
		name: "ARTISTIC FADE CREATIONS",
	},
	{
		img: work02,
		name: "CLASSIC STYLE PERFECTION",
	},
	{
		img: work03,
		name: "MODERN TECHNIQUE INNOVATION",
	},
	{
		img: work04,
		name: "HERITAGE BARBERING SKILLS",
	},
	{
		img: work05,
		name: "QUALITY SERVICE DELIVERY",
	},
];

export default function Home() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const mobileMenuRef = useRef(null);
	const backdropRef = useRef(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger, SplitText);

		// Lenis smooth scroll
		const lenis = new Lenis({ smoothWheel: true, smoothTouch: false });
		ScrollTrigger.scrollerProxy(document.body, {
			scrollTop(value) {
				return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
			pinType: document.body.style.transform ? "transform" : "fixed",
		});

		lenis.on("scroll", ScrollTrigger.update);
		gsap.ticker.add((time) => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);

		// Animate each work item
		gsap.utils.toArray(".work-item").forEach((item) => {
			const img = item.querySelector(".work-item-img");
			const name = item.querySelector(".work-item-name h1");

			const split = new SplitText(name, { type: "words,chars", mask: "words" });
			gsap.set(split.chars, { y: "125%" });

			split.chars.forEach((char, index) => {
				gsap.to(char, {
					y: "0%",
					ease: "none",
					scrollTrigger: {
						trigger: item,
						start: `top+=${index * 25 - 250} top`,
						end: `top+=${index * 25 - 250} top`,
						scrub: 1,
					},
				});
			});

			gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			})
				.fromTo(
					img,
					{ clipPath: "polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)" },
					{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none" }
				)
				.to(img, {
					clipPath: "polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)",
					ease: "none",
					immediateRender: false,
				});
		});

		ScrollTrigger.addEventListener("refresh", () => lenis.resize());
		ScrollTrigger.refresh();

		return () => {
			lenis.destroy();
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	}, []);

	// Mobile menu animation
	useEffect(() => {
		if (!mobileMenuRef.current || !backdropRef.current) return;

		const menu = mobileMenuRef.current;
		const backdrop = backdropRef.current;
		const menuLinks = menu.querySelectorAll(".mobile-nav-link");

		if (mobileMenuOpen) {
			// Animate backdrop
			gsap.set(backdrop, { opacity: 0, pointerEvents: "auto" });
			gsap.to(backdrop, { opacity: 1, duration: 0.4, ease: "power2.out" });

			// Animate menu panel
			gsap.set(menu, { x: "100%", opacity: 0 });
			gsap.to(menu, {
				x: "0%",
				opacity: 1,
				duration: 0.5,
				ease: "power3.out",
			});

			// Animate menu links with stagger
			gsap.set(menuLinks, { y: 20, opacity: 0 });
			gsap.to(menuLinks, {
				y: 0,
				opacity: 1,
				duration: 0.4,
				ease: "power2.out",
				stagger: 0.1,
				delay: 0.2,
			});
		} else {
			// Animate menu links out
			gsap.to(menuLinks, {
				y: -20,
				opacity: 0,
				duration: 0.3,
				ease: "power2.in",
				stagger: 0.05,
			});

			// Animate menu panel out
			gsap.to(menu, {
				x: "100%",
				opacity: 0,
				duration: 0.4,
				ease: "power3.in",
				delay: 0.1,
			});

			// Animate backdrop out
			gsap.to(backdrop, {
				opacity: 0,
				duration: 0.3,
				ease: "power2.in",
				onComplete: () => gsap.set(backdrop, { pointerEvents: "none" }),
			});
		}
	}, [mobileMenuOpen]);

	return (
		<div className="flex flex-col min-h-screen w-screen">
			<header className="fixed z-30 w-screen px-4 py-3 flex justify-between items-center bg-slate-50/50">
				<nav className="flex items-center gap-4 w-full justify-between backdrop-blur-sm">
					<div className="flex items-center gap-4 w-full justify-start">
						<a href="#home" className="flex items-center gap-2">
							<h1 className="text-2xl font-bold">SWBLENDS</h1>
						</a>
					</div>
					<ul className="items-center gap-4 hidden lg:flex">
						{navLinks.map((link) => (
							<li key={link.name}>
								<a href={link.href} className="relative py-2 group whitespace-nowrap">
									{link.name}
								</a>
							</li>
						))}
					</ul>
					<div className="lg:hidden flex items-center gap-4 w-full justify-end">
						<button
							onClick={() => setMobileMenuOpen(true)}
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
						>
							<Menu className="w-6 h-6" />
						</button>
					</div>
				</nav>

				{/* Mobile menu backdrop */}
				<div
					ref={backdropRef}
					className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm opacity-0 pointer-events-none lg:hidden"
					onClick={() => setMobileMenuOpen(false)}
				/>

				{/* Mobile menu panel */}
				<div
					ref={mobileMenuRef}
					className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transform translate-x-full lg:hidden"
				>
					<div className="flex items-center justify-between p-6 border-b border-gray-200/50">
						<a
							href="#home"
							className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							SWBLENDS
						</a>
						<button
							onClick={() => setMobileMenuOpen(false)}
							className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 transition-colors"
						>
							<X className="w-6 h-6" />
						</button>
					</div>
					<div className="p-6 space-y-6">
						{navLinks.map((link, index) => (
							<a
								key={link.name}
								href={link.href}
								className="mobile-nav-link relative block text-xl font-medium text-gray-900 hover:text-gray-600 transition-all duration-300 hover:translate-x-2 overflow-hidden px-4 py-2 rounded-lg group"
								onClick={() => setMobileMenuOpen(false)}
								style={{ transitionDelay: `${index * 50}ms` }}
							>
								{link.name}
								<span className="absolute w-0 h-1 bg-gray-800 rounded bottom-0 left-4 origin-left transition-all duration-300 ease-in-out group-hover:w-[calc(100%-2rem)]"></span>
							</a>
						))}
					</div>
				</div>
			</header>

			{/* HERO */}
			<section id="home" className="hero relative w-screen overflow-hidden h-svh flex items-center justify-center p-8">
				<h1 className="text-7xl leading-none uppercase text-center font-medium">SWBlends</h1>
			</section>

			<section id="work" className="h-0"></section>

			{/* WORK ITEMS */}
			{workItems.map((item, idx) => (
				<section key={idx} className="work-item relative w-screen overflow-hidden h-[150svh]">
					<div className="work-item-img absolute w-full h-full">
						<Image
							src={item.img}
							alt={`Work Item ${idx + 1}`}
							width="auto"
							height="auto"
							className="object-cover h-full w-full"
						/>
					</div>
					<div className="work-item-name absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						<h1 className="text-3xl sm:text-5xl lg:text-7xl leading-none uppercase text-center font-medium text-white whitespace-pre-line break-words">
							{item.name}
						</h1>
					</div>
				</section>
			))}

			<section id="contact" className="relative w-screen overflow-hidden lg:h-[60svh] flex items-center justify-center p-8 h-screen">
				<div className="text-center space-y-12 max-w-4xl mx-auto">
					<h2 className="lg:text-5xl leading-none uppercase text-center font-medium mb-8 text-4xl">Contact</h2>

					<div className="grid md:grid-cols-2 gap-12 text-left">
						{/* Contact Information */}
						<div className="space-y-6">
							<div>
								<h3 className="text-2xl font-semibold mb-4 text-gray-800">Get in Touch</h3>
								<a
									href="mailto:contact@swblends.com"
									className="text-lg text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center gap-2"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
									contact@swblends.com
								</a>
							</div>

							<div>
								<h3 className="text-2xl font-semibold mb-4 text-gray-800">Follow Us</h3>
								<div className="flex gap-4">
									<a
										href="https://www.instagram.com/sw_blends_/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-lg text-gray-600 hover:text-pink-500 transition-colors duration-200 flex items-center gap-2"
									>
										<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
										</svg>
										@sw_blends_
									</a>
									<a
										href="https://www.tiktok.com/@sw.blends"
										target="_blank"
										rel="noopener noreferrer"
										className="text-lg text-gray-600 hover:text-black transition-colors duration-200 flex items-center gap-2"
									>
										<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
										</svg>
										@sw.blends
									</a>
								</div>
							</div>
						</div>

						{/* Locations */}
						<div className="space-y-6">
							<h3 className="text-2xl font-semibold mb-4 text-gray-800 lg:text-right">Our Locations</h3>

							<div className="space-y-4">
								<div className="bg-gray-50 rounded-lg lg:text-right">
									<h4 className="font-semibold text-lg text-gray-800 mb-2">barXbar Location</h4>
									<p className="text-gray-600">11-25 Wentworth Street</p>
									<p className="text-gray-600">Manly, Sydney, NSW</p>
								</div>

								<div className="bg-gray-50 rounded-lg lg:text-right">
									<h4 className="font-semibold text-lg text-gray-800 mb-2">Main Shop Location</h4>
									<p className="text-gray-600">16 Laurence Street</p>
									<p className="text-gray-600">Manly, Sydney, NSW</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="book" className="outro relative w-screen overflow-hidden h-svh flex items-center justify-center p-8">
				<div className="text-center space-y-8">
					<h1 className="lg:text-5xl leading-none uppercase text-center font-medium mb-8 text-4xl">Book Your Appointment</h1>
					<div className="flex flex-col md:flex-row gap-6 justify-center items-center">
						<a
							href="https://trybe.au/swblends"
							target="_blank"
							rel="noopener noreferrer"
							className="group relative px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
						>
							<span className="text-xl font-semibold">Book on Trybe</span>
							<span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
						</a>
						<a
							href="https://www.fresha.com/a/bar-x-bar-manly-manly-11-25-wentworth-street-lxoslix6"
							target="_blank"
							rel="noopener noreferrer"
							className="group relative px-8 py-4 bg-white text-black border-2 border-black rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
						>
							<span className="text-xl font-semibold">Book on Fresha</span>
							<span className="absolute bottom-0 left-0 w-0 h-1 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
						</a>
					</div>
					<p className="text-lg text-gray-600 mt-6">Choose your preferred booking platform</p>
				</div>
			</section>
		</div>
	);
}
