import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import type { ReservationData } from "@/lib/reservation"

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true, // SSL en puerto 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

function formatDateEs(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function fmtUSD(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function buildEmailHtml(res: ReservationData, confirmUrl: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmación de Reserva — Hotel Maya-Tulum</title>
</head>
<body style="margin:0;padding:0;background:#f0ebe0;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe0;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:2px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <!-- HEADER -->
        <tr>
          <td style="background:#1e3a1e;padding:32px 40px 24px;">
            <p style="margin:0 0 4px;color:#b8962e;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;">Comprobante Oficial de Hospedaje</p>
            <h1 style="margin:0 0 4px;color:#ffffff;font-family:Georgia,serif;font-size:26px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">Hotel Maya-Tulum</h1>
            <p style="margin:0;color:rgba(255,255,255,0.5);font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;">Boutique &amp; Spa · Tulum, Quintana Roo</p>
          </td>
        </tr>

        <!-- STATUS BAR -->
        <tr>
          <td style="background:#2d5016;padding:12px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="color:#ffffff;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;letter-spacing:0.15em;text-transform:uppercase;">
                  ✓ &nbsp;Reservación Confirmada
                </td>
                <td align="right" style="color:#b8962e;font-family:Georgia,serif;font-size:16px;font-weight:600;letter-spacing:0.15em;">
                  ${res.code}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- DATES STRIP -->
        <tr>
          <td style="padding:0;border-bottom:1px solid #f0ece4;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="33%" style="padding:20px 16px;text-align:center;border-right:1px solid #f0ece4;">
                  <p style="margin:0 0 4px;color:#9ca3af;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;">Check-in</p>
                  <p style="margin:0;color:#1e3a1e;font-family:Georgia,serif;font-size:20px;font-weight:500;">${new Date(res.checkin + "T12:00:00").toLocaleDateString("es-MX", { day: "2-digit", month: "short" })}</p>
                  <p style="margin:2px 0 0;color:#9ca3af;font-family:Arial,sans-serif;font-size:11px;">${new Date(res.checkin + "T12:00:00").getFullYear()}</p>
                  <p style="margin:4px 0 0;color:#b8962e;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;">15:00 hrs</p>
                </td>
                <td width="33%" style="padding:20px 16px;text-align:center;border-right:1px solid #f0ece4;background:#f9f5ee;">
                  <p style="margin:0 0 4px;color:#9ca3af;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;">Duración</p>
                  <p style="margin:0;color:#1e3a1e;font-family:Georgia,serif;font-size:28px;font-weight:500;">${res.nights}</p>
                  <p style="margin:0;color:#9ca3af;font-family:Arial,sans-serif;font-size:11px;">${res.nights === 1 ? "noche" : "noches"}</p>
                </td>
                <td width="33%" style="padding:20px 16px;text-align:center;">
                  <p style="margin:0 0 4px;color:#9ca3af;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;">Check-out</p>
                  <p style="margin:0;color:#1e3a1e;font-family:Georgia,serif;font-size:20px;font-weight:500;">${new Date(res.checkout + "T12:00:00").toLocaleDateString("es-MX", { day: "2-digit", month: "short" })}</p>
                  <p style="margin:2px 0 0;color:#9ca3af;font-family:Arial,sans-serif;font-size:11px;">${new Date(res.checkout + "T12:00:00").getFullYear()}</p>
                  <p style="margin:4px 0 0;color:#b8962e;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;">12:00 hrs</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:32px 40px;">

            <!-- GUEST INFO -->
            <p style="margin:0 0 12px;color:#b8962e;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.4em;text-transform:uppercase;">Huésped Principal</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:13px;margin-bottom:28px;">
              <tr><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#9ca3af;width:38%;">Nombre</td><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#1a1a1a;font-weight:600;">${res.guest}</td></tr>
              <tr><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#9ca3af;">Pasaporte</td><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#1a1a1a;font-family:'Courier New',monospace;">${res.passport}</td></tr>
              <tr><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#9ca3af;">Nacionalidad</td><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#1a1a1a;">${res.nationality}</td></tr>
              <tr><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#9ca3af;">Correo</td><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#1a1a1a;">${res.email}</td></tr>
              <tr><td style="padding:6px 0;color:#9ca3af;">Teléfono</td><td style="padding:6px 0;color:#1a1a1a;">${res.phone}</td></tr>
            </table>

            <!-- STAY INFO -->
            <p style="margin:0 0 12px;color:#b8962e;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.4em;text-transform:uppercase;">Detalles de la Estancia</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:13px;margin-bottom:28px;">
              <tr><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#9ca3af;width:38%;">Llegada</td><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#1a1a1a;text-transform:capitalize;">${formatDateEs(res.checkin)}</td></tr>
              <tr><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#9ca3af;">Hora entrada</td><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#1a1a1a;">15:00 hrs</td></tr>
              <tr><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#9ca3af;">Salida</td><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#1a1a1a;text-transform:capitalize;">${formatDateEs(res.checkout)}</td></tr>
              <tr><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#9ca3af;">Hora salida</td><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#1a1a1a;">12:00 hrs</td></tr>
              <tr><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#9ca3af;">Habitación</td><td style="padding:6px 0;border-bottom:1px solid #f5f5f5;color:#1a1a1a;">${res.roomName}</td></tr>
              <tr><td style="padding:6px 0;color:#9ca3af;">Huéspedes</td><td style="padding:6px 0;color:#1a1a1a;">${res.guests} ${res.guests === 1 ? "persona" : "personas"}</td></tr>
            </table>

            <!-- CHARGES -->
            <p style="margin:0 0 12px;color:#b8962e;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.4em;text-transform:uppercase;">Cargos</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f5ee;padding:16px;font-family:Arial,sans-serif;font-size:13px;margin-bottom:28px;">
              <tr>
                <td style="padding:5px 0;color:#4b5563;">${res.roomName} · ${res.nights} noches × $${fmtUSD(res.ratePerNight)} USD</td>
                <td align="right" style="padding:5px 0;color:#4b5563;">$${fmtUSD(res.subtotal)} USD</td>
              </tr>
              <tr>
                <td style="padding:5px 0;color:#4b5563;border-bottom:1px solid #e5e0d5;">IVA (16%)</td>
                <td align="right" style="padding:5px 0;color:#4b5563;border-bottom:1px solid #e5e0d5;">$${fmtUSD(res.tax)} USD</td>
              </tr>
              <tr>
                <td style="padding:10px 0 5px;color:#1e3a1e;font-weight:700;font-size:15px;">Total a pagar</td>
                <td align="right" style="padding:10px 0 5px;color:#1e3a1e;font-weight:700;font-size:15px;">$${fmtUSD(res.total)} USD</td>
              </tr>
              <tr>
                <td style="color:#9ca3af;font-size:11px;">Forma de pago</td>
                <td align="right" style="color:#9ca3af;font-size:11px;">Al momento del check-in</td>
              </tr>
            </table>

            <!-- CTA BUTTON -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td align="center">
                  <a href="${confirmUrl}" style="display:inline-block;background:#1e3a1e;color:#ffffff;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;padding:14px 36px;">
                    Ver / Imprimir Comprobante
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top:8px;">
                  <p style="margin:0;color:#9ca3af;font-family:Arial,sans-serif;font-size:11px;">
                    Guarda este correo o el enlace para mostrarlo al hacer check-in
                  </p>
                </td>
              </tr>
            </table>

            <!-- CANCEL POLICY -->
            <div style="border-top:1px solid #f0ece4;padding-top:20px;margin-bottom:20px;">
              <p style="margin:0 0 6px;color:#b8962e;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.4em;text-transform:uppercase;">Política de Cancelación</p>
              <p style="margin:0;color:#6b7280;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;">
                Cancelación gratuita hasta <strong style="color:#1a1a1a;">48 horas antes</strong> de la fecha de llegada.
                Cancelaciones posteriores o no presentación: cargo equivalente a 1 noche.
              </p>
            </div>

          </td>
        </tr>

        <!-- HOTEL FOOTER -->
        <tr>
          <td style="background:#f9f5ee;padding:20px 40px;border-top:1px solid #f0ece4;">
            <p style="margin:0 0 4px;color:#1e3a1e;font-family:Georgia,serif;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">Hotel Maya-Tulum</p>
            <p style="margin:0;color:#9ca3af;font-family:Arial,sans-serif;font-size:11px;line-height:1.8;">
              Carretera Tulum-Cobá Km 7.5, Zona Hotelera<br>
              Tulum, Quintana Roo 77780, México<br>
              Tel: +52 (984) 877-3210 &nbsp;·&nbsp; reservaciones@hotelmayatulum.mx
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#1e3a1e;padding:10px 40px;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.35);font-family:Arial,sans-serif;font-size:10px;">
              Este correo confirma tu reservación en Hotel Maya-Tulum. Para cambios: +52 (984) 877-3210
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { reservation, confirmUrl } = body as {
      reservation: ReservationData
      confirmUrl: string
    }

    if (!reservation || !reservation.email || !reservation.code) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      // Dev mode: log to console when SMTP not configured
      console.log("📧 [DEV] Correo de confirmación para:", reservation.email)
      console.log("Reserva:", reservation.code, "| URL:", confirmUrl)
      return NextResponse.json({ ok: true, dev: true })
    }

    const info = await getTransporter().sendMail({
      from: process.env.SMTP_FROM ?? `Hotel Maya-Tulum <${process.env.SMTP_USER}>`,
      to: reservation.email,
      subject: `Confirmación de Reserva ${reservation.code} — Hotel Maya-Tulum`,
      html: buildEmailHtml(reservation, confirmUrl),
    })

    return NextResponse.json({ ok: true, id: info.messageId })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
