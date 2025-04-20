"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format, isSameDay } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Link from "next/link";

export interface Booking {
	id: string;
	name: string;
	phone: string;
	service: string;
	location: string;
	start: string;
	end_time: string;
	status: string;
}

export default function AdminDashboard() {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [loading, setLoading] = useState(true);
	const [authenticated, setAuthenticated] = useState(false);
	const [pin, setPin] = useState("");
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const fetchBookings = async () => {
		const { data } = await supabase
			.from("bookings")
			.select(
				"id, name, phone, service, location, start, end_time, status"
			)
			.order("start", { ascending: true });

		if (data) setBookings(data);
		setLoading(false);
	};

	const markAsCompleted = async (id: string) => {
		await supabase
			.from("bookings")
			.update({ status: "completed" })
			.eq("id", id);
		fetchBookings();
	};

	useEffect(() => {
		if (authenticated) fetchBookings();
	}, [authenticated]);

	const filteredBookings = selectedDate
		? bookings.filter((b) => isSameDay(new Date(b.start), selectedDate))
		: bookings;

	if (!authenticated) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6">
				<h1 className="text-2xl font-bold text-[#4A2C2A]">
					Enter Admin PIN
				</h1>
				<input
					type="password"
					value={pin}
					onChange={(e) => setPin(e.target.value)}
					className="p-2 border border-[#DCC5C5] rounded text-center"
					placeholder="Enter 4-digit PIN"
				/>
				<button
					onClick={() => {
						if (pin === "2024") {
							setAuthenticated(true);
						} else {
							alert("Incorrect PIN");
						}
					}}
					className="px-4 py-2 bg-[#F7CAC9] hover:bg-[#FBB9B8] text-[#4A2C2A] rounded"
				>
					Access
				</button>
			</div>
		);
	}

	if (loading) return <p className="text-center p-4">Loading bookings...</p>;

	const MostrarInformacion = ({
		filteredBookings,
	}: {
		filteredBookings: Booking[];
	}) => {
		return (
			<>
				{filteredBookings.length === 0 && (
					<p className="text-sm text-gray-500 italic">
						No bookings for this day.
					</p>
				)}

				{filteredBookings.map((b) => {
					const start = new Date(b.start);
					const end = new Date(b.end_time);
					const timeRange = `${format(start, "hh:mm a")} - ${format(
						end,
						"hh:mm a"
					)}`;

					return (
						<div
							key={b.id}
							className="bg-[#FFF0F2] border border-[#F7CAC9] rounded-md px-4 py-3 shadow-sm text-[#4A2C2A] flex flex-col gap-1"
						>
							<div className="flex justify-between text-sm font-semibold">
								<span>{timeRange}</span>
								<span
									className={`text-xs px-2 py-0.5 rounded ${
										b.status === "completed"
											? "bg-green-100 text-green-600"
											: "bg-yellow-100 text-yellow-700"
									}`}
								>
									{b.status}
								</span>
							</div>

							<div className="text-sm font-medium">
								{b.name} {"-"} {b.location}
							</div>
							<div className="text-xs text-[#7A5A59]">
								{b.service
									.split(" ")
									.map(
										(item) =>
											`${item
												.charAt(0)
												.toUpperCase()}${item.slice(
												1
											)} `
									)}
							</div>

							<div className="flex gap-2">
								<Link href={`/admin/booking/${b.id}`}>
									<button className="mt-2 text-xs bg-[#F7CAC9] hover:bg-[#FBB9B8] text-[#4A2C2A] px-3 py-1 rounded self-start transition">
										Details
									</button>
								</Link>
								{b.status !== "completed" && (
									<button
										onClick={() => markAsCompleted(b.id)}
										className="mt-2 text-xs bg-[#F7CAC9] hover:bg-[#FBB9B8] text-[#4A2C2A] px-3 py-1 rounded self-start transition"
									>
										Mark as Done
									</button>
								)}
							</div>
						</div>
					);
				})}
			</>
		);
	};

	return (
		<div className="p-4 sm:p-6 max-w-4xl mx-auto">
			<h2 className="text-2xl font-bold mb-4 text-[#4A2C2A]">
				Admin Dashboard
			</h2>

			<div className="grid md:grid-cols-2 gap-6">
				<div>
					<h3 className="text-lg font-semibold mb-2 text-[#4A2C2A]">
						Select a day
					</h3>
					<Calendar
						onChange={(date) => setSelectedDate(date as Date)}
						value={selectedDate}
						className="rounded border border-[#F7CAC9] p-2"
					/>
					{selectedDate && (
						<p className="mt-2 text-sm text-gray-700">
							Showing bookings for:{" "}
							<strong>{format(selectedDate, "PPP")}</strong>
						</p>
					)}
				</div>
			</div>

			{selectedDate && (
				<div className="w-full mt-8 space-y-3">
					<h3 className="text-lg font-semibold text-[#4A2C2A] mb-2">
						Bookings of the Day
					</h3>

					<MostrarInformacion filteredBookings={filteredBookings} />
				</div>
			)}
		</div>
	);
}
