"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format, getHours, isSameDay, setHours } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Link from "next/link";
import Swal from "sweetalert2";

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
		try {
			const { data } = await supabase
				.from("bookings")
				.select(
					"id, name, phone, service, location, start, end_time, status"
				)
				.order("start", { ascending: true });

			if (data) setBookings(data);

			setLoading(false);
		} catch (error) {
			alert(`Hubo un error al cargar los datos ${error}`)
		}
	};



	const markAsCompleted = async (id: string) => {
		const result = await Swal.fire({
			title: "¿Marcar como completado?",
			text: "¿Estás seguro de que quieres marcar esta reservación como completada?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#F7CAC9",
			cancelButtonColor: "#ccc",
			confirmButtonText: "Sí, marcar",
			cancelButtonText: "Cancelar",
		});

		if (!result.isConfirmed) return;

		const { error } = await supabase
			.from("bookings")
			.update({ status: "completed" })
			.eq("id", id);

		if (error) {
			console.error("Error al actualizar:", error.message);
			Swal.fire("Error", "Hubo un problema al actualizar el estado.", "error");
			return;
		}

		await fetchBookings();

		Swal.fire("¡Listo!", "La reservación fue marcada como completada.", "success");
	};
	useEffect(() => {

		const savedAuth = localStorage.getItem("admin-auth");
		if (savedAuth === "true") {
			setAuthenticated(true);
		}

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
							localStorage.setItem("admin-auth", "true"); // 👈 guarda en localStorage
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

	const dayWithBookings = bookings.map((b) => format(new Date(b.start), "yyyy-MM-dd"))
	const estatus = {
		"pending": "Pendiente",
		"completed": "Completado"
	}
	const getStatusStyle = (status: string) => {
		return status === "completed"
			? "bg-green-600 text-green-100"
			: "bg-yellow-300 text-yellow-900";
	};

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
					const startDate = new Date(b.start)
					const endDate = new Date(b.end_time)

					const localStart = setHours(startDate, getHours(startDate) - 5)
					const localEnd = setHours(endDate, getHours(endDate) - 5)

					const timeRange = `${format(localStart, "hh:mm a")} - ${format(
						localEnd,
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
									className={`text-xs px-2 py-0.5 rounded ${getStatusStyle(b.status)}`}
								>
									{estatus[b.status as keyof typeof estatus]}
								</span>
							</div>

							<div className="text-md font-medium">
								{b.name} {"-"} {b.phone} <br /> {b.location}
							</div>
							<div className="text-sm text-[#7A5A59]">
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
									<button className="cursor-pointer mt-2 text-sm bg-blue-400 hover:bg-blue-500 hover:text-white text-black px-4 py-2 rounded self-start transition">
										Detalles
									</button>
								</Link>
								{b.status !== "completed" && (
									<button
										onClick={() => markAsCompleted(b.id)}
										className="cursor-pointer mt-2 text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded self-start transition"
									>
										Marcar como completado
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

			<div className="gap-6 w-full">
				<div>
					<h3 className="text-lg font-semibold mb-2 text-[#4A2C2A]">
						Select a day
					</h3>
					<Calendar
						onChange={(date) => setSelectedDate(date as Date)}
						value={selectedDate}
						className="w-full rounded border border-[#F7CAC9] p-2"
						tileContent={({ date, view }) =>
							view === "month" && dayWithBookings.includes(format(date, "yyyy-MM-dd")) ? (
								<div className="flex justify-center mt-1">
									<span className="w-2 h-2 rounded-full bg-[#F7CAC9]"></span>
								</div>
							) : null}
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
