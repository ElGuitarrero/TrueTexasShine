"use client";
import Link from "next/link";

export default function Navbar() {
	return (
		<header className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center sticky top-0 z-50">
			<Link href="/">
				<span className="text-2xl text-[#E75480] font-semibold cursor-pointer" style={{fontFamily: 'var(--font-playfair)'}}>
					True Texas Shine
				</span>
			</Link>

			<nav className="hidden md:flex gap-6 text-gray-700 text-lg items-center">
				<Link href="#services" className="hover:text-[#E75480] transition-all">
					Services
				</Link>
				<Link href="#testimonials" className="hover:text-[#E75480] transition-all">
					Testimonials
				</Link>
				<Link href="#coverage" className="hover:text-[#E75480] transition-all">
					Coverage
				</Link>
				<Link href="/calendar">
					<button className="bg-[#F7CAC9] cursor-pointer hover:bg-[#FBB9B8] text-black px-4 py-2 rounded-md transition-all">
						Book Now
					</button>
				</Link>
			</nav>
		</header>
	);
}