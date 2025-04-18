import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="min-h-screen bg-[#FFFAFA] text-[#4A2C2A] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-24 py-12 gap-10">
      
      {/* Text Section */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start gap-6 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-light leading-tight">
          Shine Bright with <br />
          <span className="font-semibold text-[#E75480]">True Texas Shine ✨</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 max-w-xl">
          Where southern charm meets a spotless home. Let us handle the mess -
          so you can enjoy the rest 🧼
        </p>

        <Link href="/calendar">
          <button className="mt-4 cursor-pointer px-6 py-4 bg-[#F7CAC9] hover:bg-[#FBB9B8] text-[#4A2C2A] text-lg font-medium rounded-xl shadow transition-all hover:scale-105">
            Schedule Your Appointment
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex  justify-center items-center">
        <Image
          src="/images/personas.webp"
          width={700}
          height={700}
          alt="Happy customers smiling"
          className="w-full max-w-sm md:max-w-lg  bg-[#fef3f3] rounded-xl shadow-lg"
        />
      </div>
    </main>
  );
}