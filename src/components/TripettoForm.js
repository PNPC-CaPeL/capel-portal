import React from 'react';
import { Box, useTheme } from '@material-ui/core';

import { ClassicRunner } from 'tripetto-runner-classic';
import { Export } from 'tripetto-runner-foundation';

import * as definitions from '../forms';

const l10n = {
  locale: 'auto',
  contract: {
    name: 'tripetto-runner-classic',
    version: '1.10.4',
  },
  translations: {
    '': { language: 'fr' },
    'runner#1|🆗 Buttons\u0004Submit': [null, 'Signer'],
  },
};

const TripettoForm = ({ form, endpoint, ...rest }) => {
  const theme = useTheme();

  const handleFormSubmit = async instance => {
    const { fields } = Export.fields(instance);
    const data = fields.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {});
    const body = JSON.stringify(data, null, 2);

    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  };

  const styles = {
    mode: 'progressive',
    noBranding: true,
    contract: { name: 'tripetto-runner-classic', version: '1.9.1' },

    color: theme.palette.primary.main,

    // font: {
    //   size: theme.typography.fontSize,
    //   family: theme.typography.fontFamily.split(',').shift(),
    // },

    inputs: {
      borderSize: 1,
      roundness: theme.shape.borderRadius,
      textColor: theme.palette.text.primary,
      errorColor: theme.palette.error.main,
      agreeColor: theme.palette.success.main,
      declineColor: theme.palette.error.main,
    },

    buttons: {
      mode: 'fill',
      roundness: theme.shape.borderRadius,
    },
  };

  if (typeof window === 'undefined' || !form || !endpoint) { return null; }

  return (
    <ClassicRunner
      definition={definitions[form]}
      styles={styles}
      onSubmit={handleFormSubmit}
      l10n={l10n}
    />
  );
};

export default TripettoForm;
