"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { ROOMS, type ReservationData, encodeReservation } from "@/lib/reservation"
import { ArrowLeft, ChevronDown } from "lucide-react"

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = "MAYA-"
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

function calcNights(checkin: string, checkout: string): number {
  const a = new Date(checkin).getTime()
  const b = new Date(checkout).getTime()
  return Math.max(1, Math.round((b - a) / 86400000))
}

function BookingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedRoom = searchParams.get("room") ?? "junior"

  const [form, setForm] = useState({
    guest: "",
    email: "",
    phone: "",
    passport: "",
    nationality: "",
    checkin: "",
    checkout: "",
    roomId: ROOMS.find((r) => r.id === preselectedRoom)?.id ?? "junior",
    guests: "2",
    specialRequests: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dayAfter = new Date(today)
    dayAfter.setDate(dayAfter.getDate() + 3)

    const fmt = (d: Date) => d.toISOString().split("T")[0]
    setForm((f) => ({ ...f, checkin: fmt(tomorrow), checkout: fmt(dayAfter) }))
  }, [])

  const selectedRoom = ROOMS.find((r) => r.id === form.roomId)!
  const nights = form.checkin && form.checkout ? calcNights(form.checkin, form.checkout) : 1
  const subtotal = selectedRoom.rate * nights
  const tax = Math.round(subtotal * 0.16 * 100) / 100
  const total = subtotal + tax

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function validate(): string {
    if (!form.guest.trim()) return "El nombre completo es obligatorio."
    if (!form.email.includes("@")) return "Ingresa un correo electrónico válido."
    if (!form.phone.trim()) return "El teléfono es obligatorio."
    if (!form.passport.trim()) return "El número de pasaporte es obligatorio."
    if (!form.nationality.trim()) return "La nacionalidad es obligatoria."
    if (!form.checkin || !form.checkout) return "Las fechas de llegada y salida son obligatorias."
    if (new Date(form.checkout) <= new Date(form.checkin)) return "La fecha de salida debe ser posterior a la de llegada."
    return ""
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setError("")
    setLoading(true)

    const data: ReservationData = {
      code: generateCode(),
      guest: form.guest.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      passport: form.passport.trim().toUpperCase(),
      nationality: form.nationality.trim(),
      checkin: form.checkin,
      checkout: form.checkout,
      nights,
      roomId: form.roomId,
      roomName: selectedRoom.name,
      guests: Number(form.guests),
      ratePerNight: selectedRoom.rate,
      subtotal,
      tax,
      total,
      specialRequests: form.specialRequests.trim(),
      createdAt: new Date().toISOString(),
    }

    const encoded = encodeReservation(data)
    const confirmUrl = `${window.location.origin}/confirmacion?d=${encoded}`

    // Save to localStorage so the short code MAYA-XXXXXX works on this device
    try {
      localStorage.setItem(`res_${data.code}`, encoded)
      // Keep an index of all reservations on this device
      const index: string[] = JSON.parse(localStorage.getItem("res_index") ?? "[]")
      if (!index.includes(data.code)) index.push(data.code)
      localStorage.setItem("res_index", JSON.stringify(index))
    } catch { /* storage unavailable */ }

    // Save to database (non-blocking)
    try {
      await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } catch {
      console.warn("No se pudo guardar en DB, continuando...")
    }

    // Send confirmation email (non-blocking — redirect regardless of result)
    try {
      await fetch("/api/confirmar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservation: data, confirmUrl }),
      })
    } catch {
      // Email failure is non-fatal — user still gets the confirmation page
      console.warn("Correo no enviado, continuando...")
    }

    router.push(`/confirmacion?d=${encoded}`)
  }

  const inputClass =
    "w-full border border-gray-200 px-4 py-3 text-sm font-sans text-gray-800 focus:outline-none focus:border-[#1e3a1e] bg-white placeholder:text-gray-400 transition-colors"
  const labelClass = "block text-xs tracking-widest uppercase font-sans text-gray-500 mb-1.5"

  return (
    <div className="min-h-screen bg-[#f9f5ee]">
      {/* Header */}
      <div className="bg-[#1e3a1e] py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white/80 text-sm font-sans transition-colors mb-6">
            <ArrowLeft size={16} />
            Volver al hotel
          </Link>
          <p className="text-[#b8962e] text-xs tracking-[0.5em] uppercase font-sans mb-2">Reserva en línea</p>
          <h1 className="font-heading text-3xl md:text-4xl font-light text-white">Nueva Reservación</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {/* DATOS DEL HUESPED */}
          <div className="bg-white p-6 md:p-8 mb-6 shadow-sm">
            <h2 className="font-heading text-xl font-medium text-[#1e3a1e] mb-6 pb-4 border-b border-gray-100">
              Datos del Huésped
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label htmlFor="guest" className={labelClass}>Nombre completo *</label>
                <input id="guest" name="guest" type="text" required
                  className={inputClass} value={form.guest} onChange={handleChange}
                  placeholder="Tal como aparece en el pasaporte" />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Correo electrónico *</label>
                <input id="email" name="email" type="email" required
                  className={inputClass} value={form.email} onChange={handleChange}
                  placeholder="correo@ejemplo.com" />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Teléfono / WhatsApp *</label>
                <input id="phone" name="phone" type="tel" required
                  className={inputClass} value={form.phone} onChange={handleChange}
                  placeholder="+1 555 123 4567" />
              </div>
              <div>
                <label htmlFor="passport" className={labelClass}>No. de Pasaporte *</label>
                <input id="passport" name="passport" type="text" required
                  className={inputClass} value={form.passport} onChange={handleChange}
                  placeholder="AB123456789" />
              </div>
              <div>
                <label htmlFor="nationality" className={labelClass}>Nacionalidad *</label>
                <input id="nationality" name="nationality" type="text" required
                  className={inputClass} value={form.nationality} onChange={handleChange}
                  placeholder="Ej. Estadounidense, Mexicana..." />
              </div>
            </div>
          </div>

          {/* DETALLES DE LA ESTANCIA */}
          <div className="bg-white p-6 md:p-8 mb-6 shadow-sm">
            <h2 className="font-heading text-xl font-medium text-[#1e3a1e] mb-6 pb-4 border-b border-gray-100">
              Detalles de la Estancia
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="checkin" className={labelClass}>Fecha de llegada *</label>
                <input id="checkin" name="checkin" type="date" required
                  className={inputClass} value={form.checkin} onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]} />
              </div>
              <div>
                <label htmlFor="checkout" className={labelClass}>Fecha de salida *</label>
                <input id="checkout" name="checkout" type="date" required
                  className={inputClass} value={form.checkout} onChange={handleChange}
                  min={form.checkin || new Date().toISOString().split("T")[0]} />
              </div>
              <div>
                <label htmlFor="roomId" className={labelClass}>Tipo de habitación *</label>
                <div className="relative">
                  <select id="roomId" name="roomId" required
                    className={`${inputClass} appearance-none pr-10`}
                    value={form.roomId} onChange={handleChange}>
                    {ROOMS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} — ${r.rate} USD/noche
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label htmlFor="guests" className={labelClass}>Número de huéspedes *</label>
                <div className="relative">
                  <select id="guests" name="guests" required
                    className={`${inputClass} appearance-none pr-10`}
                    value={form.guests} onChange={handleChange}>
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "huésped" : "huéspedes"}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="specialRequests" className={labelClass}>Solicitudes especiales</label>
                <textarea id="specialRequests" name="specialRequests" rows={3}
                  className={`${inputClass} resize-none`}
                  value={form.specialRequests} onChange={handleChange}
                  placeholder="Cama extra, llegada anticipada, alergias alimentarias..." />
              </div>
            </div>
          </div>

          {/* RESUMEN */}
          <div className="bg-[#1e3a1e] p-6 md:p-8 mb-6 text-white">
            <h2 className="font-heading text-xl font-medium mb-5 pb-4 border-b border-white/10">
              Resumen de Cargo
            </h2>
            <div className="space-y-3 text-sm font-sans">
              <div className="flex justify-between text-white/70">
                <span>{selectedRoom.name}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>{nights} {nights === 1 ? "noche" : "noches"} × ${selectedRoom.rate} USD</span>
                <span>${subtotal.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>IVA (16%)</span>
                <span>${tax.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between font-semibold text-white pt-3 border-t border-white/10 text-base">
                <span>Total</span>
                <span>${total.toFixed(2)} USD</span>
              </div>
              <p className="text-white/40 text-xs mt-2">
                * El pago se realiza al momento del check-in. No se requiere tarjeta para garantizar.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 text-sm font-sans mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b8962e] hover:bg-[#d4af56] disabled:opacity-60 text-white text-sm tracking-[0.2em] uppercase px-8 py-4 font-sans transition-colors"
          >
            {loading ? "Procesando..." : "Confirmar Reservación"}
          </button>

          <p className="text-center text-xs text-gray-400 font-sans mt-4">
            Al confirmar, aceptas nuestra{" "}
            <span className="underline cursor-pointer">política de cancelación</span>.
            Cancelación gratuita hasta 48 h antes de la llegada.
          </p>
        </form>
      </div>
    </div>
  )
}

export default function ReservarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f9f5ee] flex items-center justify-center text-gray-400 font-sans">Cargando...</div>}>
      <BookingForm />
    </Suspense>
  )
}
