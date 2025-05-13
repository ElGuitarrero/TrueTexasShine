/* Código actualizado con la paleta visual de True Texas Shine */

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";
import GooglePlacesInput from "@/components/GooglePlacesInput";

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
};

export default function BookingForm({ fechas }: BookingFormProps) {
	// const [showAdvanced, setShowAdvanced] = useState(false);
	const [formData, setFormData] = useState<
		BasicBookingInfo &
		Partial<
			AdvancedBookingInfo & { colonia?: string; zipcode?: string; monto_cobrado:number }
		>
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
		numBedrooms: 4,
		numBathrooms: 3,
		preferredLanguage: "en",
		entryInstructions: "",
		allowPhotos: false,
		colonia: "",
		zipcode: "",
	});
	const [precioEstimado, setPrecioEstimado] = useState(0)

	const router = useRouter();
	type Servicio = "deep cleaning" | "consultation" | "office" | "general cleaning";

	function calcularPrecio(
		tipo: Servicio,
		cuartos: number,
		banos: number,
		hasPets: boolean
	): number {
		const tarifas = {
			"deep cleaning": { base: 120, cuarto: 20, bano: 25 },
			"default": { base: 90, cuarto: 15, bano: 20 }
		};

		const precios = tipo === "deep cleaning" ? tarifas["deep cleaning"] : tarifas["default"];
		const mascotas = hasPets ? 30 : 0;

		const precio = precios.base + (cuartos - 1) * precios.cuarto + (banos - 1) * precios.bano + mascotas;

		return precio
	}

	useEffect(() => {
		const nuevoPrecio = calcularPrecio(
			formData.service,
			formData.numBedrooms ?? 1,
			formData.numBathrooms ?? 1,
			formData.hasPets ?? false
		);
		setPrecioEstimado(nuevoPrecio);
	}, [
		formData.service,
		formData.numBedrooms,
		formData.numBathrooms,
		formData.hasPets,
	]);

	const estimatedPrice = precioEstimado
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!fechas || !formData.termsAccepted) return;

		// const breakStart = fechas.start
		const breakEnd = new Date(fechas.end);
		breakEnd.setHours(fechas.end.getHours() + 1);

		const { error } = await supabase.from("bookings").insert([
			{
				name: formData.name,
				phone: formData.phone.toString(),
				email: formData.email,
				location: formData.location,
				service: formData.service,
				start: fechas.start,
				end_time: breakEnd,
				notes: formData.notes,
				has_pets: formData.hasPets,
				property_type: formData.propertyType,
				num_bedrooms: formData.numBedrooms,
				num_bathrooms: formData.numBathrooms,
				preferred_language: formData.preferredLanguage,
				entry_instructions: formData.entryInstructions,
				allow_photos: formData.allowPhotos,
				status: "pending",
				colonia: formData.colonia,
				zipcode: formData.zipcode,
				precio_estimado: precioEstimado
			},
		]);

		if (error) {
			console.error("❌ Error saving booking:", error.message);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "There was a problem saving your booking. Please try again.",
				confirmButtonColor: "#F7CAC9",
			});
			return;
		}

		Swal.fire({
			icon: "success",
			title: "Appointment Requested",
			text: "We'll confirm your booking shortly!",
			confirmButtonColor: "#F7CAC9",
		}).then(() => {
			router.push("/"); // o a una página de confirmación
		});

		// console.log(data);
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
					className="cursor-pointer bg-[#F7CAC9] hover:bg-[#FBB9B8] px-4 py-2 rounded text-sm sm:text-base"
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

				{/* 📍 Address with Autocomplete */}
				<div>
					<label className="text-sm flex items-center gap-2">
						📍 Full Address
					</label>
					<GooglePlacesInput
						apiKey={process.env.NEXT_PUBLIC_CLAVE_GOOGLE_API!}
						value={formData.location}
						onChange={(val) =>
							setFormData((prev) => ({ ...prev, location: val }))
						}
						onSelect={(val) =>
							setFormData((prev) => ({ ...prev, location: val }))
						}
					/>
				</div>
				{/* 🏘 Colonia */}
				{/* <div>
					<label className="text-sm flex items-center gap-2">
						🏘 City
					</label>
					<input
						type="text"
						name="colonia"
						value={formData.colonia}
						onChange={handleInputChange}
						className={inputClass}
					/>
				</div> */}

				{/* 🧾 Zip Code */}
				<div>
					<label className="text-sm flex items-center gap-2">
						🧾 Zip Code
					</label>
					<input
						type="text"
						name="zipcode"
						value={formData.zipcode}
						onChange={handleInputChange}
						className={inputClass}
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

				<div className="flex flex-col gap-4 p-5 border border-[#F7CAC9] bg-[#FFF0F2] rounded-lg">
					<div>
						<p className="text-lg font-semibold">Property Information</p>
					</div>

					<label className="text-sm text-[#4A2C2A]">
						🏠 Property Type
					</label>
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

					<div className="flex gap-3 items-center">
						<input
							type="checkbox"
							name="hasPets"
							checked={formData.hasPets}
							onChange={handleInputChange}
							className="accent-green-600 size-4 cursor-pointer"
						/>
						<label className="text-sm text-[#4A2C2A]">
							🐶 Has Pets?
						</label>
					</div>

					<label className="text-sm text-[#4A2C2A]">🛏 Number of Bedrooms</label>
					<select
						name="numBedrooms"
						value={formData.numBedrooms}
						onChange={handleInputChange}
						className={inputClass}
					>
						{[1, 2, 3, 4, 5].map((num) => (
							<option key={num} value={num}>
								{num > 4 ? `${num}+` : num} Bedroom{num > 1 ? "s" : ""}
							</option>
						))}
					</select>

					<label className="text-sm text-[#4A2C2A]">
						🛁 Number of Bathrooms
					</label>
					<select
						name="numBathrooms"
						value={formData.numBathrooms}
						onChange={handleInputChange}
						className={inputClass}
					>
						{[1, 2, 3, 4, 5].map((num) => (
							<option key={num} value={num}>
								{num > 4 ? `${num}+` : num} Bathroom{num > 1 ? "s" : ""}
							</option>
						))}
					</select>

					<label className="text-sm text-[#4A2C2A]">
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

					<label className="text-sm text-[#4A2C2A]">
						🔑 Entry Instructions
					</label>
					<textarea
						name="entryInstructions"
						value={formData.entryInstructions}
						onChange={handleInputChange}
						className={inputClass}
						rows={2}
					/>

					<div className="flex gap-3 items-center">
						<input
							type="checkbox"
							name="allowPhotos"
							checked={formData.allowPhotos}
							onChange={handleInputChange}
							className="accent-green-600 size-4 cursor-pointer"
						/>
						<label className="text-sm text-[#4A2C2A]">
							📸 Allow Service Photos
						</label>
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

				<div className="pl-2 flex items-center gap-3">
					<input
						id="terms"
						type="checkbox"
						name="termsAccepted"
						checked={formData.termsAccepted}
						onChange={handleInputChange}
						className=" cursor-pointer accent-green-600 size-4"
						required
					/>
					<label htmlFor="terms" className="text-sm text-[#4A2C2A] leading-snug">
						I accept the <a href="/terms" className="underline hover:text-[#FBB9B8]">terms and conditions</a> and <a href="/privacy" className="underline hover:text-[#FBB9B8]">privacy policy</a>.
					</label>
				</div>
			</div>
			<div className="text-center text-lg font-semibold text-[#4A2C2A] bg-[#FFF0F2] p-3 rounded shadow">
				Estimated Price: ${estimatedPrice}
				<p className="text-sm font-normal text-gray-500 mt-1">
					Final price may vary based on home condition or additional
					requirements.
				</p>
			</div>
			<button
				type="submit"
				disabled={!fechas || !formData.termsAccepted}
				className="cursor-pointer bg-[#F7CAC9] hover:bg-[#FBB9B8] text-[#4A2C2A] py-2 px-4 rounded mt-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Confirm Booking
			</button>
		</form>
	);
}
