import { useEffect, useMemo, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard() {
  const [babies, setBabies] = useState([])
  const [milestones, setMilestones] = useState([])
  const [growth, setGrowth] = useState([])

  const load = async () => {
    const [b, m, g] = await Promise.all([
      fetch(`${baseUrl}/api/babies`).then(r=>r.json()),
      fetch(`${baseUrl}/api/milestones`).then(r=>r.json()),
      fetch(`${baseUrl}/api/growth`).then(r=>r.json()),
    ])
    setBabies(b); setMilestones(m); setGrowth(g)
  }

  useEffect(()=>{ load() },[])

  const groupedGrowth = useMemo(() => {
    const map = {}
    growth.forEach(item => {
      if (!map[item.baby_id]) map[item.baby_id] = []
      map[item.baby_id].push(item)
    })
    Object.values(map).forEach(arr => arr.sort((a,b)=> (a.date_recorded||'').localeCompare(b.date_recorded||'')))
    return map
  }, [growth])

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Ringkasan</h2>
          <button onClick={load} className="px-3 py-2 text-sm rounded-lg bg-gray-900 text-white">Muat Ulang</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {babies.map(b => (
            <div key={b.id} className="p-5 rounded-xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900 text-lg">{b.name}</div>
                  <div className="text-gray-500 text-sm">{b.gender === 'female' ? 'Perempuan' : 'Laki-laki'} {b.birth_date ? `• ${b.birth_date}` : ''}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-700 font-semibold mb-2">Pertumbuhan</div>
                <div className="relative w-full h-28 bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3"
                      points={(() => {
                        const arr = groupedGrowth[b.id] || []
                        if (!arr.length) return '0,60 400,60'
                        const maxH = Math.max(...arr.map(i => i.height_cm || 0), 1)
                        return arr.map((i, idx) => {
                          const x = (idx/(arr.length-1||1))*400
                          const y = 110 - ((i.height_cm||0)/maxH)*100
                          return `${x},${y}`
                        }).join(' ')
                      })()}
                    />
                  </svg>
                  {!((groupedGrowth[b.id]||[]).length) && (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">Belum ada data</div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-700 font-semibold mb-2">Tonggak Terbaru</div>
                <ul className="space-y-1 text-sm text-gray-700">
                  {milestones.filter(m=>m.baby_id===b.id).slice(-3).reverse().map(m => (
                    <li key={m.id} className="flex items-center justify-between">
                      <span>{m.title}</span>
                      <span className="text-gray-500">{m.date_achieved || ''}</span>
                    </li>
                  ))}
                  {milestones.filter(m=>m.baby_id===b.id).length===0 && (
                    <li className="text-gray-500">Belum ada catatan</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
