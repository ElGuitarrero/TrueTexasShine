import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="py-20 bg-[#F7CAC9] text-[#4A2C2A] text-center px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 leading-tight">
          Ready for a Sparkling Clean Home?
        </h2>
        <p className="text-lg text-[#4A2C2A] mb-8">
          Let us bring the shine and southern charm right to your doorstep. Book your cleaning with True Texas Shine today!
        </p>
        <Link href="/calendar">
          <button className="cursor-pointer px-8 py-4 bg-[#4A2C2A] text-white text-lg font-medium rounded-xl shadow hover:bg-[#341b1a] transition-all">
            Schedule Your Appointment
          </button>
        </Link>
      </div>
    </section>
  );
}
