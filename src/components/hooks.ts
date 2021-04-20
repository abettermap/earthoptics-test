import { useEffect } from 'react'
import { useQuery } from 'react-query'

import { sources } from './config'
import { UseBaseMap, UseDataLayer, UseMockQuery } from './types'

// Fetch the mock API data, then flip the lat/lon so MB can use it.
export const useMockQuery: UseMockQuery = (showData) => {
  const { isLoading, error, data } = useQuery<GeoJSON.MultiPoint>('data', () =>
    fetch(sources.data).then(res =>
      res.json()
    ), {
    enabled: showData
  }
  )

  if (isLoading || error || !data) return null

  return {
    ...data,
    coordinates: data.coordinates.map(([x, y]) => [y, x]) // MB reverses them
  }
}

export const useDataLayer: UseDataLayer = (showData, mapLoaded, map) => {
  useEffect(() => {
    if (!map || !mapLoaded) return

    if (showData) {
      map?.addLayer({
        id: 'data-layer',
        type: 'circle',
        source: 'data-source',
        paint: {
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white',
        },
      })
    } else {
      if (map?.getLayer('data-layer')) map?.removeLayer('data-layer')
    }
    // return () => map?.removeLayer('layer-id') // TODO: cleanup?
  }, [mapLoaded, showData])
}

export const useBaseMap: UseBaseMap = (basemap, mapLoaded, map) => {
  useEffect(() => {
    if (!map || !mapLoaded) return

    if (basemap === 'ndvi') {
      map?.addLayer({
        id: 'ndvi-layer',
        type: 'raster',
        source: 'ndvi-source',
        paint: {},
      })
    } else {
      if (map?.getLayer('ndvi-layer')) map?.removeLayer('ndvi-layer')
    }
    // return () => map?.removeLayer('layer-id') // TODO: cleanup?
  }, [mapLoaded, basemap, map])
}