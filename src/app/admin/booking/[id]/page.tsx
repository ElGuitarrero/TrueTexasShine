"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { format, getHours, setHours } from "date-fns";
import { Booking } from "@/types/booking";
import Swal from "sweetalert2";
import CompletedService from "@/components/CompletedService";

export default function BookingDetailsPage() {
	const router = useRouter();
	const params = useParams();
	const bookingId = params?.id;
	const [lang, setLang] = useState<"en" | "es">("es");

	const [completar, setCompletar] = useState<Booking | null>()
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


	useEffect(() => {
		fetchBooking();
	}, [bookingId]);

	if (loading) return <p className="p-6">{lang === "es" ? "Cargando..." : "Loading booking..."}</p>;
	if (!booking) return <p className="p-6">{lang === "es" ? "Reserva no encontrada." : "Booking not found."}</p>;

	const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
		booking.location
	)}&output=embed`;

	const idiomas = {
		"en": "Ingles - English",
		"es": "Espanol - Spanish"
	}

	const text = {
		en: {
			title: "📋 Booking Summary",
			customer: "👤 Customer",
			service: "📦 Service Info",
			notes: "📝 Notes",
			location: "📍 Location",
			schedule: "⏰ Schedule",
			name: "Name",
			phone: "Phone",
			email: "Email",
			language: "Preferred Language",
			serviceType: "Service",
			property: "Property Type",
			pets: "Has Pets",
			bedrooms: "Bedrooms",
			bathrooms: "Bathrooms",
			instructions: "Instructions",
			photos: "Allow Photos",
			additional: "Additional Notes",
			address: "Address",
			colonia: "Colonia",
			zipcode: "Zipcode",
			date: "Date",
			time: "Time",
			status: "Status",
			completed: "✅ Mark as Completed",
			repeat: "🔁 Book Again",
			back: "← Go Back",
			confirmTitle: "Book this client again?",
			confirmText: "Their info will be pre-filled.",
			yes: "Yes, book again",
			cancel: "Cancel",
			loading: "Loading booking...",
			notFound: "Booking not found.",
		},
		es: {
			title: "📋 Detalles de la Reserva",
			customer: "👤 Cliente",
			service: "📦 Servicio",
			notes: "📝 Notas",
			location: "📍 Ubicación",
			schedule: "⏰ Horario",
			name: "Nombre",
			phone: "Teléfono",
			email: "Correo",
			language: "Idioma preferido",
			serviceType: "Servicio",
			property: "Tipo de propiedad",
			pets: "¿Mascotas?",
			bedrooms: "Cuartos",
			bathrooms: "Baños",
			instructions: "Instrucciones",
			photos: "Permitir fotos",
			additional: "Notas adicionales",
			address: "Dirección",
			colonia: "Colonia",
			zipcode: "Código postal",
			date: "Fecha",
			time: "Horario",
			status: "Estado",
			completed: "✅ Marcar como completado",
			repeat: "🔁 Volver a agendar",
			back: "← Regresar",
			confirmTitle: "¿Volver a agendar este cliente?",
			confirmText: "Se precargarán sus datos.",
			yes: "Sí, volver a agendar",
			cancel: "Cancelar",
			loading: "Cargando reserva...",
			notFound: "Reserva no encontrada.",
		},
	}[lang];
	const startDate = new Date(booking.start)
	const endDate = new Date(booking.end_time)

	const localStart = setHours(startDate, getHours(startDate) - 5)
	const localEnd = setHours(endDate, getHours(endDate) - 5)

	return (
		<div className="max-w-5xl mx-auto p-6 space-y-6 text-[#4A2C2A]">

			<div className="flex justify-end">
				<button
					onClick={() => setLang(lang === "en" ? "es" : "en")}
					className="text-sm px-3 py-1 border border-[#F7CAC9] rounded bg-[#fff6f8] hover:bg-[#FBB9B8]"
				>
					🌐 {lang === "en" ? "Español" : "English"}
				</button>
			</div>

			<h1 className="text-3xl font-bold text-center mb-4">{text.title}</h1>

			{/* Grid layout */}
			<div className="grid sm:grid-cols-2 gap-5">
				{/* Column 1 */}
				<div className="space-y-4 flex flex-col justify-between">
					<BentoBox label={text.customer}>
						<p>
							<strong>{text.name}:</strong> {booking.name}
						</p>
						<p>
							<strong>{text.phone}:</strong> {booking.phone}
						</p>
						<p>
							<strong>{text.email}:</strong> {booking.email}
						</p>
						<p>
							<strong>{text.language}:</strong>{" "}
							{booking.preferred_language && idiomas[booking.preferred_language]}
						</p>
					</BentoBox>

					<BentoBox label={text.service}>
						<p>
							<strong>{text.serviceType}:</strong> {booking.service}
						</p>
						<p>
							<strong>{text.property}:</strong>{" "}
							{booking.property_type}
						</p>
						<p>
							<strong>{text.pets}:</strong>{" "}
							{booking.has_pets ? "Yes" : "No"}
						</p>
						<p>
							<strong>{text.bedrooms}:</strong> {booking.num_bedrooms}
						</p>
						<p>
							<strong>{text.bathrooms}:</strong> {booking.num_bathrooms}
						</p>
					</BentoBox>

					<BentoBox label={text.notes}>
						<p>
							<strong>{text.instructions}:</strong>{" "}
							{booking.entry_instructions}
						</p>
						<p>
							<strong>{text.photos}:</strong>{" "}
							{booking.allow_photos ? "Yes" : "No"}
						</p>
						<p>
							<strong>{text.additional}:</strong> {booking.notes}
						</p>
					</BentoBox>
				</div>

				{/* Column 2 */}
				<div className="space-y-4 flex flex-col justify-between">
					<BentoBox label={text.location}>
						<p>
							<strong>{text.address}:</strong> {booking.location}
						</p>
						{booking.colonia ? (
							<p>
								<strong>{text.colonia}:</strong> {booking.colonia}
							</p>
						) : (
							""
						)}
						{booking.zipcode ? (
							<p>
								<strong>{text.zipcode}:</strong> {booking.zipcode}
							</p>
						) : (
							""
						)}

						<div className="rounded-lg overflow-hidden mt-3 shadow-md">
							<iframe
								src={mapUrl}
								width="100%"
								height="240"
								style={{ border: 0 }}
								loading="lazy"
								allowFullScreen
							/>
						</div>
					</BentoBox>

					<BentoBox label={text.schedule}>
						<p>
							<strong>{text.date}:</strong>{" "}
							{format(new Date(booking.start), "PPPP")}
						</p>
						<p>
							<strong>{text.time}: </strong>{" "}
							{localStart ? format(localStart, "p") : ""} -{" "}
							{format(localEnd, "p")}
						</p>
						<p>
							<strong>{text.status}:</strong>{" "}
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

				<div>
					<BentoBox label={`💵 Precio estimado (por el sistema)`}>
						<p className="text-xl font-semibold">→ {booking.precio_estimado} USD</p>
					</BentoBox>
				</div>
			</div>

			{/* Actions */}
			<div className="flex flex-col sm:flex-row gap-4 justify-between mt-6">
				{booking.status === "completed" && (
					<button
						onClick={async () => {
							const result = await Swal.fire({
								title: "¿Volver a agendar este cliente?",
								text: "Se precargarán sus datos en el formulario de reserva.",
								icon: "question",
								showCancelButton: true,
								confirmButtonColor: "#F7CAC9",
								cancelButtonColor: "#ddd",
								confirmButtonText: "Sí, volver a agendar",
								cancelButtonText: "Cancelar",
							});



							if (result.isConfirmed) {
								localStorage.setItem("repeatClient", JSON.stringify({
									name: booking.name,
									phone: booking.phone,
									email: booking.email,
									location: booking.location,
									service: booking.service,
									preferred_language: booking.preferred_language,
									has_pets: booking.has_pets,
									property_type: booking.property_type,
									num_bedrooms: booking.num_bedrooms,
									num_bathrooms: booking.num_bathrooms,
									entry_instructions: booking.entry_instructions,
									allow_photos: booking.allow_photos,
									notes: booking.notes,
									colonia: booking.colonia,
									zipcode: booking.zipcode,
								}));
								router.push("/calendar");
							}
						}}
						className="bg-[#FFE5EC] hover:bg-[#FBB9B8] text-[#4A2C2A] py-2 px-4 rounded transition shadow"
					>
						🔁 Volver a agendar
					</button>
				)}

				{booking.status !== "completed" && (
					<button
						onClick={() => setCompletar(booking)}
						className="cursor-pointer bg-[#F7CAC9] hover:bg-[#FBB9B8] text-[#4A2C2A] py-2 px-4 rounded transition shadow"
					>
						{text.completed}
					</button>
				)}

				{/* <button onClick={() => setCompletar(booking)}>HOLA</button> */}
				{completar && <CompletedService booking={booking} setBooking={() => setCompletar(null)} fetchBooking={fetchBooking} />}


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
