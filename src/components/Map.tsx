import React, { FC, useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export const MAPBOX_TOKEN = process.env.REACT_APP_MB_TOKEN as string

mapboxgl.accessToken = MAPBOX_TOKEN

// CRED: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
export const Map: FC = () => {
  const mapContainer: React.RefObject<HTMLDivElement> = useRef(null)

  const [lng, setLng] = useState<number>(-92.65880554936408)
  const [lat, setLat] = useState<number>(42.704868874031554)
  const [zoom, setZoom] = useState<number>(13)

  useEffect(() => {
    if (!mapContainer.current) return

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
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

    return () => map.remove()
  }, [])

  return (
    <div className="map-wrap">
      <div className="map-container" ref={mapContainer} />
    </div>
  )
}
