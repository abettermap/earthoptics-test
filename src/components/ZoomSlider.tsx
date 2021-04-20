import React, { FC } from 'react'

import { MapCtrlPanel } from './MapCtrlPanel'
import { ZoomSliderProps } from './types'

export const ZoomSlider: FC<ZoomSliderProps> = (props) => {
  const { zoom, mapRef } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const map = mapRef.current

    if (!map || !map.loaded()) return

    map.setZoom(parseInt(e.target.value, 10))
  }

  return (
    <MapCtrlPanel position="top-right">
      <input
        type="range"
        value={zoom}
        min={10}
        max={16}
        onChange={handleChange}
      />
    </MapCtrlPanel>
  )
}
