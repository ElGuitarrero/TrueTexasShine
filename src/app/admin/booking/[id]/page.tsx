"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { Booking } from "@/types/booking";

export default function BookingDetailsPage() {
	const router = useRouter();
	const params = useParams();
	const bookingId = params?.id;

	const [booking, setBooking] = useState<Booking>();
	const [loading, setLoading] = useState(true);

	const fetchBooking = async () => {
		if (!bookingId) return;
		const { data } = await supabase
			.from("bookings")
			.select("*")
			.eq("id", bookingId)
			.single();

		setBooking(data);
		setLoading(false);
	};

	const markAsCompleted = async () => {
		if (!bookingId) return;
		await supabase
			.from("bookings")
			.update({ status: "completed" })
			.eq("id", bookingId);
		fetchBooking();
	};

	useEffect(() => {
		fetchBooking();
	}, [bookingId]);

	if (loading) return <p className="p-6">Loading booking...</p>;
	if (!booking) return <p className="p-6">Booking not found.</p>;

	const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
		booking.location
	)}&output=embed`;

    // console.log(booking)
    // console.log(booking.start)
    // console.log(booking.end_time)

	return (
		<div className="max-w-5xl mx-auto p-6 space-y-6 text-[#4A2C2A]">
			<h1 className="text-3xl font-bold text-center mb-4">
				📋 Booking Summary
			</h1>

			{/* Grid layout */}
			<div className="grid sm:grid-cols-2 gap-5">
				{/* Column 1 */}
				<div className="space-y-4 flex flex-col justify-between">
					<BentoBox label="👤 Customer">
						<p>
							<strong>Name:</strong> {booking.name}
						</p>
						<p>
							<strong>Phone:</strong> {booking.phone}
						</p>
						<p>
							<strong>Email:</strong> {booking.email}
						</p>
						<p>
							<strong>Preferred Language:</strong>{" "}
							{booking.preferred_language}
						</p>
					</BentoBox>

					<BentoBox label="📦 Service Info">
						<p>
							<strong>Service:</strong> {booking.service}
						</p>
						<p>
							<strong>Property Type:</strong>{" "}
							{booking.property_type}
						</p>
						<p>
							<strong>Has Pets:</strong>{" "}
							{booking.has_pets ? "Yes" : "No"}
						</p>
						<p>
							<strong>Bedrooms:</strong> {booking.num_bedrooms}
						</p>
						<p>
							<strong>Bathrooms:</strong> {booking.num_bathrooms}
						</p>
					</BentoBox>

					<BentoBox label="📝 Notes">
						<p>
							<strong>Instructions:</strong>{" "}
							{booking.entry_instructions}
						</p>
						<p>
							<strong>Allow Photos:</strong>{" "}
							{booking.allow_photos ? "Yes" : "No"}
						</p>
						<p>
							<strong>Additional Notes:</strong> {booking.notes}
						</p>
					</BentoBox>
				</div>

				{/* Column 2 */}
				<div className="space-y-4 flex flex-col justify-between gap-5">
					<BentoBox label="📍 Location">
						<p>
							<strong>Address:</strong> {booking.location}
						</p>
						{booking.colonia ? (
							<p>
                            <strong>Colonia:</strong> {booking.colonia}
                        </p>
						) : ''}
						{booking.zipcode ? (
							<p>
								<strong>Zipcode:</strong> {booking.zipcode}
							</p>
						) : ("")}

						<div className="rounded-lg overflow-hidden mt-3 shadow-md">
							<iframe
								src={mapUrl}
								width="100%"
								height="200"
								style={{ border: 0 }}
								loading="lazy"
								allowFullScreen
							/>
						</div>
					</BentoBox>

					<BentoBox label="⏰ Schedule">
						<p>
							<strong>Date:</strong>{" "}
							{format(new Date(booking.start), "PPPP")}
						</p>
						<p>
							<strong>Time: </strong> {booking.start ? format(booking.start, "p") : ""} - {format(booking.end_time, "p")}
						</p>
						<p>
							<strong>Status:</strong>{" "}
							<span
								className={
									booking.status === "completed"
										? "text-green-600 font-semibold"
										: "text-yellow-600 font-medium"
								}
							>
								{booking.status}
							</span>
						</p>
					</BentoBox>
				</div>
			</div>

			{/* Actions */}
			<div className="flex flex-col sm:flex-row gap-4 justify-between mt-6">
				{booking.status !== "completed" && (
					<button
						onClick={markAsCompleted}
						className="bg-[#F7CAC9] hover:bg-[#FBB9B8] text-[#4A2C2A] py-2 px-4 rounded transition shadow"
					>
						✅ Mark as Completed
					</button>
				)}

				<button
					onClick={() => router.back()}
					className="text-sm underline hover:text-[#FBB9B8]"
				>
					← Go Back
				</button>
			</div>
		</div>
	);
}

// Reusable Box
function BentoBox({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="bg-[#fff6f8] border border-[#F7CAC9] p-4 rounded-lg shadow-sm">
			<h3 className="font-bold mb-2">{label}</h3>
			<div className="text-sm space-y-1">{children}</div>
		</div>
	);
}
