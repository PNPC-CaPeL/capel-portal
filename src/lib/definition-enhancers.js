import findObject from './find-object';

export const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);

export const withSkills = (skills = []) => definition => {
  const skillsNode = findObject(definition, 'name', 'Niveau');
  skillsNode.forEach(node => {
    // eslint-disable-next-line no-param-reassign
    node.block.buttons = skills.map(({ title }, index) => ({ name: title, id: index + 1 }));
  });

  return definition;
};

export const withDivings = (divings = []) => definition => {
  const divingsNode = findObject(definition, 'name', 'Type');
  divingsNode.forEach(node => {
    // eslint-disable-next-line no-param-reassign
    node.block.buttons = divings.map(({ title }, index) => ({ name: title, id: index + 1 }));
  });

  return definition;
};

export const withCadres = (cadres = []) => definition => {
  const cadresNode = findObject(definition, 'name', 'Cadre');
  cadresNode.forEach(node => {
    // eslint-disable-next-line no-param-reassign
    node.block.options = cadres.map(({ title }, index) => ({ name: title, id: `id${index + 1}` }));
  });

  return definition;
};

/*
  dropdown/select -> node.block.options
  radio buttons -> node.block.buttons
*/
