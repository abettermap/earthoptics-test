export const MAPBOX_TOKEN = process.env.REACT_APP_MB_TOKEN as string

export const defaults = {
  lat: 42.704868874031554,
  lng: -92.65880554936408,
  zoom: 13
}

export const sources = {
  ndvi: 'https://tiles.earthoptics.com/ndvi/{z}/{x}/{y}.png',
  data: 'https://gxlu1hg02b.execute-api.us-east-1.amazonaws.com/default/mockGeoJSONAPI'
}