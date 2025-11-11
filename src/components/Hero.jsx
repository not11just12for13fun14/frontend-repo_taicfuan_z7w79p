import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] bg-blue-400/30 blur-3xl rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto px-4 py-12">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900"
          >
            Pantau Perkembangan Bayi dengan Cara yang Menyenangkan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 text-gray-600"
          >
            Catat tonggak perkembangan, rekam pertumbuhan berat dan tinggi, dan lihat progresnya dalam grafik interaktif.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 flex gap-3"
          >
            <a href="#create" className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
              Mulai Sekarang
            </a>
            <a href="#features" className="px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-200">
              Jelajahi Fitur
            </a>
          </motion.div>
        </div>
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-gray-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <Spline scene="https://prod.spline.design/M1G7sHq-3D/scene.splinecode" />
        </div>
      </div>
    </section>
  )
}
