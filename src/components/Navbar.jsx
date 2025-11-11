import { Baby, Home, LineChart, PlusCircle, Sparkles } from 'lucide-react'

export default function Navbar({ current, onChange }) {
  const tabs = [
    { key: 'home', label: 'Beranda', icon: Home },
    { key: 'babies', label: 'Profil Bayi', icon: Baby },
    { key: 'milestones', label: 'Tonggak', icon: Sparkles },
    { key: 'growth', label: 'Pertumbuhan', icon: LineChart },
  ]

  return (
    <nav className="backdrop-blur bg-white/70 border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">BayiKU</div>
          <div className="flex gap-1">
            {tabs.map(t => {
              const Icon = t.icon
              const active = current === t.key
              return (
                <button
                  key={t.key}
                  onClick={() => onChange(t.key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Icon size={18} /> {t.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
