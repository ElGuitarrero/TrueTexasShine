'use client'
import { useRouter } from "next/navigation";
// BookingForm.tsx

import { useState } from "react";


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

  const [showAdvanced, setShowAdvanced] = useState(false);
  // const [fechas, setFechas] = useState<Fechas>({ start: new Date(), end: new Date() })
  const [formData, setFormData] = useState<BasicBookingInfo & Partial<AdvancedBookingInfo>>({
    name: "",
    phone: 0,
    email: "",
    location: "",
    service: "general cleaning",
    notes: "",
    termsAccepted: false,
    // Advanced fields (optional)
    hasPets: false,
    propertyType: "house",
    numBedrooms: 1,
    numBathrooms: 1,
    preferredLanguage: "en",
    entryInstructions: "",
    allowPhotos: false
  });
  const router = useRouter()


  // ┌──────────────────────────────────────────┐
  // │ Funciones despues de declaraciones                      
  // └──────────────────────────────────────────┘
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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
  };

  const estiloDeInput = "w-full border border-gray-300 p-2 rounded"

  return (
    <form onSubmit={handleSubmit} className="flex text-black flex-col gap-4 p-6 rounded-xl bg-white sm:drop-shadow-xl ">

      {/* Titulo y boton */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Button */}
        <div className="sm:absolute sm:left-5">
          <button onClick={() => router.back()} className="bg-pink-200 px-3 py-1 rounded cursor-pointer hover:bg-pink-300">
            Volver
          </button>
        </div>

        {/* Titulo */}
        <div className="w-full flex justify-center">
          <h2 className="text-2xl text-center font-bold">Book a Time Slot</h2>
        </div>

      </div>

      {fechas && (

        <>
          <div className="flex max-sm:hidden justify-evenly">

            <div className="text-sm text-gray-600 bg-pink-100 drop-shadow-md p-3 rounded">
              <div>
                <div className="text-xl text-center font-semibold">
                  Start
                </div>

                <div className="">
                  <div className="text-center text-md">{fechas.start.getMonth()}/{fechas.start.getDate()}</div>
                  <div className="text-md">
                    {fechas.start.toLocaleTimeString()}
                  </div>
                </div>

              </div>
            </div>

            <div className="text-sm text-gray-600 bg-pink-100 drop-shadow-md p-3 rounded">
              <div>
                <div className="text-xl text-center font-semibold">
                  End
                </div>

                <div className="">
                  <div className="text-center text-md">{fechas.end.getMonth()}/{fechas.end.getDate()}</div>
                  <div className="text-md">
                    {fechas.end.toLocaleTimeString()}
                  </div>
                </div>

              </div>
            </div>

            <div className="text-sm text-gray-600 bg-pink-100 drop-shadow-md p-3 rounded">
              <div>
                <div className="text-xl text-center font-semibold">
                  Duration
                </div>

                <div className="h-full flex mt-2 items-center justify-center ">
                  <div className="text-center text-md">{Math.floor((fechas.end.getTime() - fechas.start.getTime()) / (1000 * 60))} minutes</div>
                </div>

              </div>
            </div>



          </div>

          <div className="sm:hidden">
            <>
              <div><strong>Start:</strong> {fechas.start.toLocaleString()}</div>
              <div><strong>End:</strong> {fechas.end.toLocaleString()}</div>
              <div><strong>Duration:</strong> {Math.floor((fechas.end.getTime() - fechas.start.getTime()) / (1000 * 60))} minutes</div>

            </>
          </div>

        </>

      )}

      <div className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className={estiloDeInput}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone || ''}
          onChange={handleInputChange}
          className={estiloDeInput}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className={estiloDeInput}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Full Address"
          value={formData.location}
          onChange={handleInputChange}
          className={estiloDeInput}
          required
        />

        <select
          name="service"
          value={formData.service}
          onChange={handleInputChange}
          className={estiloDeInput}
          required
        >
          <option value="general cleaning">General Cleaning</option>
          <option value="deep cleaning">Deep Cleaning</option>
          <option value="office">Office</option>
          <option value="consultation">Consultation</option>
        </select>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          {showAdvanced ? '▲ Hide Advanced Options' : '▼ Show Advanced Options'}
        </button>

        {showAdvanced && (
          <div className="space-y-3 p-3 border rounded-lg bg-gray-50">

            {/* Property type and pets */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className={estiloDeInput}
                >
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="office">Office</option>
                </select>
              </div>

              <div className="flex justify-center flex-col">
                <label className="block text-sm text-gray-600 mb-1">Has Pets?</label>
                <div className="pl-3">
                  <input
                    type="checkbox"
                    name="hasPets"
                    checked={formData.hasPets}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <label className="ml-2 text-sm text-gray-600">Yes</label>
                </div>
              </div>
            </div>

            <div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bedrooms</label>
                <input
                  type="range"
                  name="numBedrooms"
                  min="1"
                  max="5"
                  value={formData.numBedrooms}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-1">Number of Bedrooms: {formData.numBedrooms}</div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Bathrooms</label>
                <input
                  type="range"
                  name="numBathrooms"
                  min="1"
                  max="5"
                  value={formData.numBathrooms}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-1">Number of Bathrooms: {formData.numBathrooms}</div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Preferred Language</label>
              <select
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleInputChange}
                className={estiloDeInput}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Entry Instructions</label>
              <textarea
                name="entryInstructions"
                value={formData.entryInstructions}
                onChange={handleInputChange}
                className={estiloDeInput}
                rows={2}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="allowPhotos"
                checked={formData.allowPhotos}
                onChange={handleInputChange}
                className="rounded"
              />
              <label className="ml-2 text-sm text-gray-600">Allow Service Photos</label>
            </div>
          </div>
        )}

        <textarea
          name="notes"
          placeholder="Additional Notes (any important information we should know)"
          value={formData.notes}
          onChange={handleInputChange}
          className={`${estiloDeInput} h-24`}
        />

        <div>
          <p className="text-xs text-gray-500">
            All schedules and times are subject to change. Please wait for confirmation of your appointment.
          </p>
        </div>
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleInputChange}
            className="rounded mt-1"
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
        className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        Confirm Booking
      </button>
    </form>
  );
}
