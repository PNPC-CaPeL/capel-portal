/* eslint-disable arrow-body-style */

// https://leafletjs.com/reference-1.7.1.html#path-option
export const styles = [
  [
    { protection: 'Plongée interdite' },
    { color: 'red', stroke: false, fillOpacity: 0.5 },
  ],
  [
    { protection: 'Plongée interdite du 1er avril au 30 septembre' },
    { color: 'red', weight: 3, dashArray: '10', fillOpacity: 0.1 },
  ],
  [
    { protection: 'Accostage, ammarage et débarquement interdits' },
    { color: 'red', weight: 2, fillOpacity: 0.1 },
  ],
  [
    { protection: 'Mouillage interdit sauf sur dispositif de plongée' },
    { color: 'orange', weight: 2, fillOpacity: 0.2 },
  ],
  [
    { protection: 'Plongée soumise à autorisation' },
    { stroke: false, fill: false },
    // { color: 'orange', weight: 3, dashArray: '10', fillOpacity: 0.2 },
  ],
];

export const styleFromProperties = properties => {
  const [, style] = styles.find(([props]) => {
    return Object.entries(props).every(([key, value]) => properties[key] === value);
  });

  return style;
};

export default {};
