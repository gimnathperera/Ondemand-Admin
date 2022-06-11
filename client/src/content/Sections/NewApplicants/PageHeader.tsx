import { useState } from 'react';
import { Typography, Grid } from '@mui/material';

const PageHeader = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          All New Applicants
        </Typography>
        <Typography variant="subtitle2">All New Applicants details</Typography>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
