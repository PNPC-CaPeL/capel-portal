export const style2svg = ({ fill, stroke, ...options }) => {
  const style = {};

  if (stroke) {
    style.stroke = options.color;

    style.strokeOpacity = options.opacity;
    style.strokeWidth = options.weight;
    style.strokeLinecap = options.lineCap;
    style.strokeLinejoin = options.lineJoin;

    if (options.dashArray) {
      style.strokeDasharray = options.dashArray;
    } else {
      delete style.strokeDasharray;
    }

    if (options.dashOffset) {
      style.strokeDashoffset = options.dashOffset;
    } else {
      delete style.strokeDashoffset;
    }
  } else {
    style.stroke = 'none';
  }

  if (fill) {
    style.fill = options.fillColor || options.color;
    style.fillOpacity = options.fillOpacity;
    style.fillRule = options.fillRule || 'evenodd';
  } else {
    style.fill = 'none';
  }

  return style;
};

export default style2svg;
