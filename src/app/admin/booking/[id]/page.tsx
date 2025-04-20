"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { Booking } from "@/types/booking";
import { useParams } from "next/navigation";

export default function BookingDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const bookingId = params?.id;

  console.log(bookingId)

  

  const [booking, setBooking] = useState<Booking>();
  const [loading, setLoading] = useState(true);

  const fetchBooking = async () => {
    if (!bookingId) return;
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    console.log(data)
    setBooking(data);
    setLoading(false);
  };

  const markAsCompleted = async () => {
    if (!bookingId) return;
    await supabase.from("bookings").update({ status: "completed" }).eq("id", bookingId);
    fetchBooking();
  };

  useEffect(() => {
    fetchBooking();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  if (loading) return <p className="p-4">Loading booking...</p>;
  if (!booking) return <p className="p-4">Booking not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#4A2C2A] mb-4">Booking Details</h1>

      <div className="bg-[#FFF0F2] border border-[#F7CAC9] rounded-md px-5 py-4 text-[#4A2C2A]">
        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Phone:</strong> {booking.phone}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Service:</strong> {booking.service}</p>
        <p><strong>Location:</strong> {booking.location}</p>
        <p><strong>Has Pets:</strong> {booking.hasPets ? "Yes" : "No"}</p>
        <p><strong>Bedrooms:</strong> {booking.numBedrooms}</p>
        <p><strong>Bathrooms:</strong> {booking.numBathrooms}</p>
        <p><strong>Entry Instructions:</strong> {booking.entryInstructions}</p>
        <p><strong>Allow Photos:</strong> {booking.allowPhotos ? "Yes" : "No"}</p>
        <p><strong>Preferred Language:</strong> {booking.preferredLanguage}</p>
        <p><strong>Notes:</strong> {booking.notes}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Date:</strong> {format(new Date(booking.start), "PPPP")}</p>
        {/* <p><strong>Time:</strong> {format(new Date(booking.start), "p")} - {format(new Date(booking.end), "p")}</p> */}
      </div>

      {booking.status !== "completed" && (
        <button
          onClick={markAsCompleted}
          className="mt-4 bg-[#F7CAC9] hover:bg-[#FBB9B8] text-[#4A2C2A] px-4 py-2 rounded transition"
        >
          Mark as Completed
        </button>
      )}

      <button
        onClick={() => router.back()}
        className="mt-3 ml-3 text-sm text-[#4A2C2A] underline hover:text-[#F7CAC9]"
      >
        ← Back
      </button>
    </div>
  );
}
