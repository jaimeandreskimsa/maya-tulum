import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/navbar"

export const metadata: Metadata = {
  title: "Política de Privacidad | Hotel Maya-Tulum",
  description:
    "Política de privacidad de Hotel Maya-Tulum. Conoce cómo recopilamos, usamos y protegemos tus datos personales.",
}

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf9f6] pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="text-[#b8962e] text-xs tracking-[0.5em] uppercase font-sans mb-3">Legal</p>
            <h1 className="font-heading text-4xl md:text-5xl font-light text-[#1e3a1e]">
              Política de Privacidad
            </h1>
            <div className="w-12 h-[1px] bg-[#b8962e] mx-auto mt-6" />
            <p className="text-gray-500 text-sm font-sans mt-6">Última actualización: junio de 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-stone max-w-none font-sans text-gray-700 space-y-10">

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">1. Responsable del tratamiento</h2>
              <p className="text-sm leading-relaxed">
                Hotel Maya-Tulum S.A.S. de C.V., con domicilio en Carretera Tulum-Cobá Km 7.5, Zona Hotelera,
                Tulum, Quintana Roo 77780, México (en adelante, <strong>"el Hotel"</strong>), es el responsable
                del tratamiento de los datos personales que usted nos proporcione.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                Correo de contacto para ejercicio de derechos ARCO:{" "}
                <a href="mailto:privacidad@hotelmayatulum.mx" className="text-[#b8962e] hover:underline">
                  privacidad@hotelmayatulum.mx
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">2. Datos personales que recopilamos</h2>
              <p className="text-sm leading-relaxed mb-2">
                En el marco de la prestación de nuestros servicios, podemos recopilar los siguientes datos:
              </p>
              <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
                <li>Nombre completo y apellidos</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Fechas de estancia y preferencias de habitación</li>
                <li>Datos de pago (procesados de forma segura a través de proveedores certificados PCI-DSS)</li>
                <li>Dirección IP y datos de navegación (a través de cookies)</li>
                <li>Solicitudes especiales o información de salud cuando sea necesaria para prestar el servicio</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">3. Finalidad del tratamiento</h2>
              <p className="text-sm leading-relaxed mb-2">Sus datos son utilizados para:</p>
              <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
                <li>Gestionar y confirmar su reservación</li>
                <li>Procesar pagos y emitir comprobantes fiscales</li>
                <li>Brindar atención personalizada durante su estancia</li>
                <li>Enviar comunicaciones relacionadas con su reserva (confirmaciones, recordatorios, check-out)</li>
                <li>Mejorar nuestros servicios mediante encuestas de satisfacción (solo con su consentimiento)</li>
                <li>Enviar promociones y ofertas especiales (solo con su consentimiento expreso)</li>
                <li>Cumplir con obligaciones legales y fiscales</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">4. Base legal del tratamiento</h2>
              <p className="text-sm leading-relaxed">
                El tratamiento de sus datos se sustenta en: (i) la ejecución del contrato de hospedaje; (ii) el
                cumplimiento de obligaciones legales aplicables en México (Ley Federal de Protección de Datos
                Personales en Posesión de los Particulares); y (iii) su consentimiento para finalidades
                secundarias como el envío de comunicaciones comerciales.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">5. Compartición de datos con terceros</h2>
              <p className="text-sm leading-relaxed mb-2">
                Sus datos personales no se venden ni ceden a terceros con fines comerciales. Pueden ser
                compartidos únicamente con:
              </p>
              <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
                <li>Pasarelas de pago para procesar transacciones</li>
                <li>Proveedores de sistemas de gestión hotelera (PMS) bajo acuerdos de confidencialidad</li>
                <li>Autoridades competentes cuando lo exija la ley</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">6. Conservación de los datos</h2>
              <p className="text-sm leading-relaxed">
                Sus datos se conservarán durante el tiempo necesario para cumplir con las finalidades descritas y,
                en cualquier caso, durante los plazos de prescripción legal establecidos en la legislación
                mexicana (mínimo 5 años para datos fiscales y contables).
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">7. Derechos ARCO</h2>
              <p className="text-sm leading-relaxed mb-2">
                Usted tiene derecho a:
              </p>
              <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
                <li><strong>Acceso:</strong> conocer qué datos personales tenemos sobre usted</li>
                <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos</li>
                <li><strong>Cancelación:</strong> solicitar la eliminación de sus datos cuando no sean necesarios</li>
                <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos para fines específicos</li>
              </ul>
              <p className="text-sm leading-relaxed mt-2">
                Para ejercer estos derechos, envíe un correo a{" "}
                <a href="mailto:privacidad@hotelmayatulum.mx" className="text-[#b8962e] hover:underline">
                  privacidad@hotelmayatulum.mx
                </a>{" "}
                indicando su nombre, el derecho que desea ejercer y adjuntando una copia de su identificación oficial.
                Daremos respuesta en un plazo máximo de 20 días hábiles.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">8. Uso de cookies</h2>
              <p className="text-sm leading-relaxed">
                Nuestro sitio web utiliza cookies técnicas necesarias para su funcionamiento y cookies analíticas
                para medir el tráfico (Google Analytics con IP anonimizada). Puede configurar su navegador para
                rechazar las cookies, aunque esto puede afectar la funcionalidad del sitio.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">9. Seguridad</h2>
              <p className="text-sm leading-relaxed">
                Implementamos medidas técnicas y organizativas razonables para proteger sus datos personales
                contra accesos no autorizados, pérdida o destrucción, incluyendo transmisión cifrada mediante
                TLS/HTTPS y acceso restringido al personal autorizado.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-medium text-[#1e3a1e] mb-3">10. Modificaciones a esta política</h2>
              <p className="text-sm leading-relaxed">
                El Hotel se reserva el derecho de modificar esta Política de Privacidad en cualquier momento.
                Los cambios serán publicados en esta misma página indicando la fecha de última actualización.
                El uso continuado del sitio o de nuestros servicios implica la aceptación de la versión vigente.
              </p>
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
