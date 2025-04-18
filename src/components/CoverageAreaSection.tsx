export default function CoverageAreaSection() {
	return (
		<section className="py-16 bg-[#FFE5EC] text-[#4A2C2A]" id="coverage">
			<div className="max-w-4xl mx-auto px-6 text-center">
				<h2 className="text-3xl font-bold mb-6">Areas We Serve</h2>
				<p className="mb-10 text-gray-700 max-w-xl mx-auto">
					True Texas Shine proudly serves homes and businesses across
					the Greater Houston area. If you&apos;re nearby, we&apos;ve
					got you covered!
				</p>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm font-medium mb-10">
					<div className="bg-white rounded-lg py-3 px-4 shadow">
						Richmond
					</div>
					<div className="bg-white rounded-lg py-3 px-4 shadow">
						Katy
					</div>
					<div className="bg-white rounded-lg py-3 px-4 shadow">
						Sugar Land
					</div>
					<div className="bg-white rounded-lg py-3 px-4 shadow">
						Rosenberg
					</div>
					<div className="bg-white rounded-lg py-3 px-4 shadow">
						Fulshear
					</div>
					<div className="bg-white rounded-lg py-3 px-4 shadow">
						Missouri City
					</div>
					<div className="bg-white rounded-lg py-3 px-4 shadow">
						Stafford
					</div>
					<div className="bg-white rounded-lg py-3 px-4 shadow">
						Cinco Ranch
					</div>
				</div>

				{/* Mapa visual */}
				<div className="w-full h-72 rounded-xl overflow-hidden shadow">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55861.16313422564!2d-95.7801165!3d29.5821815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e4cd1c88b2e3%3A0xb9c1d9e60a29c10c!2sRichmond%2C%20TX!5e0!3m2!1sen!2sus!4v1713456789123!5m2!1sen!2sus"
						width="100%"
						height="100%"
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
				</div>

				<p className="mt-10 text-sm text-gray-600">
					Not sure if we cover your area?{" "}
					<span className="underline cursor-pointer hover:text-pink-700">
						Contact us
					</span>{" "}
					and we&apos;ll let you know!
				</p>
			</div>
		</section>
	);
}
