import { useEffect } from 'react'
import { useQuery } from 'react-query'

import { sources } from './config'
import { UseBaseMap, UseDataLayer, UseMockQuery } from './types'

// Fetch the mock API data, then flip the lat/lon so MB can use it.
export const useMockQuery: UseMockQuery = () => {
  const { isLoading, error, data } = useQuery<GeoJSON.MultiPoint>('data', () =>
    fetch(sources.data).then(res =>
      res.json()
    )
  )

  if (isLoading || error || !data) return null

  return {
    ...data,
    coordinates: data.coordinates.map(([x, y]) => [y, x]) // MB reverses them
  }
}

export const useDataLayer: UseDataLayer = (showData, mapLoaded, mapRef) => {
  const featGeometry = useMockQuery()

  useEffect(() => {
    const map = mapRef.current

    if (!map || !map.loaded()) return

    if (featGeometry && !map.getLayer('data-layer') && !map.getSource('data-source')) {
      map.addSource('data-source', {
        type: 'geojson',
        // NOTE: I was expecting full valid GeoJSON from the mock API, but it is
        // only the geometry of a single feature so I coded it based on that.
        data: {
          type: 'Feature',
          geometry: featGeometry,
          properties: {},
        }
      })

      map.addLayer({
        id: 'data-layer',
        type: 'circle',
        source: 'data-source',
        paint: {
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white',
        },
        layout: {
          visibility: 'none'
        }
      })
    } else {
      const visibility = showData ? 'visible' : 'none'

      map.setLayoutProperty('data-layer', 'visibility', visibility)
    }
  }, [showData, featGeometry])

  useEffect(() => {
    const map = mapRef.current

    if (!map || !mapLoaded || !map.getLayer('data-layer')) return

    const visibility = showData ? 'visible' : 'none'

    map.setLayoutProperty('data-layer', 'visibility', visibility)
  }, [showData, featGeometry, mapLoaded])
}

export const useBaseMap: UseBaseMap = (basemap, mapLoaded, mapRef) => {
  useEffect(() => {
    const map = mapRef.current

    if (!map || !mapLoaded || map.getLayer('ndvi-layer')) return

    // TODO: TSify sources, layer IDs, etc.
    map.addSource('ndvi-source', {
      type: 'raster',
      tiles: [sources.ndvi],
    })

    map.addLayer({
      id: 'ndvi-layer',
      type: 'raster',
      source: 'ndvi-source',
      paint: {},
      layout: { visibility: 'none' },
    })
  }, [mapLoaded, basemap, mapRef.current])

  useEffect(() => {
    const map = mapRef.current

    if (!map || !mapLoaded || !map.getLayer('ndvi-layer')) return

    const visibility = basemap === 'ndvi' ? 'visible' : 'none'

    map.setLayoutProperty('ndvi-layer', 'visibility', visibility)
  }, [basemap, mapRef.current])
}