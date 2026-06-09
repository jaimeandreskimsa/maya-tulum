"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Search, CheckCircle, ExternalLink, RotateCcw, Smartphone } from "lucide-react"
import type { ReservationData } from "@/lib/reservation"

// ─── decode ──────────────────────────────────────────────────────────────────

function decodeClient(encoded: string): ReservationData | null {
  try {
    const padded = encoded + "=".repeat((4 - (encoded.length % 4)) % 4)
    const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"))
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    const parsed = JSON.parse(new TextDecoder().decode(bytes))
    return parsed?.code ? (parsed as ReservationData) : null
  } catch { return null }
}

function resolve(val: string): { encoded: string; res: ReservationData } | null {
  const v = val.trim()
  // 1. Full URL
  try {
    const d = new URL(v).searchParams.get("d")
    if (d) { const r = decodeClient(d); return r ? { encoded: d, res: r } : null }
  } catch { /* not url */ }
  // 2. Short code → localStorage
  const upper = v.toUpperCase()
  if (upper.startsWith("MAYA-")) {
    try {
      const stored = localStorage.getItem(`res_${upper}`)
      if (stored) { const r = decodeClient(stored); return r ? { encoded: stored, res: r } : null }
    } catch { /* storage blocked */ }
  }
  // 3. Raw encoded string
  const r = decodeClient(v)
  return r ? { encoded: v, res: r } : null
}

// Lookup in database via API
async function resolveRemote(val: string): Promise<{ encoded: string; res: ReservationData } | null> {
  const upper = val.trim().toUpperCase()
  if (!upper.startsWith("MAYA-")) return null
  try {
    const res = await fetch(`/api/reservas?code=${encodeURIComponent(upper)}`, { cache: "no-store" })
    if (!res.ok) return null
    const data: ReservationData = await res.json()
    // Re-encode for QR / confirmation URL
    const { encodeReservation } = await import("@/lib/reservation")
    const encoded = encodeReservation(data)
    return { encoded, res: data }
  } catch { return null }
}

function saveToStorage(res: ReservationData, encoded: string) {
  try {
    localStorage.setItem(`res_${res.code}`, encoded)
    const idx: string[] = JSON.parse(localStorage.getItem("res_index") ?? "[]")
    if (!idx.includes(res.code)) idx.push(res.code)
    localStorage.setItem("res_index", JSON.stringify(idx))
  } catch { /* blocked */ }
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("es-MX", {
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
  })
}

// ─── Validation card ──────────────────────────────────────────────────────────

