import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import RoomsSection from "@/components/rooms-section"
import HotelGallery from "@/components/hotel-gallery"
import HeroSlider from "@/components/hero-slider"
import { MapPin, Phone, Mail, Wifi, Utensils, Waves, Leaf, Star, Clock } from "lucide-react"

// Gallery images — Tulum & Riviera Maya (Unsplash License)
const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1522093243371-296c79a66df4?w=900&q=80&fit=crop", alt: "Cenote subterráneo — Tulum, México", span: "wide" as const },
  { src: "https://images.unsplash.com/photo-1520974822564-9b91874afe9c?w=600&q=80&fit=crop", alt: "Nado en cenote cueva — Dos Ojos" },
  { src: "https://images.unsplash.com/photo-1493508994801-b87b8970d035?w=600&q=80&fit=crop", alt: "Buceo en cenote — Quintana Roo" },
  { src: "https://images.unsplash.com/photo-1664205543898-829ef8baa7ad?w=900&q=80&fit=crop", alt: "Ruinas del Castillo — Zona Arqueológica Tulum", span: "wide" as const },
  { src: "https://images.unsplash.com/photo-1549727636-36589a0cf6f5?w=600&q=80&fit=crop", alt: "Palmera junto a la alberca" },
  { src: "https://images.unsplash.com/photo-1777501935969-8d04cedfeb8c?w=600&q=80&fit=crop", alt: "Arquitectura boutique — Riviera Maya" },
  { src: "https://images.unsplash.com/photo-1585614733378-4c58f92de4a1?w=600&q=80&fit=crop", alt: "Agua turquesa en la selva — México" },
  { src: "https://images.unsplash.com/photo-1502794102238-ccd18db30c2b?w=600&q=80&fit=crop", alt: "Palapa frente a la playa de Tulum" },
]

