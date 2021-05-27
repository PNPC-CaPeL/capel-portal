import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as GatsbyLink } from 'gatsby';
import { Formik } from 'formik';

import { validateEmail } from '../lib/helpers';

import Layout from '../components/Layout';

const SP = 'SP';
const PI = 'PI';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',

    '& .MuiTextField-root, .MuiFormControl-root': {
      margin: theme.spacing(1),
    },
  },
}));

const SignUpPage = () => {
  const classes = useStyles();

  const [success, setSuccess] = useState();

  const handleFormValidate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Ce champ est nécessaire';
    }

    if (!values.email) {
      errors.email = 'Ce champ est nécessaire';
    }

    if (!validateEmail(values.email)) {
      errors.email = 'Votre e-mail est invalide.';
    }

    if (values.type === SP && !values.structureName) {
      errors.structureName = 'Ce champ est nécessaire';
    }

    return errors;
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    /**
     * Build the data object to send to n8n
     */
    const response = await fetch(process.env.GATSBY_N8N_WEBHOOK_HUB_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const { success: responseSuccess = false } = await response.json() || {};
    setSuccess(responseSuccess);

    setSubmitting(false);
  };

  return (
    <Layout title="Inscription à la plate-forme CaPeL">
      <Grid container justify={success ? 'space-around' : 'space-between'}>
        {success && (
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

        {(typeof success === 'undefined' || success === false) && (
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
              <Formik
                initialValues={{
                  formId: 'capel-form-signup',
                  name: '',
                  email: '',
                  type: PI,
                  structureName: '',
                }}
                validate={handleFormValidate}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  isValid,
                  dirty,
                }) => (
                  <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                      required
                      fullWidth
                      label="Identité"
                      name="name"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.name && errors.name)}
                      helperText={(touched.name && errors.name) || ''}
                      value={values.name}
                      disabled={isSubmitting}
                    />
                    <TextField
                      required
                      fullWidth
                      label="E-mail"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.email && errors.email)}
                      helperText={(touched.email && errors.email) || ''}
                      value={values.email}
                      disabled={isSubmitting}
                    />

                    <FormControl component="fieldset" fullWidth disabled={isSubmitting}>
                      <FormLabel component="legend">Type de compte</FormLabel>
                      <RadioGroup
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="type"
                        value={values.type}
                      >
                        <FormControlLabel
                          value={PI}
                          control={<Radio />}
                          label="Plongeur individuel"
                        />
                        <FormControlLabel
                          value={SP}
                          control={<Radio />}
                          label="Structure de plongée"
                        />
                      </RadioGroup>
                    </FormControl>

                    {values.type === SP && (
                      <TextField
                        required
                        fullWidth
                        label="Nom de la structure"
                        name="structureName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.structureName && errors.structureName)}
                        value={values.structureName}
                        disabled={isSubmitting}
                      />
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!dirty || !isValid || isSubmitting}
                    >
                      {isSubmitting ? 'Inscription en cours...' : 'Créer mon compte CaPeL'}
                    </Button>

                    {(success === false) && (
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
                    )}
                  </form>
                )}
              </Formik>
            </Grid>
          </>
        )}
      </Grid>
    </Layout>
  );
};

export default SignUpPage;
