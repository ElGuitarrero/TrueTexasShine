import { useState } from "react";

export default function TermsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="text-sm cursor-pointer underline"
      >
        Terms and Conditions
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-pink-600">Terms and Conditions</h2>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-2">
              <li>All bookings are subject to availability and confirmation.</li>
              <li>Cancellations must be made at least 24 hours in advance. Late cancellations may incur a fee.</li>
              <li>You are responsible for providing safe and reasonable access to your location.</li>
              <li>Full payment is required before or at the time of service.</li>
              <li>True Texas Shine is not liable for damage caused by unsafe conditions, fragile items, or pets left unattended.</li>
              <li>We reserve the right to modify these terms at any time.</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">For questions, email us at <strong>info@truetexashine.com</strong>.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 text-sm cursor-pointer text-pink-600 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}