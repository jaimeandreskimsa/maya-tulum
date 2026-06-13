import { decodeReservation, formatDateEs } from "@/lib/reservation"
import Link from "next/link"
import { CheckCircle, ArrowLeft } from "lucide-react"
import PrintButton from "./print-button"
import { headers } from "next/headers"
import { prisma } from "@/lib/db"

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ d?: string }>
}) {
  const { d } = await searchParams
  const headersList = await headers()
  const host = headersList.get("host") ?? "hotelmayatulum.mx"
  const proto = host.includes("localhost") ? "http" : "https"
  const confirmUrl = `${proto}://${host}/confirmacion?d=${d ?? ""}`

  if (!d) {
    return (
      <div className="min-h-screen bg-[#f9f5ee] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-500 font-sans mb-4">No se encontró información de reserva.</p>
          <Link href="/reservar" className="text-[#1e3a1e] underline font-sans text-sm">
            Hacer una reserva
          </Link>
        </div>
      </div>
    )
  }

  let res = decodeReservation(d)

  // Si el código está disponible, refresca desde la BD para tener datos siempre actualizados
  if (res?.code) {
    try {
      const fresh = await prisma.reservation.findUnique({ where: { code: res.code } })
      if (fresh) res = fresh as typeof res
    } catch { /* si falla la BD, usa los datos del URL */ }
  }

  if (!res) {
    return (
      <div className="min-h-screen bg-[#f9f5ee] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-500 font-sans mb-4">El enlace de reserva no es válido o ha expirado.</p>
          <Link href="/reservar" className="text-[#1e3a1e] underline font-sans text-sm">
            Hacer una nueva reserva
          </Link>
        </div>
      </div>
    )
  }

  const createdDate = new Date(res.createdAt).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-6 px-4 no-print-wrapper">
      {/* Actions bar — hidden on print */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between no-print">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-sans transition-colors">
          <ArrowLeft size={16} />
          Volver al hotel
        </Link>
        <PrintButton />
      </div>

      {/* VOUCHER */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg voucher-container" id="voucher">

        {/* Header */}
        <div className="bg-[#1e3a1e] px-8 py-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#b8962e] text-[10px] tracking-[0.4em] uppercase font-sans mb-1">
                Comprobante Oficial de Hospedaje
              </p>
              <h1 className="font-heading text-3xl font-semibold tracking-[0.1em] uppercase">
                Hotel Maya-Tulum
              </h1>
              <p className="text-white/50 text-xs tracking-[0.3em] uppercase font-sans">
                Boutique &amp; Spa · Tulum, Quintana Roo
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-white/40 text-xs font-sans">Emitido el</p>
              <p className="text-white/70 text-sm font-sans">{createdDate}</p>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-[#2d5016] px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-[#b8962e]" />
            <span className="text-white text-sm font-sans font-medium tracking-wider uppercase">
              Reservación Confirmada
            </span>
          </div>
          <div className="text-right">
            <span className="text-[#b8962e] font-heading text-lg font-semibold tracking-widest">
              {res.code}
            </span>
          </div>
        </div>

        {/* Dates summary */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
          <div className="px-6 py-5 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-sans mb-1">Check-in</p>
            <p className="font-heading text-xl font-medium text-[#1e3a1e]">
              {new Date(res.checkin + "T12:00:00").toLocaleDateString("es-MX", { day: "2-digit", month: "short" })}
            </p>
            <p className="text-gray-500 text-xs font-sans">
              {new Date(res.checkin + "T12:00:00").getFullYear()}
            </p>
            <p className="text-[#b8962e] text-xs font-sans font-medium mt-1">15:00 hrs</p>
          </div>
          <div className="px-6 py-5 text-center bg-[#f9f5ee]">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-sans mb-1">Duración</p>
            <p className="font-heading text-2xl font-medium text-[#1e3a1e]">{res.nights}</p>
            <p className="text-gray-500 text-xs font-sans">{res.nights === 1 ? "noche" : "noches"}</p>
          </div>
          <div className="px-6 py-5 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-sans mb-1">Check-out</p>
            <p className="font-heading text-xl font-medium text-[#1e3a1e]">
              {new Date(res.checkout + "T12:00:00").toLocaleDateString("es-MX", { day: "2-digit", month: "short" })}
            </p>
            <p className="text-gray-500 text-xs font-sans">
              {new Date(res.checkout + "T12:00:00").getFullYear()}
            </p>
            <p className="text-[#b8962e] text-xs font-sans font-medium mt-1">12:00 hrs</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Guest info */}
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8962e] font-sans mb-4">
                Huésped Principal
              </p>
              <table className="w-full text-sm font-sans">
                <tbody className="space-y-2">
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-400 w-2/5">Nombre</td>
                    <td className="py-2 text-gray-800 font-medium">{res.guest}</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-400">Pasaporte</td>
                    <td className="py-2 text-gray-800 font-mono font-medium">{res.passport}</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-400">Nacionalidad</td>
                    <td className="py-2 text-gray-800">{res.nationality}</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-400">Correo</td>
                    <td className="py-2 text-gray-800">{res.email}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">Teléfono</td>
                    <td className="py-2 text-gray-800">{res.phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Stay info */}
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8962e] font-sans mb-4">
                Detalles de la Estancia
              </p>
              <table className="w-full text-sm font-sans">
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-400 w-2/5">Llegada</td>
                    <td className="py-2 text-gray-800 font-medium capitalize">
                      {formatDateEs(res.checkin)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-400">Hora entrada</td>
                    <td className="py-2 text-gray-800">15:00 hrs</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-400">Salida</td>
                    <td className="py-2 text-gray-800 font-medium capitalize">
                      {formatDateEs(res.checkout)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-400">Hora salida</td>
                    <td className="py-2 text-gray-800">12:00 hrs</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-400">Habitación</td>
                    <td className="py-2 text-gray-800">{res.roomName}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">Huéspedes</td>
                    <td className="py-2 text-gray-800">
                      {res.guests} {res.guests === 1 ? "persona" : "personas"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Charges */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8962e] font-sans mb-4">
              Cargos y Tarifas
            </p>
            <div className="bg-[#f9f5ee] p-5">
              <div className="space-y-2 text-sm font-sans">
                <div className="flex justify-between text-gray-600">
                  <span>
                    {res.roomName} · {res.nights} {res.nights === 1 ? "noche" : "noches"} × ${formatCurrency(res.ratePerNight)} USD
                  </span>
                  <span>${formatCurrency(res.subtotal)} USD</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>IVA (16%)</span>
                  <span>${formatCurrency(res.tax)} USD</span>
                </div>
                <div className="flex justify-between font-semibold text-[#1e3a1e] pt-2 border-t border-gray-200 text-base">
                  <span>Total a pagar</span>
                  <span>${formatCurrency(res.total)} USD</span>
                </div>
                <div className="flex justify-between text-gray-500 text-xs">
                  <span>Forma de pago</span>
                  <span>Al momento del check-in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Requests */}
          {res.specialRequests && (
            <div className="mt-6">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8962e] font-sans mb-2">
                Solicitudes Especiales
              </p>
              <p className="text-sm text-gray-600 font-sans bg-gray-50 p-3 border-l-2 border-[#b8962e]">
                {res.specialRequests}
              </p>
            </div>
          )}
        </div>

        {/* Cancellation policy */}
        <div className="bg-[#f9f5ee] px-8 py-5 border-t border-gray-100">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-sans mb-2">
            Política de Cancelación
          </p>
          <p className="text-sm text-gray-600 font-sans">
            Cancelación gratuita hasta <strong>48 horas antes</strong> de la fecha de llegada.
            Cancelaciones posteriores o no presentación: cargo equivalente a 1 noche de estancia.
          </p>
        </div>

        {/* Hotel footer */}
        <div className="px-8 py-6 border-t border-gray-100">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <p className="font-heading text-base font-medium text-[#1e3a1e] mb-1 uppercase tracking-wide">
                Hotel Maya-Tulum
              </p>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">
                Carretera Tulum-Cobá Km 7.5, Zona Hotelera<br />
                Tulum, Quintana Roo 77780, México<br />
                Tel: +52 (984) 877-3210<br />
                reservaciones@hotelmayatulum.mx
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#1e3a1e] px-8 py-3 text-center">
          <p className="text-white/40 text-[10px] font-sans tracking-wide">
            Este documento es válido como comprobante de hospedaje reservado. Para cambios: +52 (984) 877-3210
          </p>
        </div>
      </div>

      {/* Bottom actions — hidden on print */}
      <div className="max-w-3xl mx-auto mt-6 text-center no-print">
        <p className="text-gray-500 text-sm font-sans mb-4">
          Guarda o comparte el enlace de esta página para acceder a tu reserva en cualquier momento.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <PrintButton />
          <Link
            href="/mi-reserva"
            className="border border-[#1e3a1e] text-[#1e3a1e] text-sm tracking-widest uppercase px-6 py-2.5 font-sans hover:bg-[#1e3a1e] hover:text-white transition-colors"
          >
            Mi Reserva
          </Link>
          <Link
            href="/"
            className="border border-gray-300 text-gray-500 text-sm tracking-widest uppercase px-6 py-2.5 font-sans hover:border-gray-500 hover:text-gray-700 transition-colors"
          >
            Volver al hotel
          </Link>
        </div>
      </div>
    </div>
  )
}
