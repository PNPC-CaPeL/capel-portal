import React from 'react';

import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

import fr from 'date-fns/locale/fr';

const DTPicker = ({ onChange = () => {} }) => {
  const [datetime, setDatetime] = React.useState(new Date());

  const handleDateChange = newDatetime => {
    if (typeof onChange === 'function') {
      onChange(newDatetime);
    }
    setDatetime(newDatetime);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fr}>
      <Grid container>
        <Grid item xs>
          <DatePicker
            value={datetime}
            onChange={handleDateChange}
            variant="static"
          />
        </Grid>
        <Grid item xs>
          <TimePicker
            value={datetime}
            onChange={handleDateChange}
            variant="static"
            ampm={false}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DTPicker;
