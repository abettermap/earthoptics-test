import React, { FC, useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { defaults, sources, MAPBOX_TOKEN } from './config'
import { Basemap } from './types'
import { LayerSwitcher } from './LayerSwitcher'

mapboxgl.accessToken = MAPBOX_TOKEN

// CRED: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
export const Map: FC = () => {
  const mapContainer: React.RefObject<HTMLDivElement> = useRef(null)
  const mapRef = React.useRef<mapboxgl.Map | null>(null)

  const [lng, setLng] = useState<number>(defaults.lng)
  const [lat, setLat] = useState<number>(defaults.lat)
  const [zoom, setZoom] = useState<number>(defaults.zoom)
  const [showData, setShowData] = useState<boolean>(true)
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)
  const [basemap, setBasemap] = useState<Basemap>('sat')

  useEffect(() => {
    if (!mapContainer.current) return

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng, lat],
      zoom: zoom,
    })

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
      map.addSource('ndvi-source', {
        type: 'raster',
        tiles: [sources.ndvi],
      })

      setMapLoaded(true)
    })

    mapRef.current = map

    return () => map.remove()
  }, [])

  useEffect(() => {
    const map = mapRef?.current

    if (!map || !mapLoaded) return

    if (basemap === 'ndvi') {
      map.addLayer({
        id: 'ndvi-layer',
        type: 'raster',
        source: 'ndvi-source',
        paint: {},
      })
    } else {
      if (map.getLayer('ndvi-layer')) map.removeLayer('ndvi-layer')
    }
    // TODO: cleanup?
    // return () => map.removeSource('ndvi-source')
  }, [mapLoaded, basemap])

  return (
    <div className="map-wrap">
      <LayerSwitcher
        showData={showData}
        setShowData={setShowData}
        basemap={basemap}
        setBasemap={setBasemap}
      />
      <div className="map-container" ref={mapContainer} />
    </div>
  )
}
