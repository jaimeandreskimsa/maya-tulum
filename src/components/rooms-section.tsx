"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Star } from "lucide-react"
import RoomCarousel from "./room-carousel"
import { ROOMS } from "@/lib/reservation"

// ── Image sets per room ─────────────────────────────────────────────────────

const ROOM_IMAGES: Record<string, { src: string; alt: string }[]> = {
  standard: [
    { src: "https://images.unsplash.com/photo-1623718649591-311775a30c43?w=800&q=80&fit=crop", alt: "Alberca del jardín con palmeras — Quintana Roo" },
    { src: "https://images.unsplash.com/photo-1549727636-36589a0cf6f5?w=800&q=80&fit=crop", alt: "Palmera junto a la alberca" },
    { src: "https://images.unsplash.com/photo-1613506140303-a3742bcbee78?w=800&q=80&fit=crop", alt: "Vista aérea de alberca turquesa" },
  ],
  "standard-2": [
    { src: "https://images.unsplash.com/photo-1613506140303-a3742bcbee78?w=800&q=80&fit=crop", alt: "Vista aérea de alberca turquesa" },
    { src: "https://images.unsplash.com/photo-1623718649591-311775a30c43?w=800&q=80&fit=crop", alt: "Alberca del jardín con palmeras" },
    { src: "https://images.unsplash.com/photo-1549727636-36589a0cf6f5?w=800&q=80&fit=crop", alt: "Palmera junto a la alberca" },
  ],
  junior: [
    { src: "https://images.unsplash.com/photo-1520483601560-389dff434fdf?w=800&q=80&fit=crop", alt: "Bungalow de palapa — Tulum, México" },
    { src: "https://images.unsplash.com/photo-1777501935969-8d04cedfeb8c?w=800&q=80&fit=crop", alt: "Edificio boutique con palmeras, Riviera Maya" },
    { src: "https://images.unsplash.com/photo-1585614733378-4c58f92de4a1?w=800&q=80&fit=crop", alt: "Agua turquesa rodeada de selva — México" },
  ],
  "junior-2": [
    { src: "https://images.unsplash.com/photo-1585614733378-4c58f92de4a1?w=800&q=80&fit=crop", alt: "Agua turquesa rodeada de selva — México" },
    { src: "https://images.unsplash.com/photo-1520483601560-389dff434fdf?w=800&q=80&fit=crop", alt: "Bungalow de palapa — Tulum, México" },
    { src: "https://images.unsplash.com/photo-1777501935969-8d04cedfeb8c?w=800&q=80&fit=crop", alt: "Edificio boutique con palmeras, Riviera Maya" },
  ],
  master: [
    { src: "https://images.unsplash.com/photo-1756115364101-bf3c2cba1029?w=800&q=80&fit=crop", alt: "Infinity pool de lujo con camastros" },
    { src: "https://images.unsplash.com/photo-1502794102238-ccd18db30c2b?w=800&q=80&fit=crop", alt: "Palapa frente a la playa de Tulum" },
    { src: "https://images.unsplash.com/photo-1778833302374-a3e9d6a8e700?w=800&q=80&fit=crop", alt: "Pérgola de madera frente al Mar Caribe" },
  ],
  "master-2": [
    { src: "https://images.unsplash.com/photo-1502794102238-ccd18db30c2b?w=800&q=80&fit=crop", alt: "Palapa frente a la playa de Tulum" },
    { src: "https://images.unsplash.com/photo-1778833302374-a3e9d6a8e700?w=800&q=80&fit=crop", alt: "Pérgola de madera frente al Mar Caribe" },
    { src: "https://images.unsplash.com/photo-1756115364101-bf3c2cba1029?w=800&q=80&fit=crop", alt: "Infinity pool de lujo con camastros" },
  ],
}

// ── Component ───────────────────────────────────────────────────────────────

export default function RoomsSection() {
  const [lightbox, setLightbox] = useState<{ roomId: string; index: number } | null>(null)

  // Flatten lightbox: all images in a single room's array
  const lbImages = lightbox ? ROOM_IMAGES[lightbox.roomId] : []
  const lbIndex = lightbox?.index ?? 0

  const lbPrev = () =>
    setLightbox((l) => l ? { ...l, index: l.index === 0 ? lbImages.length - 1 : l.index - 1 } : null)
  const lbNext = () =>
    setLightbox((l) => l ? { ...l, index: l.index === lbImages.length - 1 ? 0 : l.index + 1 } : null)

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {ROOMS.map((room) => (
          <div key={room.id} className="group bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow">

            {/* Carousel */}
            <RoomCarousel
              images={ROOM_IMAGES[room.id]}
              roomName={room.name}
              size={room.size}
              onExpand={(i) => setLightbox({ roomId: room.id, index: i })}
            />

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-heading text-xl font-medium text-[#1e3a1e] leading-snug">{room.name}</h3>
                <div className="flex gap-0.5 ml-2 flex-shrink-0 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={9} className="fill-[#b8962e] text-[#b8962e]" />
                  ))}
                </div>
              </div>

              {/* Mini thumbnail strip */}
              <div className="flex gap-1 mb-4">
                {ROOM_IMAGES[room.id].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox({ roomId: room.id, index: i })}
                    className="relative w-12 h-9 overflow-hidden flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="48px" />
                  </button>
                ))}
                <button
                  onClick={() => setLightbox({ roomId: room.id, index: 0 })}
                  className="flex-1 h-9 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 text-[10px] font-sans tracking-wider uppercase transition-colors flex items-center justify-center"
                >
                  + Galería
                </button>
              </div>

              <ul className="space-y-1.5 mb-6">
                {room.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600 font-sans">
                    <div className="w-1 h-1 rounded-full bg-[#b8962e] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-heading font-semibold text-[#1e3a1e]">${room.rate}</span>
                  <span className="text-sm text-gray-400 font-sans ml-1">USD / noche</span>
                </div>
                <Link
                  href={`/reservar?room=${room.id}`}
                  className="bg-[#1e3a1e] hover:bg-[#2d5016] text-white text-xs tracking-widest uppercase px-5 py-2.5 font-sans transition-colors"
                >
                  Reservar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={26} />
          </button>

          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 text-sm font-sans tracking-wider">
            {lbIndex + 1} / {lbImages.length}
          </span>

          <button
            className="absolute left-4 text-white/60 hover:text-white p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); lbPrev() }}
          >
            <ChevronLeft size={32} />
          </button>

          <div
            className="relative w-full max-w-4xl mx-20"
            style={{ aspectRatio: "16/10", maxHeight: "82vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lbImages[lbIndex].src.replace("w=800", "w=1600")}
              alt={lbImages[lbIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          <button
            className="absolute right-4 text-white/60 hover:text-white p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); lbNext() }}
          >
            <ChevronRight size={32} />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {lbImages.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox((l) => l ? { ...l, index: i } : null) }}
                className={`relative w-14 h-10 overflow-hidden transition-all ${
                  i === lbIndex ? "opacity-100 ring-1 ring-[#b8962e]" : "opacity-35 hover:opacity-60"
                }`}
              >
                <Image src={img.src} alt="" fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
