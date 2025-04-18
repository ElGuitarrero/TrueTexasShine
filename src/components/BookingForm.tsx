/* Código actualizado con la paleta visual de True Texas Shine */

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

interface BasicBookingInfo {
	name: string;
	phone: number;
	email: string;
	location: string;
	service: "deep cleaning" | "consultation" | "office" | "general cleaning";
	notes: string;
	termsAccepted: boolean;
}

interface AdvancedBookingInfo {
	hasPets: boolean;
	propertyType: "house" | "apartment" | "office";
	numBedrooms: number;
	numBathrooms: number;
	preferredLanguage: string;
	entryInstructions: string;
	allowPhotos: boolean;
}

type BookingFormProps = {
	fechas: { start: Date; end: Date } | null;
	onSubmit: (booking: {
		name: string;
		phone: string;
		notes: string;
		start: Date;
		end: Date;
	}) => void;
};

export default function BookingForm({ fechas, onSubmit }: BookingFormProps) {
	// const [showAdvanced, setShowAdvanced] = useState(false);
	const [formData, setFormData] = useState<
		BasicBookingInfo & Partial<AdvancedBookingInfo>
	>({
		name: "",
		phone: 0,
		email: "",
		location: "",
		service: "general cleaning",
		notes: "",
		termsAccepted: false,
		hasPets: false,
		propertyType: "house",
		numBedrooms: 1,
		numBathrooms: 1,
		preferredLanguage: "en",
		entryInstructions: "",
		allowPhotos: false,
	});

	const router = useRouter();

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]:
				type === "checkbox"
					? (e.target as HTMLInputElement).checked
					: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!fechas || !formData.termsAccepted) return;

		onSubmit({
			name: formData.name,
			phone: formData.phone.toString(),
			notes: formData.notes,
			start: fechas.start,
			end: fechas.end,
		});

		Swal.fire({
			icon: "success",
			title: "Appointment Requested",
			text: "We'll confirm your booking shortly!",
			confirmButtonColor: "#F7CAC9",
		});
	};

	const inputClass = "w-full border border-[#DCC5C5] p-2 rounded";

	return (
		<form
			onSubmit={handleSubmit}
			className="flex inset-shadow-sm flex-col gap-5 p-6 rounded-xl bg-[#ffff] text-[#4A2C2A] max-w-2xl mx-auto shadow-md"
		>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<button
					type="button"
					onClick={() => router.back()}
					className="bg-[#F7CAC9] hover:bg-[#FBB9B8] px-4 py-2 rounded text-sm sm:text-base"
				>
					← Back
				</button>

				<h2 className="text-2xl font-bold text-center sm:text-left w-full">
					Book a Time Slot
				</h2>
			</div>

			{fechas && (
				<div className="grid sm:grid-cols-3 gap-4 text-sm">
					{["Start", "End"].map((label, i) => {
						const date = i === 0 ? fechas.start : fechas.end;
						return (
							<div
								key={label}
								className="bg-[#F7CAC9] p-3 rounded shadow text-center"
							>
								<h3 className="font-semibold">{label}</h3>
								<p>{date.toLocaleDateString()}</p>
								<p>{date.toLocaleTimeString()}</p>
							</div>
						);
					})}
					<div className="bg-[#F7CAC9] p-3 rounded shadow text-center">
						<h3 className="font-semibold">Duration</h3>
						<p>
							{Math.floor(
								(fechas.end.getTime() -
									fechas.start.getTime()) /
									(1000 * 60)
							)}{" "}
							minutes
						</p>
					</div>
				</div>
			)}

			<div className="space-y-3">
				{/* 👤 Full Name */}
				<div>
					<label className="text-sm flex items-center gap-2">
						👤 Full Name
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						className={inputClass}
						required
					/>
				</div>

				{/* 📞 Phone */}
				<div>
					<label className="text-sm flex items-center gap-2">
						📞 Phone
					</label>
					<input
						type="tel"
						name="phone"
						value={formData.phone || ""}
						onChange={handleInputChange}
						className={inputClass}
						required
					/>
				</div>

				{/* 📧 Email */}
				<div>
					<label className="text-sm flex items-center gap-2">
						📧 Email
					</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						className={inputClass}
						required
					/>
				</div>

				{/* 📍 Address */}
				<div>
					<label className="text-sm flex items-center gap-2">
						📍 Full Address
					</label>
					<input
						type="text"
						name="location"
						value={formData.location}
						onChange={handleInputChange}
						className={inputClass}
						required
					/>
				</div>

				{/* 🧹 Service */}
				<div>
					<label className="text-sm flex items-center gap-2">
						🧹 Service
					</label>
					<select
						name="service"
						value={formData.service}
						onChange={handleInputChange}
						className={inputClass}
						required
					>
						<option value="general cleaning">
							General Cleaning
						</option>
						<option value="deep cleaning">Deep Cleaning</option>
						<option value="office">Office</option>
						<option value="consultation">Consultation</option>
					</select>
				</div>
				{/* <button
					type="button"
					onClick={() => setShowAdvanced(!showAdvanced)}
					className="text-sm text-pink-600 hover:underline"
				>
					{showAdvanced
						? "▲ Hide Advanced Options"
						: "▼ Show Advanced Options"}
				</button> */}

				<div className="space-y-5 p-5 border border-[#F7CAC9] bg-[#FFF0F2] rounded-lg">
					<div className="grid sm:grid-cols-2 gap-4">
						<div>
							<label className="text-sm">🏠 Property Type</label>
							<select
								name="propertyType"
								value={formData.propertyType}
								onChange={handleInputChange}
								className={inputClass}
							>
								<option value="house">House</option>
								<option value="apartment">Apartment</option>
								<option value="office">Office</option>
							</select>
						</div>

						<div className="flex items-center gap-2 mt-6 sm:mt-[30px]">
							<span className="text-lg">🐶</span>
							<input
								type="checkbox"
								name="hasPets"
								checked={formData.hasPets}
								onChange={handleInputChange}
							/>
							<label className="text-sm">Has Pets?</label>
						</div>
					</div>

					<div className="grid sm:grid-cols-2 gap-4">
						<div>
							<label className="text-sm">
								🛏 Bedrooms ({formData.numBedrooms})
							</label>
							<input
								type="range"
								name="numBedrooms"
								min="1"
								max="5"
								value={formData.numBedrooms}
								onChange={handleInputChange}
								className="w-full"
							/>
						</div>
						<div>
							<label className="text-sm">
								🛁 Bathrooms ({formData.numBathrooms})
							</label>
							<input
								type="range"
								name="numBathrooms"
								min="1"
								max="5"
								value={formData.numBathrooms}
								onChange={handleInputChange}
								className="w-full"
							/>
						</div>
					</div>

					<div className="grid sm:grid-cols-2 gap-4">
						<div>
							<label className="text-sm">
								🌐 Preferred Language
							</label>
							<select
								name="preferredLanguage"
								value={formData.preferredLanguage}
								onChange={handleInputChange}
								className={inputClass}
							>
								<option value="en">English</option>
								<option value="es">Spanish</option>
							</select>
						</div>

						<div>
							<label className="text-sm">
								🔑 Entry Instructions
							</label>
							<textarea
								name="entryInstructions"
								value={formData.entryInstructions}
								onChange={handleInputChange}
								className={inputClass}
								rows={2}
							/>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<span className="text-lg">📸</span>
						<input
							type="checkbox"
							name="allowPhotos"
							checked={formData.allowPhotos}
							onChange={handleInputChange}
						/>
						<label className="text-sm">Allow Service Photos</label>
					</div>
				</div>

				<textarea
					name="notes"
					placeholder="Additional Notes (any important information we should know)"
					value={formData.notes}
					onChange={handleInputChange}
					className={`${inputClass} h-24`}
				/>

				<p className="text-xs text-gray-500">
					All schedules and times are subject to change. Please wait
					for confirmation of your appointment.
				</p>

				<div className="flex items-start gap-2">
					<input
						type="checkbox"
						name="termsAccepted"
						checked={formData.termsAccepted}
						onChange={handleInputChange}
						className="mt-1"
						required
					/>
					<label className="text-sm text-gray-600">
						I accept the terms and conditions and privacy policy
					</label>
				</div>
			</div>

			<button
				type="submit"
				disabled={!fechas || !formData.termsAccepted}
				className="bg-[#F7CAC9] hover:bg-[#FBB9B8] text-[#4A2C2A] py-2 px-4 rounded mt-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Confirm Booking
			</button>
		</form>
	);
}
