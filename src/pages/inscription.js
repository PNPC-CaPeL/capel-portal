import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Link as GatsbyLink } from 'gatsby';
import { Grid, Typography } from '@material-ui/core';
import { ClassicRunner } from 'tripetto-runner-classic';
import { Export } from 'tripetto-runner-foundation';

import { useTheme } from '@material-ui/core/styles';

import Layout from '../components/Layout';

import signup from '../signup.json';

const isLive = typeof window !== 'undefined';
const FallbackComponent = () => <></>;

const SignUpPage = () => {
  const [done, setDone] = React.useState(false);

  const handleFormSubmit = async instance => {
    const { fields } = Export.fields(instance);
    const data = fields.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {});
    const body = JSON.stringify(data, null, 2);

    setDone(true);

    await fetch(process.env.N8N_WEBHOOK_HUB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  };

  const { palette, shape } = useTheme();

  const styles = {
    mode: 'progressive',
    noBranding: true,
    color: palette.primary.main,

    inputs: {
      borderSize: 1,
      roundness: shape.borderRadius,
      textColor: palette.text.primary,
      errorColor: palette.error.main,
      agreeColor: palette.success.main,
      declineColor: palette.error.main,
    },

    buttons: {
      mode: 'fill',
      roundness: shape.borderRadius,
    },
  };

  return (
    <Layout title="Inscription à la plate-forme CaPeL">
      <Grid container justify={done ? 'space-around' : 'space-between'}>
        {done && (
          <Grid item md={5}>
            <Typography variant="h3" paragraph>
              Merci de votre inscription,
            </Typography>

            <Typography variant="body1" paragraph>
              Vous allez recevoir un mail vous invitant à activer votre compte
              et renseigner votre mot de passe.
            </Typography>

            <Typography variant="body1" paragraph>
              Attention, veillez à bien vérifier votre dossier spam
              ou vos outils de filtrage,
              certaines messageries classent automatiquement
              ces mails dedans.
            </Typography>

            <GatsbyLink to="/">Retour à l'accueil</GatsbyLink>

          </Grid>
        )}

        {!done && (
          <>
            <Grid item md={7}>
              <Typography variant="h3" paragraph>
                Inscrivez vous à la plate-forme CaPeL,
              </Typography>

              <Typography variant="body1" paragraph>
                Pour pouvoir déclarer vos plongées,
                ou signer vos règlements,
                vous pouvez créer un compte d'accès à la plate-forme CaPeL.
              </Typography>

              <Typography variant="body1" paragraph>
                Pour cela, nous avons besoin de vos coordonnées mails,
                et si vous êtes un plongeur ou une structure de plongée.
              </Typography>

              <Typography variant="body1" paragraph>
                Une fois votre inscription faite,
                vous recevrez dans votre boîte de messagerie
                les instructions pour finaliser votre inscription.
              </Typography>

            </Grid>

            <Grid item md={4} container>
              <ErrorBoundary FallbackComponent={FallbackComponent}>
                {isLive && (
                  <ClassicRunner
                    definition={signup}
                    styles={styles}
                    onSubmit={handleFormSubmit}
                  />
                )}
              </ErrorBoundary>
            </Grid>
          </>
        )}
      </Grid>
    </Layout>
  );
};

export default SignUpPage;
