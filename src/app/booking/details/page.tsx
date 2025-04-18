"use client";
import BookingForm from "@/components/BookingForm";
import { useBookingStore } from "@/stores/useBookingStore";

const BookingDetails = () => {
	const start = useBookingStore((state) => state.start);
	const end = useBookingStore((state) => state.end);

	if (!start && !end) {
		return <div>Loading...</div>;
	}

	return (
<div className="bg-[#fffbfb] sm:p-10">
<div className="  flex justify-center items-center">
				<div className="sm:w-[80%] ">
					<BookingForm
						fechas={{
							start: start ?? new Date(),
							end: end ?? new Date(),
						}}
						onSubmit={() => console.log("hola")}
					/>
				</div>
			</div>
		</div>
	);
};

export default BookingDetails;
