import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as GatsbyLink } from 'gatsby';

import Layout from '../components/Layout';

const useStyles = makeStyles(theme => ({
  root: {
    'text-align': 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
    '& .MuiInput-root': {
      width: '100%',
    },
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const SignUpPage = () => {
  const classes = useStyles();

  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorSubmitting, setErrorSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorHelperEmail, setErrorHelperEmail] = useState('');
  const [type, setType] = useState('');
  const [structureName, setStructureName] = useState('');
  const [errorStructureName, setErrorStructureName] = useState(false);

  async function onSubmitForm (e) {
    e.preventDefault();

    setErrorName(false);
    setErrorEmail(false);
    setErrorHelperEmail('');
    setErrorStructureName(false);
    setErrorSubmitting(false);

    let haveAtLeastAnError = false;
    if (!name) {
      haveAtLeastAnError = true;
      setErrorName(true);
    }
    if (!email) {
      haveAtLeastAnError = true;
      setErrorEmail(true);
    } else if (!validateEmail(email)) {
      haveAtLeastAnError = true;
      setErrorEmail(true);
      setErrorHelperEmail('Votre e-mail est invalide.');
    }
    if (type === 'SP' && !structureName) {
      haveAtLeastAnError = true;
      setErrorStructureName(true);
    }

    if (haveAtLeastAnError) return;

    setSubmitting(true);
    /**
     * Build the data object to send to n8n
     */
    const response = await fetch(process.env.N8N_WEBHOOK_HUB_URL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        type,
        structureName,
        formId: 'capel-form-signup',
      }),
      method: 'POST',
    });
    setSubmitting(false);
    // response.ok tells us if the fetch response is a 2xx one
    setSuccess(response.ok);
    setErrorSubmitting(!response.ok);
  }

  return (
    <Layout title="Inscription à la plate-forme CaPeL">
      <Grid container justify={success ? 'space-around' : 'space-between'}>
        {
          success && (
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
          )
        }

        {
          !success && (
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
              <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmitForm}>
                <TextField
                  required
                  label="Identité"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={submitting}
                  error={errorName}
                />
                <TextField
                  required
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={submitting}
                  error={errorEmail}
                  helperText={errorHelperEmail}
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Type de compte</FormLabel>
                  <RadioGroup
                    value={type}
                    onChange={e => setType(e.target.value)}
                  >
                    <FormControlLabel
                      value="SP"
                      control={<Radio />}
                      label="Structure de plongée"
                      disabled={submitting}
                    />
                    <FormControlLabel
                      value="PI"
                      control={<Radio />}
                      label="Plongeur individuel"
                      disabled={submitting}
                    />
                  </RadioGroup>
                </FormControl>

                {
                  type === 'SP'
                  && (
                  <TextField
                    required
                    label="Nom de la structure"
                    type="text"
                    value={structureName}
                    onChange={e => setStructureName(e.target.value)}
                    disabled={submitting}
                    error={errorStructureName}
                  />
                  )
                }
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? 'Inscription en cours...' : 'Créer mon compte CaPeL'}
                </Button>
                {
                  errorSubmitting && (
                    <>
                      <Typography variant="body1" paragraph color="error">
                        Plouf !
                        Votre inscription a échoué... sur un rivage inconnu ?!
                      </Typography>
                      <Typography variant="body1" paragraph color="error">
                        Merci de prendre contact avec le Parc directement
                        pour remonter l'anomalie... Désolé.
                      </Typography>
                    </>
                  )
                }
              </form>

            </Grid>
          </>
          )
        }
      </Grid>
    </Layout>
  );
};

export default SignUpPage;
