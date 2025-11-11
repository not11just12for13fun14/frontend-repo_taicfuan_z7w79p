import { useEffect, useState } from 'react'
import { Plus, CheckCircle2 } from 'lucide-react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Forms() {
  const [babies, setBabies] = useState([])
  const [created, setCreated] = useState(false)

  const [formBaby, setFormBaby] = useState({ name: '', gender: 'male', birth_date: '' })
  const [formMilestone, setFormMilestone] = useState({ baby_id: '', title: '', date_achieved: '', description: '' })
  const [formGrowth, setFormGrowth] = useState({ baby_id: '', date_recorded: '', weight_kg: '', height_cm: '', head_circumference_cm: '' })

  useEffect(() => {
    fetchBabies()
  }, [])

  const fetchBabies = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/babies`)
      const data = await res.json()
      setBabies(data)
      if (data.length && !formMilestone.baby_id) {
        setFormMilestone(f => ({ ...f, baby_id: data[0].id }))
        setFormGrowth(f => ({ ...f, baby_id: data[0].id }))
      }
    } catch (e) { console.error(e) }
  }

  const submitBaby = async (e) => {
    e.preventDefault()
    const res = await fetch(`${baseUrl}/api/babies`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formBaby) })
    if (res.ok) { setCreated(true); setFormBaby({ name: '', gender: 'male', birth_date: '' }); fetchBabies(); setTimeout(()=>setCreated(false), 2000) }
  }

  const submitMilestone = async (e) => {
    e.preventDefault()
    const res = await fetch(`${baseUrl}/api/milestones`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formMilestone) })
    if (res.ok) { setCreated(true); setFormMilestone({ ...formMilestone, title: '', date_achieved: '', description: '' }); setTimeout(()=>setCreated(false), 2000) }
  }

  const submitGrowth = async (e) => {
    e.preventDefault()
    const payload = { ...formGrowth }
    ;['weight_kg','height_cm','head_circumference_cm'].forEach(k => {
      if (payload[k] === '') payload[k] = null; else payload[k] = parseFloat(payload[k])
    })
    const res = await fetch(`${baseUrl}/api/growth`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) { setCreated(true); setFormGrowth({ ...formGrowth, date_recorded: '', weight_kg: '', height_cm: '', head_circumference_cm: '' }); setTimeout(()=>setCreated(false), 2000) }
  }

  return (
    <section id="create" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Catatan Cepat</h2>
        {created && (
          <div className="mb-4 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <CheckCircle2 size={18}/> Tersimpan!
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Baby */}
          <form onSubmit={submitBaby} className="p-5 rounded-xl border border-gray-200 bg-white">
            <div className="font-semibold mb-3">Tambah Profil Bayi</div>
            <input className="w-full mb-2 px-3 py-2 border rounded-lg" placeholder="Nama" value={formBaby.name} onChange={e=>setFormBaby({...formBaby, name: e.target.value})} required />
            <select className="w-full mb-2 px-3 py-2 border rounded-lg" value={formBaby.gender} onChange={e=>setFormBaby({...formBaby, gender: e.target.value})}>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
            <input type="date" className="w-full mb-3 px-3 py-2 border rounded-lg" value={formBaby.birth_date} onChange={e=>setFormBaby({...formBaby, birth_date: e.target.value})}/>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 flex items-center justify-center gap-2"><Plus size={18}/> Simpan</button>
          </form>

          {/* Milestone */}
          <form onSubmit={submitMilestone} className="p-5 rounded-xl border border-gray-200 bg-white">
            <div className="font-semibold mb-3">Catat Tonggak</div>
            <select className="w-full mb-2 px-3 py-2 border rounded-lg" value={formMilestone.baby_id} onChange={e=>setFormMilestone({...formMilestone, baby_id: e.target.value})}>
              <option value="">Pilih Bayi</option>
              {babies.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <input className="w-full mb-2 px-3 py-2 border rounded-lg" placeholder="Judul (mis. Pertama kali merangkak)" value={formMilestone.title} onChange={e=>setFormMilestone({...formMilestone, title: e.target.value})} required />
            <input type="date" className="w-full mb-3 px-3 py-2 border rounded-lg" value={formMilestone.date_achieved} onChange={e=>setFormMilestone({...formMilestone, date_achieved: e.target.value})}/>
            <textarea className="w-full mb-3 px-3 py-2 border rounded-lg" placeholder="Deskripsi" value={formMilestone.description} onChange={e=>setFormMilestone({...formMilestone, description: e.target.value})}/>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 flex items-center justify-center gap-2"><Plus size={18}/> Simpan</button>
          </form>

          {/* Growth */}
          <form onSubmit={submitGrowth} className="p-5 rounded-xl border border-gray-200 bg-white">
            <div className="font-semibold mb-3">Catat Pertumbuhan</div>
            <select className="w-full mb-2 px-3 py-2 border rounded-lg" value={formGrowth.baby_id} onChange={e=>setFormGrowth({...formGrowth, baby_id: e.target.value})}>
              <option value="">Pilih Bayi</option>
              {babies.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <div className="grid grid-cols-3 gap-2">
              <input type="date" className="px-3 py-2 border rounded-lg" value={formGrowth.date_recorded} onChange={e=>setFormGrowth({...formGrowth, date_recorded: e.target.value})}/>
              <input type="number" step="0.1" className="px-3 py-2 border rounded-lg" placeholder="Berat (kg)" value={formGrowth.weight_kg} onChange={e=>setFormGrowth({...formGrowth, weight_kg: e.target.value})}/>
              <input type="number" step="0.1" className="px-3 py-2 border rounded-lg" placeholder="Tinggi (cm)" value={formGrowth.height_cm} onChange={e=>setFormGrowth({...formGrowth, height_cm: e.target.value})}/>
            </div>
            <input type="number" step="0.1" className="w-full mt-2 px-3 py-2 border rounded-lg" placeholder="Lingkar kepala (cm)" value={formGrowth.head_circumference_cm} onChange={e=>setFormGrowth({...formGrowth, head_circumference_cm: e.target.value})}/>
            <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 flex items-center justify-center gap-2"><Plus size={18}/> Simpan</button>
          </form>
        </div>
      </div>
    </section>
  )
}
