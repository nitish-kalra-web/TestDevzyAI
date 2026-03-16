import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import PowerConsumptionChart from './components/PowerConsumptionChart'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="ticks"></div>
      <section id="power-chart-section">
        <PowerConsumptionChart />
      </section>
      <div className="ticks"></div>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
