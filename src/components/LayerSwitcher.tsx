import React, { FC } from 'react'

import { MapCtrlPanel } from './MapCtrlPanel'
import { Basemap } from './types'

type LayerSwitcherProps = {
  basemap: Basemap
  showData: boolean
  setShowData: React.Dispatch<boolean>
  setBasemap: React.Dispatch<Basemap>
}

export const LayerSwitcher: FC<LayerSwitcherProps> = (props) => {
  const { basemap, setBasemap, setShowData, showData } = props

  const handleBasemapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasemap(e.target.value as Basemap)
  }

  return (
    <MapCtrlPanel position="bottom-right">
      <div className="layer-switcher">
        <input
          type="radio"
          name="layer-switcher"
          id="sat-basemap"
          value="sat"
          checked={basemap === 'sat'}
          onChange={handleBasemapChange}
        />
        <label htmlFor="sat-basemap">Satellite</label>
        <input
          type="radio"
          name="layer-switcher"
          id="ndvi-basemap"
          value="ndvi"
          checked={basemap === 'ndvi'}
          onChange={handleBasemapChange}
        />
        <label htmlFor="ndvi-basemap">NDVI</label>
        <input
          type="checkbox"
          name="toggle-data"
          id="toggle-data"
          checked={showData}
          onChange={(e) => {
            setShowData(e.target.checked)
          }}
        />
        <label htmlFor="toggle-data">Show data layer</label>
      </div>
    </MapCtrlPanel>
  )
}
