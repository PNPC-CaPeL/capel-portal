import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTheme } from '@material-ui/core';

import { ClassicRunner } from 'tripetto-runner-classic';
// import { ClassicRunner } from 'tripetto-runner-classic/runner/es6';

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
    'runner#1|🆗 Buttons\u0004Back': [null, 'Précédent'],
    'runner#1|🆗 Buttons\u0004Next': [null, 'Suivant'],
    'runner#1|🆗 Buttons\u0004Reload': [null, 'Recharger'],
    'runner#1|🆗 Buttons\u0004Retry': [null, 'Re-essayer'],
    'runner#1|🆗 Buttons\u0004Start': [null, 'Démarrer'],
    'runner#1|🆗 Buttons\u0004Start again': [null, 'Redémarrer'],
    'runner#1|🆗 Buttons\u0004Submit': [null, 'Envoyer'],
  },
};

const FallbackComponent = () => <></>;

const TripettoForm = ({
  form,
  endpoint,
  enhanceDefinition = def => def,
  ...rest
}) => {
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
    color: theme.palette.primary.main,

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
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <ClassicRunner
        definition={enhanceDefinition(definitions[form])}
        styles={styles}
        onSubmit={handleFormSubmit}
        l10n={l10n}
        {...rest}
      />
    </ErrorBoundary>
  );
};

export default TripettoForm;