export default function HomePage() {
  return (
    <>
      <Navbar />

      <HeroSlider />

      {/* HABITACIONES */}
      <section id="habitaciones" className="bg-[#f9f5ee] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#b8962e] text-xs tracking-[0.5em] uppercase font-sans mb-3">Alojamiento</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-[#1e3a1e]">Nuestras Habitaciones</h2>
            <div className="w-12 h-[1px] bg-[#b8962e] mx-auto mt-6" />
          </div>

          <RoomsSection />
        </div>
      </section>

      {/* EXPERIENCIAS */}
      <section id="experiencias" className="bg-[#1e3a1e] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#b8962e] text-xs tracking-[0.5em] uppercase font-sans mb-3">Lo que ofrecemos</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-white">Experiencias</h2>
            <div className="w-12 h-[1px] bg-[#b8962e] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: Leaf, title: "Spa & Bienestar", desc: "Masajes, terapias con jade y tratamientos de barro maya." },
              { icon: Utensils, title: "Restaurante Ceiba", desc: "Cocina yucateca de autor con ingredientes locales y de temporada." },
              { icon: Waves, title: "Cenote Privado", desc: "Acceso exclusivo a nuestro cenote natural a 200 metros del hotel." },
              { icon: Leaf, title: "Yoga & Meditación", desc: "Sesiones diarias en plataforma abierta rodeada de selva." },
              { icon: Star, title: "Excursiones", desc: "Tours a Tulum, Cobá, Sian Ka'an y cenotes de la zona." },
              { icon: Clock, title: "Concierge 24h", desc: "Asistencia permanente para reservas, traslados y cualquier solicitud." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 border border-white/10 hover:border-[#b8962e]/40 transition-colors">
                <Icon size={20} className="text-[#b8962e] mb-4" />
                <h3 className="font-heading text-lg font-medium text-white mb-2">{title}</h3>
                <p className="text-sm text-white/50 font-sans leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#b8962e] text-xs tracking-[0.5em] uppercase font-sans mb-3">Fotos</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-[#1e3a1e]">Galería</h2>
            <div className="w-12 h-[1px] bg-[#b8962e] mx-auto mt-6" />
          </div>
          <HotelGallery images={GALLERY_IMAGES} />
        </div>
      </section>

      {/* UBICACION */}
      <section id="ubicacion" className="bg-[#f9f5ee] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#b8962e] text-xs tracking-[0.5em] uppercase font-sans mb-3">Cómo llegar</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-[#1e3a1e]">Ubicación</h2>
            <div className="w-12 h-[1px] bg-[#b8962e] mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin size={20} className="text-[#b8962e] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-lg font-medium text-[#1e3a1e]">Dirección</p>
                    <p className="text-gray-600 font-sans text-sm leading-relaxed mt-1">
                      Carretera Tulum-Cobá Km 7.5, Zona Hotelera<br />
                      Tulum, Quintana Roo 77780<br />
                      México
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone size={20} className="text-[#b8962e] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-lg font-medium text-[#1e3a1e]">Teléfono</p>
                    <p className="text-gray-600 font-sans text-sm mt-1">+52 (984) 877-3210</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail size={20} className="text-[#b8962e] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-lg font-medium text-[#1e3a1e]">Correo</p>
                    <p className="text-gray-600 font-sans text-sm mt-1">reservaciones@hotelmayatulum.mx</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Wifi size={20} className="text-[#b8962e] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-lg font-medium text-[#1e3a1e]">Cómo llegar</p>
                    <p className="text-gray-600 font-sans text-sm leading-relaxed mt-1">
                      A 1:45 h del Aeropuerto Internacional de Cancún (CUN).<br />
                      A 35 min del Aeropuerto de Tulum (TQO).<br />
                      Servicio de traslado disponible bajo reserva.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-[#1e3a1e]/5 border-l-2 border-[#b8962e]">
                <p className="text-sm text-gray-600 font-sans">
                  <strong className="text-[#1e3a1e]">Check-in:</strong> a partir de las 15:00 h<br />
                  <strong className="text-[#1e3a1e]">Check-out:</strong> hasta las 12:00 h
                </p>
              </div>
            </div>

            <div className="overflow-hidden shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=Carretera+Tulum-Cob%C3%A1+Km+7.5%2C+Zona+Hotelera%2C+Tulum%2C+Quintana+Roo+77780%2C+M%C3%A9xico&output=embed&hl=es"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Maya-Tulum — Ubicación en Google Maps"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f1f0f] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="font-heading text-xl font-semibold tracking-[0.15em] text-white uppercase mb-1">
                Hotel Maya-Tulum
              </div>
              <div className="text-xs tracking-[0.3em] text-[#b8962e] uppercase font-sans mb-4">
                Boutique &amp; Spa
              </div>
              <p className="text-white/40 text-sm font-sans leading-relaxed">
                Carretera Tulum-Cobá Km 7.5<br />
                Tulum, Quintana Roo 77780<br />
                México
              </p>
            </div>
            <div>
              <p className="text-white/60 text-xs tracking-[0.3em] uppercase font-sans mb-4">Contacto</p>
              <div className="space-y-2 text-sm text-white/40 font-sans">
                <p>+52 (984) 877-3210</p>
                <p>reservaciones@hotelmayatulum.mx</p>
              </div>
            </div>
            <div>
              <p className="text-white/60 text-xs tracking-[0.3em] uppercase font-sans mb-4">El Hotel</p>
              <div className="space-y-2">
                {[
                  { href: "/#habitaciones", label: "Habitaciones" },
                  { href: "/#experiencias", label: "Experiencias" },
                  { href: "/reservar", label: "Reservar" },
                  { href: "/mi-reserva", label: "Mi Reserva" },
                ].map(({ href, label }) => (
                  <div key={href}>
                    <Link href={href} className="text-sm text-white/40 hover:text-white/70 transition-colors font-sans">
                      {label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs font-sans">
              © 2026 Hotel Maya-Tulum. Todos los derechos reservados.
            </p>
            <p className="text-white/20 text-xs font-sans space-x-1">
              <Link href="/privacidad" className="hover:text-white/50 transition-colors">Política de privacidad</Link>
              <span>·</span>
              <Link href="/terminos" className="hover:text-white/50 transition-colors">Términos y condiciones</Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
