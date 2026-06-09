import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import type { ReservationData } from "@/lib/reservation"

// POST /api/reservas — guardar reserva
export async function POST(req: NextRequest) {
  try {
    const data: ReservationData = await req.json()

    if (!data.code || !data.email) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    const reservation = await prisma.reservation.upsert({
      where: { code: data.code },
      update: {},
      create: {
        code: data.code,
        guest: data.guest,
        email: data.email,
        phone: data.phone,
        passport: data.passport,
        nationality: data.nationality,
        checkin: data.checkin,
        checkout: data.checkout,
        nights: data.nights,
        roomId: data.roomId,
        roomName: data.roomName,
        guests: data.guests,
        ratePerNight: data.ratePerNight,
        subtotal: data.subtotal,
        tax: data.tax,
        total: data.total,
        specialRequests: data.specialRequests ?? "",
        createdAt: data.createdAt,
      },
    })

    return NextResponse.json({ ok: true, id: reservation.id })
  } catch (err) {
    console.error("Error guardando reserva:", err)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}

// GET /api/reservas?code=MAYA-XXXX — buscar por código
export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code")

    if (!code) {
      return NextResponse.json({ error: "Código requerido" }, { status: 400 })
    }

    const reservation = await prisma.reservation.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (!reservation) {
      return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 })
    }

    return NextResponse.json(reservation)
  } catch (err) {
    console.error("Error buscando reserva:", err)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
