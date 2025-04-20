"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { useBookingStore } from "@/stores/useBookingStore";

const BookingDetails = () => {
	const start = useBookingStore((state) => state.start);
	const end = useBookingStore((state) => state.end);
	const router = useRouter();

	useEffect(() => {
		if (!start || !end) {
			router.push("/calendar");
		}
	}, [start, end, router]);

	if (!start || !end) {
		return null; // o un loading spinner si quieres
	}

	return (
		<div className="bg-[#fffbfb] sm:p-10">
			<div className="flex justify-center items-center">
				<div className="sm:w-[80%]">
					<BookingForm
						fechas={{
							start,
							end,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default BookingDetails;