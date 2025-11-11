import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Forms from './components/Forms'
import Dashboard from './components/Dashboard'

function App() {
  const [tab, setTab] = useState('home')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 text-gray-900">
      <Navbar current={tab} onChange={setTab} />
      {tab === 'home' && (
        <>
          <Hero />
          <Features />
          <Forms />
          <Dashboard />
        </>
      )}
      {tab === 'babies' && (
        <>
          <Forms />
          <Dashboard />
        </>
      )}
      {tab === 'milestones' && (
        <>
          <Forms />
          <Dashboard />
        </>
      )}
      {tab === 'growth' && (
        <>
          <Forms />
          <Dashboard />
        </>
      )}
      <footer className="py-10 text-center text-sm text-gray-500">Dibuat untuk memantau perkembangan si kecil dengan penuh cinta ❤️</footer>
    </div>
  )
}

export default App
