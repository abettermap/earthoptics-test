export type Basemap = 'sat' | 'ndvi'

export type UseBaseMap = (
  basemap: Basemap, mapLoaded: boolean, map: mapboxgl.Map | null
) => void

export type UseDataLayer = (
  showDataLayer: boolean, mapLoaded: boolean, map: mapboxgl.Map | null
) => void

export type UseFetch<T> = (url: string, enabled?: boolean) => T

export type UseMockQuery = (showData: boolean) => GeoJSON.MultiPoint | null