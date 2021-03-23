import React from 'react';

import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

import fr from 'date-fns/locale/fr';

const DTPicker = ({ onChange = () => {}, value = new Date() }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fr}>
    <Grid container>
      <Grid item xs>
        <DatePicker
          value={value}
          onChange={onChange}
          variant="static"
        />
      </Grid>
      <Grid item xs>
        <TimePicker
          value={value}
          onChange={onChange}
          variant="static"
          ampm={false}
        />
      </Grid>
    </Grid>
  </MuiPickersUtilsProvider>
);

export default DTPicker;
