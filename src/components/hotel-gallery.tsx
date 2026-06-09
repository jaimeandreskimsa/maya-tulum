"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
  span?: "wide" | "tall" | "normal"
}

interface HotelGalleryProps {
  images: GalleryImage[]
}

export default function HotelGallery({ images }: HotelGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = () => setLightbox((l) => (l === null ? null : l === 0 ? images.length - 1 : l - 1))
  const next = () => setLightbox((l) => (l === null ? null : l === images.length - 1 ? 0 : l + 1))

  return (
    <>
      {/* Masonry-style grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative overflow-hidden cursor-pointer group ${
              img.span === "wide" ? "md:col-span-2" : ""
            } ${img.span === "tall" ? "row-span-2" : ""}`}
            style={{ aspectRatio: img.span === "wide" ? "16/9" : img.span === "tall" ? "9/16" : "1/1" }}
            onClick={() => setLightbox(i)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <ZoomIn
                size={24}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          {/* Counter */}
          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm font-sans">
            {lightbox + 1} / {images.length}
          </span>

          {/* Prev */}
          <button
            className="absolute left-4 text-white/70 hover:text-white p-3"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Anterior"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-16"
            style={{ aspectRatio: "16/10" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].src.replace("w=800", "w=1600").replace("w=1920", "w=1600")}
              alt={images[lightbox].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 text-white/70 hover:text-white p-3"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Siguiente"
          >
            <ChevronRight size={32} />
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-md">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i) }}
                className={`relative flex-shrink-0 w-12 h-9 overflow-hidden transition-opacity ${
                  i === lightbox ? "opacity-100 ring-1 ring-[#b8962e]" : "opacity-40 hover:opacity-70"
                }`}
              >
                <Image src={img.src} alt="" fill className="object-cover" sizes="48px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
