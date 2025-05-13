import { Booking } from "@/types/booking"
import { useState } from "react"
import { CompletedServiceType } from "../types/types"
import Swal from "sweetalert2"
import { supabase } from "@/lib/supabase"

interface Props {
    booking: Booking
    setBooking: (booking: Booking | null) => void
    fetchBooking: () => void

}


const markAsCompleted = async (bookingID: string) => {
    const id = bookingID

    const { error } = await supabase
        .from("bookings")
        .update({ status: "completed" })
        .eq("id", id);

    if (error) {
        console.error("Error al actualizar:", error.message);
        Swal.fire("Error", "Hubo un problema al actualizar el estado.", "error");
        return;
    }
};

export default function CompletedService({ booking, setBooking, fetchBooking }: Props) {
    const [formData, setFormData] = useState<CompletedServiceType>({
        booking_id: booking.id,
        service_type: booking.service,
        feedback: "",
        notes: "",
        rating: 4,
        monto_cobrado: 0
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await markAsCompleted(booking.id)

        const { error } = await supabase.from('completed_services').insert([
            {
                booking_id: formData.booking_id,
                service_type: formData.service_type,
                completed_at: new Date(),
                feedback: formData.feedback,
                notes: formData.notes,
                rating: formData.rating,
                monto_cobrado: formData.monto_cobrado
            }
        ])

        if (error) {
            console.error("Error saving completed service:" + error.message);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un error al guardar el servicio completado"
            })
            return
        }

        Swal.fire({
            icon: "success",
            title: "Servicio Completado guardado correctamente",
            text: "Se ha guardado correctamente el servicio completado"
        }).then(() => {
            setBooking(null)
            fetchBooking()
        })
    }

    const labelCSS = "text-sm flex items-center gap-2"
    const inputCSS = "w-full h-12 border border-[#DCC5C5] p-2 rounded"

    return (
        <div className="absolute fixed inset-0 h-[100vh] w-[100vw] z300 bg-black/50 backdrop-blur-xs">
            <div className="p-10 rounded fixed inset-0 h-fit w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
                <button className={`px-3 py-1 bg-rose-100 rounded mb-3 hover:bg-rose-200 cursor-pointer`} onClick={() => setBooking(null)}>SALIR</button>
                <form
                    onSubmit={handleSubmit}>


                    <div>
                        <label className={labelCSS}>Retroalimentacion</label>
                        <input
                            type="text"
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleInputChange}
                            className={inputCSS}
                            required
                        />
                    </div>

                    <div>
                        <label className={labelCSS}>Notas</label>
                        <input
                            type="text"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            className={inputCSS}
                            required
                        />
                    </div>

                    
                    <div>
                        <label className={labelCSS}>Calificacion</label>
                        <select
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            className={inputCSS}
                            required
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>{num} {"⭐".repeat(num)}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={labelCSS}>Monto Cobrado</label>
                        
                        <input
                            type="number"
                            name="monto_cobrado"
                            value={formData.monto_cobrado}
                            min={1} max={3000} step={0.1}
                            onChange={handleInputChange}
                            className={inputCSS}
                            placeholder="$0.00"
                        />
                    </div>


                    <div className="flex justify-end">
                        <button className="px-5 py-2 rounded mt-3 bg-green-400 hover:bg-green-500 hover:text-white cursor-pointer" type="submit">Completar</button>
                    </div>
                </form>

            </div>
        </div>
    )
}