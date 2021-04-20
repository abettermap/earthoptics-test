import React, { FC, CSSProperties } from 'react'

import { MapCtrlPanelProps, GetCtrlPanelStyle } from './types'

const getCtrlPanelStyle: GetCtrlPanelStyle = (position) => {
  let placement: CSSProperties

  if (position === 'top-left') placement = { top: 0, left: 0 }
  else if (position === 'top-right') placement = { top: 0, right: 0 }
  // Stay above MB logo/attribution/etc.
  else if (position === 'bottom-right') placement = { bottom: 32, right: 0 }
  else placement = { bottom: 32, left: 0 }

  return placement
}

export const MapCtrlPanel: FC<MapCtrlPanelProps> = (props) => {
  const { position, children, className } = props
  const style = getCtrlPanelStyle(position)

  return (
    <div style={style} className={`map-ctrl-panel ${className}`}>
      {children}
    </div>
  )
}
