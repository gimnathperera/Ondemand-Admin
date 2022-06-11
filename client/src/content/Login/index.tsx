import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import Login from './Login';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
    height: 100%;
    display: flex;
    justify-content: center;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Ondemand Admin Login</title>
      </Helmet>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <Logo />
        </Box>
        <Login />
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
