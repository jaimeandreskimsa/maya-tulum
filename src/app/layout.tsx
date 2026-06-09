import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Hotel Maya-Tulum | Boutique & Spa · Tulum, Quintana Roo",
  description:
    "Hotel boutique de lujo en Tulum, Quintana Roo. 10 habitaciones exclusivas rodeadas de selva tropical, spa, restaurante gourmet y acceso a cenotes. Reserva en línea con el mejor precio garantizado.",
  keywords: "hotel tulum, hotel boutique tulum, hotel maya tulum, resort tulum quintana roo",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
