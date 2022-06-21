import { useSelector, RootStateOrAny } from 'react-redux';
import { Typography, Grid } from '@mui/material';

function PageHeader() {
  const reportList = useSelector(({ report }: RootStateOrAny) => report.list);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Job Worker Calendar
        </Typography>
        <Typography variant="subtitle2">Check worker schedules</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
