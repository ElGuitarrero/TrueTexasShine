export default function Footer() {
	return (
		<footer id="contact" className="bg-[#FFF0F3] text-gray-700 px-6 py-10">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
				<div>
					<h3 className="text-2xl font-playfair text-[#E75480] mb-2">
						True Texas Shine
					</h3>
					<p>Bringing sparkle and heart to every home we clean.</p>
				</div>

				<div>
					<h4 className="font-semibold mb-2">Contact</h4>
					<ul>
						<li>📍 Richmond, TX</li>
						<li>📞 (123) 456-7890</li>
						<li>✉️ info@truetexasshine.com</li>
					</ul>
				</div>

				<div>
					<h4 className="font-semibold mb-2">Follow Us</h4>
					<ul className="flex gap-4">
						<li>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[#E75480]"
							>
								Instagram
							</a>
						</li>
						<li>
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[#E75480]"
							>
								Facebook
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="text-center mt-8 text-sm text-gray-500">
				© {new Date().getFullYear()} True Texas Shine. All rights reserved.
			</div>
		</footer>
	);
}