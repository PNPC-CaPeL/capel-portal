import type { PathOptions } from 'leaflet'
import type { SVGAttributes } from 'vue'

export const getPathOptions = function (style: string): PathOptions {
  switch (style) {
    case 'rouge':
      return {
        color: 'red',
        stroke: true,
        fill: true,
        weight: 1,
        fillOpacity: 0.5,
      }
    case 'rouge-pointille':
      return {
        color: 'red',
        stroke: true,
        fill: true,
        weight: 1.5,
        dashArray: '10',
        fillOpacity: 0.1,
      }
    case 'orange-pointille':
      return {
        color: '#e8473d',
        stroke: true,
        fill: true,
        weight: 2,
        dashArray: '3 5',
        fillOpacity: 0.1,
      }
    case 'rouge-contour':
      return {
        color: 'red',
        stroke: true,
        fill: true,
        weight: 1,
        fillOpacity: 0,
      }
    case 'orange':
      return {
        color: 'orange',
        stroke: true,
        fill: true,
        weight: 1,
        fillOpacity: 0.2,
      }
    case 'vert-contour':
      return {
        color: '#7cbba3',
        stroke: true,
        fill: true,
        weight: 1,
        opacity: 0.6,
        fillOpacity: 0,
      }
    case 'bleu-epais':
      return {
        color: 'blue',
        stroke: true,
        fill: true,
        weight: 12,
        opacity: 0.05,
        fillOpacity: 0,
      }
    case 'bleu':
      return {
        color: '#0000dd',
        stroke: true,
        fill: true,
        weight: 5,
        opacity: 0.05,
        fillOpacity: 0.03,
      }
    default:
      return {}
  }
}

export const getSvgPathOptions = function (style: string): SVGAttributes {
  const options = getPathOptions(style)

  const attributes = {} as SVGAttributes

  if (options.stroke) {
    attributes.stroke = options.color

    attributes['stroke-opacity'] = options.opacity
    attributes['stroke-width'] = options.weight
    attributes['stroke-linecap'] = options.lineCap
    attributes['stroke-linejoin'] = options.lineJoin

    if (options.dashArray) {
      attributes['stroke-dasharray'] =
        typeof options.dashArray === 'string'
          ? options.dashArray
          : options.dashArray.join(' ')
    } else {
      delete attributes['stroke-dasharray']
    }

    if (options.dashOffset) {
      attributes['stroke-dashoffset'] = options.dashOffset
    } else {
      delete attributes['stroke-dashoffset']
    }
  } else {
    attributes.stroke = 'none'
  }

  if (options.fill) {
    attributes.fill = options.fillColor || options.color
    attributes['fill-opacity'] = options.fillOpacity
    attributes['fill-rule'] = options.fillRule || 'evenodd'
  } else {
    attributes.fill = 'none'
  }

  return attributes
}
