import findObject from './find-object';

export const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);

export const withSkills = (skills = []) => definition => {
  const skillsNode = findObject(definition, 'name', 'Niveau');
  skillsNode.forEach(node => {
    // eslint-disable-next-line no-param-reassign
    node.block.buttons = skills.map(({ skill }, index) => ({ name: skill, id: index + 1 }));
  });

  return definition;
};

export const withDivings = (divings = []) => definition => {
  const divingsNode = findObject(definition, 'name', 'Type');
  divingsNode.forEach(node => {
    // eslint-disable-next-line no-param-reassign
    node.block.buttons = divings.map(({ diving }, index) => ({ name: diving, id: index + 1 }));
  });

  return definition;
};

export const withCadres = (cadres = []) => definition => {
  const cadresNode = findObject(definition, 'name', 'Cadre');
  cadresNode.forEach(node => {
    // eslint-disable-next-line no-param-reassign
    node.block.options = cadres.map(({ cadre }, index) => ({ name: cadre, id: `id${index + 1}` }));
  });

  return definition;
};

export const withStructures = (structures = []) => definition => {
  const structuresNode = findObject(definition, 'name', 'Structure');
  structuresNode
    .filter(node => (node?.block?.type === 'tripetto-block-dropdown'))
    .forEach(node => {
      // eslint-disable-next-line no-param-reassign
      node.block.options = structures.map((structure, index) => ({ name: structure, id: `id${index + 1}` }));
    });

  return definition;
};

/*
  dropdown/select -> node.block.options
  radio buttons -> node.block.buttons
*/
