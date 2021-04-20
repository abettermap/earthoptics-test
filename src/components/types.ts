import React, { CSSProperties } from "react"

export type Basemap = 'sat' | 'ndvi'
export type MapRef = React.RefObject<mapboxgl.Map | null>

export type UseBaseMap = (
  basemap: Basemap, mapLoaded: boolean, mapRef: MapRef
) => void

export type UseDataLayer = (
  showDataLayer: boolean, mapLoaded: boolean, mapRef: MapRef
) => void

export type UseFetch<T> = (url: string, enabled?: boolean) => T

export type UseMockQuery = () => GeoJSON.MultiPoint | null

export type CtrlPanelPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type MapCtrlPanelProps = {
  position: CtrlPanelPosition
  className?: string
}

export type GetCtrlPanelStyle = (position: CtrlPanelPosition) => CSSProperties

export type ZoomSliderProps = {
  zoom: number
  mapRef: MapRef
}
