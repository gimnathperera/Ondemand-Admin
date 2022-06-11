import { useRoutes } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';

import ThemeProvider from './theme/ThemeProvider';

import routes from './router';

const App = () => {
  const isAuthenticated = useSelector(
    ({ auth }: RootStateOrAny) => auth.isAuthenticated
  );
  const content = useRoutes(routes(isAuthenticated));

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
};
export default App;
