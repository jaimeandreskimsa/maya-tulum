"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1f0f]/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-heading text-xl font-semibold tracking-[0.15em] text-white uppercase">
            Hotel Maya-Tulum
          </span>
          <span className="text-[10px] tracking-[0.3em] text-[#b8962e] uppercase font-sans">
            Boutique &amp; Spa
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#habitaciones" className="text-sm tracking-widest text-white/70 hover:text-white uppercase transition-colors">
            Habitaciones
          </Link>
          <Link href="/#experiencias" className="text-sm tracking-widest text-white/70 hover:text-white uppercase transition-colors">
            Experiencias
          </Link>
          <Link href="/#ubicacion" className="text-sm tracking-widest text-white/70 hover:text-white uppercase transition-colors">
            Ubicación
          </Link>
          <Link href="/mi-reserva" className="text-sm tracking-widest text-white/50 hover:text-white/80 uppercase transition-colors">
            Mi Reserva
          </Link>
          <Link
            href="/reservar"
            className="bg-[#b8962e] hover:bg-[#d4af56] text-white text-sm tracking-[0.15em] uppercase px-5 py-2 transition-colors font-sans"
          >
            Reservar
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-[#0f1f0f] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {[
            { href: "/#habitaciones", label: "Habitaciones" },
            { href: "/#experiencias", label: "Experiencias" },
            { href: "/#ubicacion", label: "Ubicación" },
            { href: "/mi-reserva", label: "Mi Reserva" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-widest text-white/70 hover:text-white uppercase transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/reservar"
            className="bg-[#b8962e] text-white text-sm tracking-[0.15em] uppercase px-5 py-3 text-center"
            onClick={() => setOpen(false)}
          >
            Reservar Ahora
          </Link>
        </nav>
      )}
    </header>
  )
}
