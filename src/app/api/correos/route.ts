import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
    const { name, email, fecha, precio_estimado, direccion } = await request.json()

    const message = `
        Nueva reservación para el ${fecha}
        Nombre: ${name}
        Correo electrónico: ${email}
        Direccion: ${direccion}
        Precio estimado: ${precio_estimado}
    `

    const htmlMessage = `
        <div style="font-family: Arial, sans-serif; background-color: #fff1f5; padding: 24px; color: #1f2937;">
            <h2 style="color: #be185d; margin-bottom: 20px;">🧼 Nueva reservación recibida</h2>
            <div style="background-color: #ffffff; border-radius: 8px; padding: 16px; border: 1px solid #fbcfe8;">
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Correo electrónico:</strong> ${email}</p>
            <p><strong>Dirección:</strong> <a href="https://maps.google.com/?q=${direccion}" target="_blank">${direccion}</a></p>
            <p><strong>Precio estimado:</strong> ${precio_estimado}</p>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #6b7280;">
            Este mensaje fue generado automáticamente por el sistema de True Texas Shine ✨
            </p>
        </div>
    `


    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_USER,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
        },
    })

    try {
        await transporter.sendMail({
            from: `"True Texas Shine Agenda" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
            to: process.env.NEXT_PUBLIC_EMAIL_USER,
            subject: `Nueva reservación de ${name}`,
            text: message,
            html: htmlMessage
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error mandando correo:", error)
        return NextResponse.json({ success: false, error }, { status: 500 })
    }
}
