"use client"

import { Printer } from "lucide-react"

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 bg-[#1e3a1e] hover:bg-[#2d5016] text-white text-sm tracking-widest uppercase px-6 py-2.5 font-sans transition-colors"
    >
      <Printer size={15} />
      Imprimir / Guardar PDF
    </button>
  )
}
