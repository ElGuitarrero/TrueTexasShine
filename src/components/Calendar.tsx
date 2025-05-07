"use client";

import {
	format,
	setHours,
	setMinutes,
	isBefore,
	addWeeks,
	subWeeks,
	startOfWeek,
	addMinutes,
	parseISO
} from "date-fns";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useBookingStore } from "@/stores/useBookingStore";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Booking {
	start: Date;
	end: Date;
}

const slots = Array.from({ length: 25 }, (_, i) => 6 + i * 0.5);

const formatHour = (hour: number) => {
	const fullHours = Math.floor(hour);
	const minutes = hour % 1 === 0.5 ? "30" : "00";
	const suffix = fullHours >= 12 ? "PM" : "AM";
	const displayHour = fullHours % 12 === 0 ? 12 : fullHours % 12;
	return `${displayHour}:${minutes} ${suffix}`;
};

const getWeekDates = (startDate: Date) => {
	const start = startOfWeek(startDate, { weekStartsOn: 1 });
	return Array.from({ length: 6 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
};

const WeeklyCalendar = () => {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [hoveredCell, setHoveredCell] = useState<{ date: Date; hour: number } | null>(null);
	const [selectedRange, setSelectedRange] = useState<Booking | null>(null);
	const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
	const router = useRouter();
	const setBooking = useBookingStore((state) => state.setBooking);
	const weekDates = getWeekDates(currentWeekStart);	
	const [clienteRepetir, setClienteRepetir] = useState<Booking | null>(null)

	useEffect(() => {
		const fetchBookings = async () => {
			const { data, error } = await supabase.from("bookings").select("start, end_time");
			if (data) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const parsed = data.map((b: any) => ({
					start: parseISO(b.start),
					end: parseISO(b.end_time),
				}));
				setBookings(parsed);
			}
			if (error) console.error("Error fetching bookings", error);
		};
	
		fetchBookings();
	
		// 💡 Detecta si viene desde "volver a agendar"
		const repeatClient = localStorage.getItem("repeatClient");
		if (repeatClient) {
			setClienteRepetir(JSON.parse(repeatClient));
			console.log("Rebooking for client:", JSON.parse(repeatClient));
			// aquí podrías incluso mostrar un mensaje o preseleccionar algo visual si quieres
		}
	}, []);

	const handleCellClick = (dayIndex: number, hour: number) => {
		const baseDate = weekDates[dayIndex];
		const start = setMinutes(
			setHours(baseDate, Math.floor(hour)),
			hour % 1 === 0.5 ? 30 : 0
		);
		const end = addMinutes(start, 120);

		if (end.getHours() + end.getMinutes() / 60 > 18.5) {
			Swal.fire({
				title: "Invalid time range",
				text: "End time can't go past 6:00 PM",
				icon: "error",
				iconColor: "oklch(59.2% .249 .584)",
				confirmButtonText: "Got it",
			});
			return;
		}

		if (isPast(start, hour)) {
			Swal.fire({
				title: "This time has already passed",
				text: "You can't book a slot in the past. Please choose a future time.",
				icon: "error",
				iconColor: "oklch(59.2% .249 .584)",
				confirmButtonText: "Got it",
			});
			return;
		}

		if (isBooked(start, end) || isPast(start, hour)) {
			Swal.fire({
				title: "Already Booked",
				text: "This timeslot is already booked",
				icon: "error",
				iconColor: "oklch(59.2% .249 .584)",
				confirmButtonText: "Got it",
			});
			return;
		}

		if (!isOverlapping(start, end) && !isPast(baseDate, hour)) {
			setSelectedRange({ start, end });
		}
	};

	// ┌──────────────────┐
	// │ Helper Functions
	// └──────────────────┘
	const isOverlapping = (start: Date, end: Date) => {
		return bookings.some(
			(b) =>
				(start >= b.start && start < b.end) ||
				(end > b.start && end <= b.end) ||
				(start <= b.start && end >= b.end)
		);
	};

	const isPast = (date: Date, hour: number) => {
		const time = setMinutes(
			setHours(date, Math.floor(hour)),
			hour % 1 === 0.5 ? 30 : 0
		);
		return isBefore(time, new Date());
	};

	const isBooked = (start: Date, end: Date) => {
		return bookings.some(
			(b) =>
				(start >= b.start && start < b.end) ||
				(end > b.start && end <= b.end) ||
				(start <= b.start && end >= b.end)
		);
	};

	const isSelected = (date: Date, hour: number) => {
		if (!selectedRange) return false;
		const current = setMinutes(
			setHours(date, Math.floor(hour)),
			hour % 1 === 0.5 ? 30 : 0
		);
		return current >= selectedRange.start && current < selectedRange.end;
	};

	const isHovered = (date: Date, hour: number) => {
		if (!hoveredCell) return false;
		const hoveredStart = setMinutes(
			setHours(hoveredCell.date, Math.floor(hoveredCell.hour)),
			hoveredCell.hour % 1 === 0.5 ? 30 : 0
		);
		const hoveredEnd = addMinutes(hoveredStart, 120);
		const current = setMinutes(
			setHours(date, Math.floor(hour)),
			hour % 1 === 0.5 ? 30 : 0
		);
		return (
			current >= hoveredStart &&
			current < hoveredEnd &&
			!isBooked(hoveredStart, hoveredEnd) &&
			!isPast(date, hour)
		);
	};

	const getCellClasses = (date: Date, hour: number) => {
		const start = setMinutes(
			setHours(date, Math.floor(hour)),
			hour % 1 === 0.5 ? 30 : 0
		);
		const end = addMinutes(start, 30);

		const blocked = isBooked(start, end) || isPast(date, hour);
		const active = isSelected(date, hour);
		const hovering = isHovered(date, hour);

		const isFirst =
			selectedRange && start.getTime() === selectedRange.start.getTime();
		const isLast =
			selectedRange &&
			addMinutes(start, 30).getTime() === selectedRange.end.getTime();

		const rounded = active
			? isFirst && isLast
				? "rounded-sm"
				: isFirst
				? "rounded-t-sm"
				: isLast
				? "rounded-b-sm"
				: ""
			: "";

		const base = "text-center transition-all duration-150 ";

		if (blocked)
			return `${base} bg-gray-200 text-gray-400 cursor-not-allowed border-x border-gray-300 `;
		if (active)
			return `${base} bg-[#F7CAC9] text-[#4A2C2A] font-semibold ${rounded}`;
		if (hovering) return `${base} bg-[#fdeceb] text-[#4A2C2A] ${rounded}`;

		return `${base} text-gray-700 hover:bg-pink-50`;
	};

	const ControlesSemanales = () => {
		return (
			// {/* Controls */}
			<div className="flex flex-row justify-between items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
				<button
					onClick={() =>
						setCurrentWeekStart((prev) => subWeeks(prev, 1))
					}
					className={`${estiloBotonSemana}`}
				>
					← Previous Week
				</button>

				<h2 className="text-lg sm:text-xl font-bold text-gray-800">
					Week of {format(weekDates[0], "MMM dd")}
				</h2>

				<button
					onClick={() =>
						setCurrentWeekStart((prev) => addWeeks(prev, 1))
					}
					className={`${estiloBotonSemana}`}
				>
					Next Week →
				</button>
			</div>
		);
	};

	const InformacionSeleccionada = () => (
		<div className="h-full w-full flex items-center">
			<div className="text-gray-800 h-full w-full flex flex-col items-center bg-[#fff6f8] rounded border border-gray-300 justify-center">
				<div className="flex w-full flex-col items-center px-5 py-4 drop-shadow-md justify-center gap-3">
					{selectedRange ? (
						<>
							<div>
								<p className="font-semibold">Selected Range:</p>
								<p className="">
									{format(
										selectedRange.start,
										"EEEE, MMM dd"
									)}
									<br />
									{formatHour(
										selectedRange.start.getHours() +
											selectedRange.start.getMinutes() /
												60
									)}{" "}
									–{" "}
									{formatHour(
										selectedRange.end.getHours() +
											selectedRange.end.getMinutes() / 60
									)}
								</p>
							</div>

							<div className="w-full">
								<button
									onClick={() => {
										setBooking(selectedRange);
										router.push("/booking/details");
									}}
									className="px-4 w-full py-2 bg-[#F7CAC9] text-[#4A2C2A] rounded-md shadow hover:bg-[#FBB9B8] transition cursor-pointer"
								>
									Confirm Booking
								</button>
							</div>
						</>
					) : (<p>{clienteRepetir ? "Please select the hours that you want us to work " : `Estas reagendando`}</p>)}
				</div>
			</div>
		</div>
	);

	const estiloBotonSemana =
		"max-sm:text-sm px-2 sm:px-4 cursor-pointer py-2 bg-[#FFE5EC] text-[#4A2C2A] rounded-md shadow hover:bg-[#FBB9B8] transition drop-shadow-xl";
	// ┌────────┐
	// │ Return
	// └────────┘
	return (
		<div className="p-5 flex w-full">
			{/* Columna 1 */}
			<div className="flex flex-col w-full">
				<ControlesSemanales />

				<div className="flex flex-col md:flex-row gap-5 transition-all duration-300 w-full">
					{/* Calendario */}
					<div
						className={`w-full ${
							selectedRange ? "md:basis-4/5" : "md:basis-full"
						}`}
					>
						<div className="overflow-x-auto rounded-lg shadow">
							<table className="table-auto w-full border-collapse text-xs sm:text-sm">
								<thead className="drop-shadow-xl">
									<tr className="bg-[#FFE5EC]">
										<th className="w-12 sm:w-14 p-2 border border-gray-200"></th>
										{weekDates.map((date, i) => (
											<th
												key={i}
												className="w-20 sm:w-28 text-center border border-gray-200 p-2 font-medium text-gray-600"
											>
												{format(date, "EEE")}
												<div className="text-[10px] sm:text-xs text-gray-400">
													{format(date, "MM/dd")}
												</div>
											</th>
										))}
									</tr>
								</thead>

								<tbody>
									{slots.map((hour) => (
										<tr key={hour}>
											<td
												className={`text-right px-1 border border-gray-200 text-gray-500 whitespace-nowrap transition-all duration-150 ${
													weekDates.some((d) =>
														isHovered(d, hour)
													)
														? "bg-[#fdeceb]"
														: ""
												} ${
													weekDates.some((d) =>
														isSelected(d, hour)
													)
														? "bg-[#F7CAC9] font-semibold text-black"
														: ""
												}`}
											>
												{formatHour(hour)}
											</td>
											{weekDates.map((date, dayIndex) => (
												<td
													key={dayIndex}
													onMouseEnter={() => {
														const start =
															setMinutes(
																setHours(
																	date,
																	Math.floor(
																		hour
																	)
																),
																hour % 1 === 0.5
																	? 30
																	: 0
															);
														const end = addMinutes(
															start,
															120
														);
														if (
															!isBooked(
																start,
																end
															) &&
															!isPast(date, hour)
														) {
															setHoveredCell({
																date,
																hour,
															});
														}
													}}
													onMouseLeave={() =>
														setHoveredCell(null)
													}
													onClick={() =>
														handleCellClick(
															dayIndex,
															hour
														)
													}
													className={`h-[1.2rem] sm:h-[1.45rem] border-x border-gray-200 cursor-pointer ${getCellClasses(
														date,
														hour
													)}`}
												/>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					{/* Info seleccionada */}
					
						<div className="w-full md:basis-1/5">
							<InformacionSeleccionada />
						</div>
					
				</div>
			</div>
		</div>
	);
};

export default WeeklyCalendar;
