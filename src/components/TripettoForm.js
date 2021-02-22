import React from 'react';

import Services from 'tripetto-services';
import { run } from 'tripetto-runner-classic';

import { useTheme } from '@material-ui/core';

const TripettoForm = ({ token }) => {
  const formWrapper = React.useRef(null);
  const theme = useTheme();

  React.useEffect(() => {
    if (!formWrapper || typeof window === 'undefined') return;

    const {
      attachments,
      onSubmit,

      definition,
      styles,
      l10n,
      locale,
      translations,
    } = (typeof window !== 'undefined' && token) ? Services.init({ token }) : {};

    run({
      element: formWrapper.current,
      definition,
      styles: {
        ...styles,

        mode: 'progressive',
        noBranding: true,
        contract: { name: 'tripetto-runner-classic', version: '1.9.1' },

        color: theme.palette.primary.main,

        font: {
          size: theme.typography.fontSize,
          family: theme.typography.fontFamily.split(',').shift(),
        },

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
      },

      l10n,
      locale,
      translations,
      attachments,
      onSubmit,
    });
  }, [formWrapper, theme, token]);

  return (
    <div ref={formWrapper} />
  );
};

export default TripettoForm;
