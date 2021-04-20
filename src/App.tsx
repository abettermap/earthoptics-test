import React, { FC } from 'react'

import './App.css'
import { Map } from './components/Map'
import { MapCtrlPanel } from './components/MapCtrlPanel'

const App: FC = () => {
  return (
    <div className="app">
      <MapCtrlPanel position="top-left">
        <header className="page-header">
          <h1>Technical Exercise</h1>
          <p>Front-end Developer @ EarthOptics</p>
        </header>
      </MapCtrlPanel>
      <Map />
    </div>
  )
}

export default App
