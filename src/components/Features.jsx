import { Baby, Calendar, LineChart, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Baby,
    title: 'Profil Bayi',
    desc: 'Buat profil untuk setiap anak lengkap dengan tanggal lahir & catatan.'
  },
  {
    icon: Calendar,
    title: 'Tonggak Perkembangan',
    desc: 'Catat momen penting seperti pertama kali berguling, merangkak, berjalan.'
  },
  {
    icon: LineChart,
    title: 'Grafik Pertumbuhan',
    desc: 'Pantau berat, tinggi, dan lingkar kepala dalam grafik sederhana.'
  },
  {
    icon: Sparkles,
    title: 'Desain Modern',
    desc: 'UI cantik dengan animasi halus dan pengalaman yang intuitif.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Fitur Utama</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={i} className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 text-blue-700"><Icon size={20} /></div>
                  <div className="font-semibold text-gray-900">{f.title}</div>
                </div>
                <p className="mt-3 text-sm text-gray-600">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
