"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SLIDES = [
  {
    src:     "https://images.unsplash.com/photo-1664205543898-829ef8baa7ad?w=1920&q=90&fit=crop",
    alt:     "Zona Arqueológica — Ruinas del Castillo de Tulum, Quintana Roo",
    label:   "Tulum · Quintana Roo · México",
    heading: "Donde la Selva",
    italic:  "Se Convierte",
    sub:     "en Refugio",
    pos:     "object-center",
  },
  {
    src:     "https://images.unsplash.com/photo-1520483601560-389dff434fdf?w=1920&q=90&fit=crop",
    alt:     "Bungalow de palapa — La Valise Tulum, México",
    label:   "Alojamiento Boutique",
    heading: "10 Habitaciones",
    italic:  "Exclusivas",
    sub:     "en la Selva Maya",
    pos:     "object-center",
  },
  {
    src:     "https://images.unsplash.com/photo-1756115364101-bf3c2cba1029?w=1920&q=90&fit=crop",
    alt:     "Infinity pool de lujo con vista al Mar Caribe",
    label:   "Alberca Privada",
    heading: "Lujo y",
    italic:  "Naturaleza",
    sub:     "en Perfecta Armonía",
    pos:     "object-center",
  },
  {
    src:     "https://images.unsplash.com/photo-1522093243371-296c79a66df4?w=1920&q=90&fit=crop",
    alt:     "Cenote subterráneo en Tulum, Quintana Roo, México",
    label:   "Cenote Privado",
    heading: "Maravillas",
    italic:  "Naturales",
    sub:     "a Pasos del Hotel",
    pos:     "object-center",
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback((idx: number) => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(idx)
      setTransitioning(false)
    }, 400)
  }, [transitioning])

  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo])
  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])

  // Auto-advance every 6 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const slide = SLIDES[current]

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">

      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            className={`object-cover ${s.pos}`}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Persistent dark overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a1508]/70 via-[#0f2010]/60 to-[#0a1508]/88" />

      {/* Content */}
      <div
        className="relative z-20 px-6 max-w-4xl mx-auto pt-20 transition-opacity duration-400"
        style={{ opacity: transitioning ? 0 : 1 }}
      >
        <p className="text-[#b8962e] text-xs tracking-[0.5em] uppercase font-sans mb-6">
          {slide.label}
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight mb-6">
          {slide.heading}<br />
          <em className="italic">{slide.italic}</em><br />
          {slide.sub}
        </h1>
        <p className="text-white/60 font-sans text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          10 habitaciones exclusivas rodeadas de selva tropical. A 10 minutos de las ruinas y a 5 de la playa.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/reservar"
            className="bg-[#b8962e] hover:bg-[#d4af56] text-white text-sm tracking-[0.2em] uppercase px-8 py-4 font-sans transition-colors"
          >
            Reservar Estadía
          </Link>
          <Link
            href="#habitaciones"
            className="border border-white/30 hover:border-white/60 text-white/70 hover:text-white text-sm tracking-[0.2em] uppercase px-8 py-4 font-sans transition-colors"
          >
            Ver Habitaciones
          </Link>
        </div>
        <p className="text-white/30 text-xs font-sans mt-8 tracking-wider">
          Mejor precio garantizado · Sin cargos de reserva
        </p>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/60 text-white/60 hover:text-white bg-black/20 hover:bg-black/40 transition-all backdrop-blur-sm"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/60 text-white/60 hover:text-white bg-black/20 hover:bg-black/40 transition-all backdrop-blur-sm"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a imagen ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-1.5 bg-[#b8962e]"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-10 right-6 md:right-10 z-20">
        <span className="text-white/30 text-xs font-sans tracking-widest">
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pb-4">
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/30 mx-auto" />
      </div>
    </section>
  )
}
