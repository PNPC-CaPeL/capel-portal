import React from 'react';

import { FormControlLabel, Switch, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: 0,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
    '&:hover': { opacity: 1 },
  },
  label: {
    fontSize: '0.9rem',
  },
}));

const SaveFormState = ({ checked, onChange, ...props }) => {
  const classes = useStyles();

  return (
    <Tooltip
      title="À la validation du formulaire, les champs seront mémorisés, et pré-rempliront votre prochaine saisie."
    >
      <FormControlLabel
        control={<Switch size="small" checked={checked} onChange={onChange} />}
        labelPlacement="end"
        classes={classes}
        {...props}
      />
    </Tooltip>
  );
};

export default SaveFormState;
