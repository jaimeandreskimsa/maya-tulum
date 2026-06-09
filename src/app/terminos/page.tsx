import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/navbar"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Hotel Maya-Tulum",
  description:
    "Términos y condiciones de uso del sitio web y de los servicios de hospedaje de Hotel Maya-Tulum.",
}

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf9f6] pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="text-[#b8962e] text-xs tracking-[0.5em] uppercase font-sans mb-3">Legal</p>
            <h1 className="font-heading text-4xl md:text-5xl font-light text-[#1e3a1e]">
              Términos y Condiciones
            </h1>
            <div className="w-12 h-[1px] bg-[#b8962e] mx-auto mt-6" />
            <p className="text-gray-500 text-sm font-sans mt-6">Última actualización: junio de 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-stone max-w-none font-sans text-gray-700 space-y-10">

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">1. Aceptación de los términos</h2>
              <p className="text-sm leading-relaxed">
                El acceso y uso del sitio web de Hotel Maya-Tulum S.A.S. de C.V. (en adelante, <strong>"el Hotel"</strong>),
                así como la contratación de sus servicios de hospedaje, implica la aceptación plena y sin reservas
                de los presentes Términos y Condiciones. Si no está de acuerdo con alguno de ellos, le rogamos
                que se abstenga de utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">2. Reservaciones</h2>
              <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
                <li>
                  Las reservaciones realizadas a través del sitio web o por cualquier otro canal oficial son
                  vinculantes una vez recibida la confirmación por correo electrónico.
                </li>
                <li>
                  Para garantizar la reserva se requiere el pago del 30 % del importe total o el importe completo
                  de la primera noche, según la tarifa seleccionada.
                </li>
                <li>
                  Las tarifas publicadas están expresadas en pesos mexicanos (MXN) e incluyen impuestos (IVA 16 %
                  e ISH 3 %). El Hotel se reserva el derecho de corregir errores tipográficos o de cálculo antes
                  de confirmar la reserva.
                </li>
                <li>
                  La disponibilidad de habitaciones y servicios queda sujeta a la confirmación en el momento
                  de la solicitud.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">3. Política de cancelación y modificación</h2>
              <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
                <li>
                  <strong>Cancelación gratuita:</strong> hasta 72 horas antes de la fecha de llegada prevista
                  (horario de México Central, UTC-6).
                </li>
                <li>
                  <strong>Cancelación con cargo:</strong> si la cancelación se realiza con menos de 72 horas de
                  antelación, se cobrarán el equivalente a una noche de hospedaje como penalización.
                </li>
                <li>
                  <strong>No-show:</strong> la no presentación sin aviso previo conllevará el cargo del 100 %
                  de la primera noche reservada.
                </li>
                <li>
                  Las modificaciones de fecha están sujetas a disponibilidad y deben solicitarse con al menos
                  48 horas de antelación sin costo adicional.
                </li>
                <li>
                  Las tarifas no reembolsables quedan excluidas de la política de cancelación gratuita y se
                  indicarán expresamente en el proceso de reserva.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">4. Check-in y Check-out</h2>
              <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
                <li>El check-in está disponible a partir de las 15:00 h (hora local). Check-in anticipado sujeto a disponibilidad y posible cargo adicional.</li>
                <li>El check-out debe realizarse a más tardar a las 12:00 h. Late check-out hasta las 15:00 h sujeto a disponibilidad y cargo adicional del 50 % de la tarifa diaria.</li>
                <li>Se requiere presentar identificación oficial vigente y la tarjeta de crédito/débito utilizada en el pago al momento del check-in.</li>
                <li>El Hotel podrá solicitar una preautorización o depósito en garantía para cubrir posibles cargos incidentales.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">5. Normas de convivencia</h2>
              <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
                <li>El Hotel es un establecimiento para adultos (18 años o más). Los menores de edad deberán estar acompañados de un tutor legal en todo momento.</li>
                <li>Se prohíbe fumar en todas las habitaciones e instalaciones interiores. Las áreas designadas para fumadores se señalizarán expresamente.</li>
                <li>No se permiten mascotas salvo en las habitaciones habilitadas para ello (consulte disponibilidad al momento de reservar).</li>
                <li>El horario de silencio es de 23:00 a 08:00 h. El Hotel se reserva el derecho de admisión y de exigir el desalojo sin reembolso en caso de conducta inapropiada o daños a las instalaciones.</li>
                <li>Queda prohibido introducir sustancias ilegales o armas en las instalaciones del Hotel.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">6. Responsabilidad</h2>
              <p className="text-sm leading-relaxed mb-2">
                El Hotel no será responsable de:
              </p>
              <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
                <li>Pérdidas, robos o daños a objetos personales dejados en habitaciones o áreas comunes, salvo custodia en caja de seguridad.</li>
                <li>Interrupciones de servicios causadas por fenómenos naturales, cortes de suministros o causas de fuerza mayor.</li>
                <li>Daños indirectos, lucro cesante o perjuicios derivados del uso de la información publicada en el sitio web.</li>
              </ul>
              <p className="text-sm leading-relaxed mt-2">
                La responsabilidad máxima del Hotel frente al huésped quedará limitada al importe pagado por la reserva.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">7. Propiedad intelectual</h2>
              <p className="text-sm leading-relaxed">
                Todos los contenidos del sitio web (textos, imágenes, logotipos, diseño gráfico) son propiedad
                de Hotel Maya-Tulum o de sus licenciantes y están protegidos por las leyes de propiedad
                intelectual aplicables. Queda prohibida su reproducción, distribución o uso comercial sin
                autorización previa y por escrito del Hotel.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">8. Uso del sitio web</h2>
              <p className="text-sm leading-relaxed">
                El usuario se compromete a hacer un uso lícito del sitio web y a no realizar acciones que
                puedan dañar, inutilizar o sobrecargar los sistemas del Hotel o interferir con el uso normal
                por parte de otros usuarios. Queda prohibido el uso de bots, scrapers u otras herramientas
                automatizadas sin consentimiento expreso.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">9. Ley aplicable y jurisdicción</h2>
              <p className="text-sm leading-relaxed">
                Los presentes Términos y Condiciones se rigen por las leyes vigentes en los Estados Unidos
                Mexicanos. Para cualquier controversia derivada de su interpretación o cumplimiento, las partes
                se someten a la jurisdicción de los tribunales competentes de Chetumal, Quintana Roo, México,
                renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">10. Modificaciones</h2>
              <p className="text-sm leading-relaxed">
                El Hotel se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento,
                publicando la versión actualizada en esta página con indicación de la fecha de revisión.
                Las reservaciones ya confirmadas se regirán por los términos vigentes en la fecha de su
                contratación.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">11. Contacto</h2>
              <p className="text-sm leading-relaxed">
                Para cualquier consulta relacionada con estos Términos puede contactarnos en:
              </p>
              <ul className="list-none mt-2 text-sm leading-relaxed space-y-1">
                <li>📍 Carretera Tulum-Cobá Km 7.5, Zona Hotelera, Tulum, Q.R. 77780</li>
                <li>
                  📧{" "}
                  <a href="mailto:reservaciones@hotelmayatulum.mx" className="text-[#b8962e] hover:underline">
                    reservaciones@hotelmayatulum.mx
                  </a>
                </li>
                <li>📞 +52 (984) 877-3210</li>
              </ul>
            </section>

          </div>

          {/* Back link */}
          <div className="mt-14 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/"
              className="text-sm font-sans text-[#b8962e] hover:underline tracking-wide"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
