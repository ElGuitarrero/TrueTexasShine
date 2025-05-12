import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    const { name, email, message } = await request.json()

    const transporter = nodemailer.createTransport({
        service: "",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    try {
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_USER,
            subject: "Nuevo Mensaje desde True Texas Shine",
            text: message
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error mandando correo " + error)
        return NextResponse.json({ success: false, error: error}, {status: 500})
    }
}