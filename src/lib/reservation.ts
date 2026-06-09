export interface ReservationData {
  code: string
  guest: string
  email: string
  phone: string
  passport: string
  nationality: string
  checkin: string
  checkout: string
  nights: number
  roomId: string
  roomName: string
  guests: number
  ratePerNight: number
  subtotal: number
  tax: number
  total: number
  specialRequests: string
  createdAt: string
}

export interface RoomOption {
  id: string
  name: string
  rate: number
  maxGuests: number
  size: string
  features: string[]
}

export const ROOMS: RoomOption[] = [
  {
    id: "standard",
    name: "Habitación Estándar Garden View",
    rate: 180,
    maxGuests: 2,
    size: "35 m²",
    features: ["Cama King Size", "Vista al jardín tropical", "Ducha lluvia", "WiFi premium"],
  },
  {
    id: "standard-2",
    name: "Habitación Estándar Pool View",
    rate: 195,
    maxGuests: 2,
    size: "35 m²",
    features: ["Cama King Size", "Vista a la alberca", "Ducha lluvia", "WiFi premium"],
  },
  {
    id: "junior",
    name: "Junior Suite Jungle View",
    rate: 260,
    maxGuests: 3,
    size: "55 m²",
    features: ["Cama King Size", "Terraza privada", "Bañera de inmersión", "Vista a la selva"],
  },
  {
    id: "junior-2",
    name: "Junior Suite Garden Terrace",
    rate: 275,
    maxGuests: 3,
    size: "55 m²",
    features: ["Cama King Size", "Terraza con hamaca", "Bañera de inmersión", "Vista al jardín"],
  },
  {
    id: "master",
    name: "Master Suite Private Pool",
    rate: 420,
    maxGuests: 4,
    size: "80 m²",
    features: ["Alberca privada", "Sala de estar", "Cocina bar", "Terraza panorámica"],
  },
  {
    id: "master-2",
    name: "Master Suite Cenote Access",
    rate: 450,
    maxGuests: 4,
    size: "85 m²",
    features: ["Acceso privado a cenote", "Sala de estar", "Cocina bar", "Terraza selva"],
  },
]

export function formatDateEs(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Server-side decode — uses Node.js Buffer
export function decodeReservation(encoded: string): ReservationData | null {
  try {
    const padded = encoded + "=".repeat((4 - (encoded.length % 4)) % 4)
    const standard = padded.replace(/-/g, "+").replace(/_/g, "/")
    const json = Buffer.from(standard, "base64").toString("utf-8")
    return JSON.parse(json) as ReservationData
  } catch {
    return null
  }
}
