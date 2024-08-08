import { useState } from 'react'
import './App.css'
import CardsFlash from './components/CardsFlash'

const App = () => {



  return (
    <div className="App">
      <div className="header">
        <h2>The Crystal Master 💎</h2>
        <h3>Are you worthy of being in the presence of high vibrational Crystals? 🔮😉 Test your Crystal knowledge</h3>
        <h5>Card Amount: 9</h5>
      </div>
      <CardsFlash />
    </div>
  )
}

export default App