function ValidationCard({
  res, encoded, onReset,
}: { res: ReservationData; encoded: string; onReset: () => void }) {
  const [qrSrc, setQrSrc] = useState("")
  const confirmUrl = typeof window !== "undefined"
    ? `${window.location.origin}/confirmacion?d=${encoded}` : ""

  useEffect(() => {
    if (!confirmUrl) return
    import("qrcode").then((QR) =>
      QR.toDataURL(confirmUrl, {
        width: 200, margin: 1,
        color: { dark: "#1e3a1e", light: "#ffffff" },
        errorCorrectionLevel: "M",
      }).then(setQrSrc).catch(() => {})
    )
  }, [confirmUrl])

  return (
    <div className="bg-white shadow-sm overflow-hidden">
      {/* Status bar */}
      <div className="bg-[#2d5016] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle size={18} className="text-[#b8962e]" />
          <span className="text-white text-sm font-sans font-semibold tracking-wider uppercase">
            Reservación Válida
          </span>
        </div>
        <span className="text-[#b8962e] font-heading text-base font-semibold tracking-widest">
          {res.code}
        </span>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Summary */}
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8962e] font-sans mb-4">
              Datos de la reserva
            </p>
            <table className="w-full text-sm font-sans">
              <tbody>
                {([
                  ["Huésped",      res.guest],
                  ["Pasaporte",    res.passport],
                  ["Nacionalidad", res.nationality],
                  ["Llegada",      `${formatDate(res.checkin)} · 15:00 h`],
                  ["Salida",       `${formatDate(res.checkout)} · 12:00 h`],
                  ["Habitación",   res.roomName],
                  ["Huéspedes",    `${res.guests} ${res.guests === 1 ? "persona" : "personas"}`],
                ] as [string, string][]).map(([label, value]) => (
                  <tr key={label} className="border-b border-gray-50">
                    <td className="py-2 pr-3 text-gray-400 w-[38%] align-top">{label}</td>
                    <td className="py-2 text-gray-800 font-medium">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-sans leading-relaxed">
                <strong className="text-[#1e3a1e] block mb-0.5">Hotel Maya-Tulum</strong>
                Carretera Tulum-Cobá Km 7.5, Zona Hotelera<br />
                Tulum, Quintana Roo 77780, México<br />
                +52 (984) 877-3210
              </p>
            </div>
          </div>

          {/* QR */}
          <div className="flex flex-col items-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8962e] font-sans mb-4 self-start md:self-center">
              QR de verificación
            </p>
            <div className="border-2 border-[#1e3a1e]/15 p-3 bg-white inline-block mb-3">
              {qrSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qrSrc} alt={`QR ${res.code}`} width={200} height={200} />
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-50">
                  <div className="w-6 h-6 border-2 border-[#1e3a1e] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <p className="text-[10px] text-gray-400 font-sans text-center leading-relaxed">
              Escanea para abrir<br />el comprobante oficial
            </p>
            <p className="text-[9px] text-gray-300 font-mono mt-1">{res.code}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 md:px-8 pb-6 md:pb-8 flex flex-col sm:flex-row gap-3">
        <Link
          href={`/confirmacion?d=${encoded}`}
          className="flex items-center justify-center gap-2 bg-[#1e3a1e] hover:bg-[#2d5016] text-white text-xs tracking-[0.15em] uppercase px-5 py-3 font-sans transition-colors flex-1"
        >
          <ExternalLink size={14} />
          Ver Voucher Completo
        </Link>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-500 hover:text-gray-700 text-xs tracking-[0.15em] uppercase px-5 py-3 font-sans transition-colors"
        >
          <RotateCcw size={13} />
          Nueva consulta
        </button>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function MiReservaContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dParam = searchParams.get("d")

  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [validated, setValidated] = useState<{ res: ReservationData; encoded: string } | null>(null)

  useEffect(() => {
    if (dParam) router.replace(`/confirmacion?d=${dParam}`)
  }, [dParam, router])

  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!input.trim()) {
      setError("Ingresa tu código de reserva o pega el enlace de confirmación.")
      return
    }

    // 1. Try local resolve (URL / localStorage / raw base64)
    const found = resolve(input)
    if (found) {
      saveToStorage(found.res, found.encoded)
      setValidated(found)
      return
    }

    // 2. Try remote lookup (admin-created reservations)
    setLoading(true)
    const remote = await resolveRemote(input)
    setLoading(false)
    if (remote) {
      saveToStorage(remote.res, remote.encoded)
      setValidated(remote)
      return
    }

    setError("No se encontró la reserva. Verifica que el código o enlace sea correcto.")
  }

  if (dParam) return (
    <div className="min-h-screen bg-[#f9f5ee] flex items-center justify-center">
      <p className="text-gray-400 font-sans">Cargando reserva...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f9f5ee]">
      <div className="bg-[#1e3a1e] py-8 px-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white/80 text-sm font-sans transition-colors mb-6">
            <ArrowLeft size={16} />
            Volver al hotel
          </Link>
          <p className="text-[#b8962e] text-xs tracking-[0.5em] uppercase font-sans mb-2">Consulta</p>
          <h1 className="font-heading text-3xl md:text-4xl font-light text-white">Mi Reservación</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {validated ? (
          <ValidationCard
            res={validated.res}
            encoded={validated.encoded}
            onReset={() => { setValidated(null); setInput(""); setError("") }}
          />
        ) : (
          <>
            <div className="bg-white p-8 shadow-sm">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-5">
                  <label htmlFor="input" className="block text-xs tracking-widest uppercase font-sans text-gray-500 mb-1.5">
                    Código o enlace de reserva
                  </label>
                  <textarea
                    id="input"
                    rows={3}
                    className="w-full border border-gray-200 px-4 py-3 text-sm font-sans text-gray-800 focus:outline-none focus:border-[#1e3a1e] bg-white placeholder:text-gray-400 transition-colors resize-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="MAYA-AB3K9F  ó  https://hotel-maya-tulum.vercel.app/confirmacion?d=..."
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-sans mb-4 leading-relaxed">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#1e3a1e] hover:bg-[#2d5016] disabled:opacity-60 text-white text-sm tracking-[0.15em] uppercase px-6 py-3.5 font-sans transition-colors"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search size={15} />
                  )}
                  {loading ? "Buscando..." : "Ver Reservación"}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-gray-400 text-xs font-sans mb-1">¿No tienes reserva aún?</p>
                <Link href="/reservar" className="text-[#1e3a1e] text-sm font-sans underline hover:text-[#2d5016]">
                  Hacer una nueva reservación
                </Link>
              </div>
            </div>

            {/* Two-option hint */}
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <div className="p-4 bg-white border-l-2 border-[#b8962e] shadow-sm">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#b8962e] font-sans mb-1">
                  Código corto
                </p>
                <p className="text-xs text-gray-600 font-sans leading-relaxed">
                  <span className="font-mono font-semibold text-[#1e3a1e]">MAYA-XXXXXX</span> —
                  funciona solo en el dispositivo donde se hizo la reserva.
                  Aparece en el voucher y en el correo de confirmación.
                </p>
              </div>
              <div className="p-4 bg-white border-l-2 border-[#1e3a1e]/30 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <Smartphone size={12} className="text-[#1e3a1e]" />
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#1e3a1e]/60 font-sans">
                    Enlace completo
                  </p>
                </div>
                <p className="text-xs text-gray-600 font-sans leading-relaxed">
                  Pega el <strong>URL de confirmación</strong> — funciona desde
                  cualquier dispositivo. Es el enlace que se abrió al confirmar.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function MiReservaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f9f5ee] flex items-center justify-center text-gray-400 font-sans">
        Cargando...
      </div>
    }>
      <MiReservaContent />
    </Suspense>
  )
}
