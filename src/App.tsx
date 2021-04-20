import React, { FC } from 'react'

import './App.css'
import { Map } from './components/Map'

const App: FC = () => {
  return (
    <div className="app">
      <header className="page-header">
        <h1>Front-end Developer Technical Exercise</h1>
        <p>EarthOptics</p>
      </header>
      <Map />
    </div>
  )
}

export default App
