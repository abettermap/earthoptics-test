import React, { FC } from 'react'

import { MapCtrlPanel } from './MapCtrlPanel'
import { ZoomSliderProps } from './types'

export const ZoomSlider: FC<ZoomSliderProps> = (props) => {
  const { zoom, mapRef } = props
  const MIN = 10
  const MAX = 16

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const map = mapRef.current

    if (!map || !map.loaded()) return

    map.setZoom(parseInt(e.target.value, 10))
  }

  return (
    <MapCtrlPanel position="top-right" className="zoom-slider">
      <input
        type="range"
        value={zoom}
        min={MIN}
        max={MAX}
        onChange={handleChange}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        orient="vertical"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{MIN}</span>
        <span>{MAX}</span>
      </div>
      <div style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>Zoom level</div>
    </MapCtrlPanel>
  )
}
