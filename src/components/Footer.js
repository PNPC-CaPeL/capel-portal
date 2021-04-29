import React from 'react';
import clsx from 'clsx';

import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby-theme-material-ui';

import SNButton from './SNButton';

const useStyles = makeStyles(theme => ({
  social: {
    background: `linear-gradient(0deg, ${theme.palette.secondary.main} 50%, transparent 50%);`,
  },

  footer: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),

    '& a': {
      color: 'inherit',
    },
  },

  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
}));

const Footer = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.social}>
        <Container>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item><SNButton type="facebook" /></Grid>
            <Grid item><SNButton type="twitter" /></Grid>
            <Grid item><SNButton type="instagram" /></Grid>
            <Grid item><SNButton type="youtube" /></Grid>
            <Grid item><SNButton type="pinterest" /></Grid>
          </Grid>
        </Container>
      </Box>
      <Box component="footer" className={clsx(classes.footer, className)}>
        <Container {...props}>
          <Grid container>
            <Grid item xs={12} md={4} className={classes.left}>
              <Typography variant="body2">
                Les ressources documentaires :<br />
                <Link to="http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/se-renseigner-sur-les-reglementations">
                  Textes réglementaires
                </Link><br />
                <Link to="http://map.parcsnationaux.fr/?=PNPC">
                  Carte du Parc national de Port-Cros
                </Link><br />
                <Link to="http://www.amp.afbiodiversite.fr/accueil_fr">
                  Les Aires Marines Protégées
                </Link><br />
                <Link to="https://www.ecologique-solidaire.gouv.fr/">
                  Ministère de la Transition écologique et solidaire
                </Link><br />
                <Link to="https://www.afbiodiversite.fr/">
                  Agence française pour la biodiversité
                </Link><br />
                <Link to="http://www.sanctuaire-pelagos.org/fr/">
                  Sanctuaire Pelagos, Partie française
                </Link><br />
              </Typography>
            </Grid>

            <Grid item xs={12} md={4} className={classes.center}>
              <Typography variant="body2">
                <Link to="http://www.portcros-parcnational.fr/">
                  Le Parc national de Port-Cros
                </Link><br />
                <Link to="http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/un-territoire-reconnu">
                  Le Parc national en bref
                </Link><br />
                <Link to="http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/letablissement-public">
                  L'établissement public
                </Link><br />
                <Link to="http://www.portcros-parcnational.fr/fr/le-parc-national-de-port-cros/la-charte-du-parc-national-de-port-cros">
                  La charte du PNPC
                </Link><br />
                <Link to="http://www.portcros-parcnational.fr/fr/marches-publics-en-cours">
                  Marchés publics
                </Link><br />
                <Link to="http://www.portcros-parcnational.fr/fr/offres-emploi">
                  Offres d'emploi
                </Link><br />
                <Link to="http://www.portcros-parcnational.fr/fr/raa">
                  Recueil des actes administratifs
                </Link>
              </Typography>
            </Grid>

            <Grid item xs={12} md={4} className={classes.right}>
              <Typography variant="body2">
                Nous contacter : Parc national de Port-Cros<br />
                181 Allée du Castel Sainte Claire<br />
                BP 70220<br />
                83406 - HYERES cedex<br />
                Tél. 04 94 12 82 30<br />
                Formulaire de contact :<br />
                <Link to="http://www.portcros-parcnational.fr/fr/formulaire-contact">
                  portcros-parcnational.fr/fr/formulaire-contact
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
