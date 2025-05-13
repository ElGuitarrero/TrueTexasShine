import { useState } from "react";

export default function PrivacyModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="text-sm cursor-pointer underline"
      >
        Privacy Policy
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-pink-600">Privacy Policy</h2>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-2">
              <li>We collect your name, email, phone, and address to manage bookings.</li>
              <li>Payment info is handled securely via third-party providers.</li>
              <li>Your data is not shared with third parties and is stored securely.</li>
              <li>We use cookies to improve scheduling and usability.</li>
              <li>You can request deletion of your data at any time.</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">For any privacy concerns, contact <strong>truetexasshine@gmail.com</strong>.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 text-sm text-pink-600 hover:underline cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}