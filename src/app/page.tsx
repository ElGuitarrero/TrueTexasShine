'use client'
import Image from "next/image"
import Link from "next/link"



export default function Home() {


  return (
    <main className="min-h-screen bg-white flex flex-col sm:flex-row items-center justify-center text-black">


      {/* Parte izquierda */}
      <div className="basis-1/2 flex justify-center flex-col gap-5 p-8 font-[playFair]">


        <h1 className="text-5xl font-thin text-center font-playfair">True Texas Shine</h1>

        <h2 className="text-3xl text-center ">Where Texas charm meets spotless shine.</h2>



        {/* Boton de agendar */}
        <Link href={'/calendar'}>
          <div className="w-full flex justify-center">
          <button className="px-5 w-[50%] py-5 text-xl bg-[#F7CAC9] hover:bg-[#FBB9B8] rounded-md cursor-pointer transition-all duration-300 hover:scale-105">
            Schedule appointment
          </button>
          </div>
        </Link>


      </div>


      <div className="basis-1/2 flex justify-center">
        <Image src={'/images/personas.png'} width={1000} height={1000} className="w-100" alt={"Personas sonriedno"}>

        </Image>
      </div>


    </main>
  )
}