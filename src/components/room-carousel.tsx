"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

interface RoomCarouselProps {
  images: { src: string; alt: string }[]
  roomName: string
  size: string
  onExpand: (index: number) => void
}

export default function RoomCarousel({ images, roomName, size, onExpand }: RoomCarouselProps) {
  const [current, setCurrent] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ])

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    setCurrent(emblaApi.selectedScrollSnap() - 1 < 0 ? images.length - 1 : emblaApi.selectedScrollSnap() - 1)
  }, [emblaApi, images.length])

  const scrollNext = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    // Update current after a tick so embla has time to update
    setTimeout(() => setCurrent(emblaApi.selectedScrollSnap()), 10)
  }, [emblaApi])

  const scrollTo = useCallback((idx: number) => {
    if (!emblaApi) return
    emblaApi.scrollTo(idx)
    setCurrent(idx)
  }, [emblaApi])

  return (
    <div className="relative overflow-hidden group/carousel">
      {/* Embla viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-60 md:h-64">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={i === 0}
              />
              {/* Subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Expand button */}
      <button
        onClick={() => onExpand(current)}
        className="absolute top-3 right-3 bg-black/40 hover:bg-black/70 text-white p-1.5 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
        aria-label="Ver en grande"
      >
        <Expand size={14} />
      </button>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1.5 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
            aria-label="Anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1.5 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
            aria-label="Siguiente"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === current ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Imagen ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Size badge */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <span className="text-white/80 text-xs tracking-widest uppercase font-sans bg-black/30 px-2 py-0.5 backdrop-blur-sm">
          {size}
        </span>
      </div>
    </div>
  )
}
