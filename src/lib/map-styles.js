// https://leafletjs.com/reference-1.7.1.html#path-option
export const styles = [
  [
    { protection: 'Plongée interdite' },
    { color: 'red', stroke: true, fill: true, weight: 1, fillOpacity: 0.5 },
  ],
  [
    { protection: 'Plongée interdite du 1er avril au 30 septembre' },
    { color: 'red', stroke: true, fill: true, weight: 1.5, dashArray: '10', fillOpacity: 0.1 },
  ],
  [
    { protection: 'Plongée interdite du 1er Avril au 30 octobre' },
    { color: '#e8473d', stroke: true, fill: true, weight: 2, dashArray: '3 5', fillOpacity: 0.1 },
  ],
  [
    { protection: 'Accostage, ammarage et débarquement interdits' },
    { color: 'red', stroke: true, fill: true, weight: 1, fillOpacity: 0 },
  ],
  [
    { protection: 'Mouillage interdit sauf sur dispositif de plongée' },
    { color: 'orange', stroke: true, fill: true, weight: 1, fillOpacity: 0.2 },
  ],
  [
    { protection: 'Plongée soumise à autorisation' },
    { color: '#7cbba3', stroke: true, fill: false, weight: 1, strokeOpacity: 0.6 },
  ],
];

export const stylesByProtection = styles.reduce(
  (acc, [{ protection }, style]) => ({ ...acc, [protection]: style }),
  {},
);

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
