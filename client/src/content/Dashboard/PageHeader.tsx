import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector, RootStateOrAny } from 'react-redux';

const PageHeader = () => {
  const theme = useTheme();
  const currentUser = useSelector(({ auth }: RootStateOrAny) => auth.user);

  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/6.png'
  };

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {currentUser?.fullName}!
        </Typography>
        <Typography variant="subtitle2">OnDemand Services!</Typography>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
