import React, { FC, useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { defaults, sources, MAPBOX_TOKEN } from './config'
import { Basemap } from './types'
import { LayerSwitcher } from './LayerSwitcher'
import { useBaseMap, useDataLayer, useMockQuery } from './hooks'

mapboxgl.accessToken = MAPBOX_TOKEN

// CRED: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
export const Map: FC = () => {
  const mapContainer: React.RefObject<HTMLDivElement> = useRef(null)
  const mapRef = React.useRef<mapboxgl.Map | null>(null)

  // NOTE: would normally use `useReducer` for these, but in interest of time...
  const [lng, setLng] = useState<number>(defaults.lng)
  const [lat, setLat] = useState<number>(defaults.lat)
  const [zoom, setZoom] = useState<number>(defaults.zoom)
  const [showDataLayer, setShowDataLayer] = useState<boolean>(false)
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)
  const [basemap, setBasemap] = useState<Basemap>('sat')
  const featGeometry = useMockQuery(showDataLayer)

  useBaseMap(basemap, mapLoaded, mapRef.current)
  useDataLayer(showDataLayer, mapLoaded, mapRef.current)

  useEffect(() => {
    if (!mapContainer.current) return

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng, lat],
      zoom: zoom,
    })

    mapRef.current = map // easy access for the hooks, etc.

    map.on('move', () => {
      // TODO: why is `getCenter` considered a string??
      /* eslint-disable @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      setLng(map.getCenter().lng.toFixed(4))
      // @ts-ignore
      setLat(map.getCenter().lat.toFixed(4))
      // @ts-ignore
      setZoom(map.getZoom().toFixed(2))
      /* eslint-enable @typescript-eslint/ban-ts-comment */
    })

    map.on('load', () => {
      // TODO: TSify sources, layer IDs, etc.
      map.addSource('data-source', {
        type: 'geojson',
        // NOTE: I was expecting full valid GeoJSON from the mock API, but it is
        // only the geometry of a single feature so I coded it based on that.
        data: featGeometry
          ? {
              type: 'Feature',
              geometry: featGeometry,
              properties: {},
            }
          : undefined,
      })

      map.addSource('ndvi-source', {
        type: 'raster',
        tiles: [sources.ndvi],
      })

      setMapLoaded(true) // can't do a whole lot until it's loaded
    })

    return () => map.remove() // cleanup
  }, [])

  return (
    <div className="map-wrap">
      <LayerSwitcher
        showData={showDataLayer}
        setShowData={setShowDataLayer}
        basemap={basemap}
        setBasemap={setBasemap}
      />
      <div className="map-container" ref={mapContainer} />
    </div>
  )
}
