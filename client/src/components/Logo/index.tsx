import { Hidden } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
       
`
);

function Logo() {
  return (
    <LogoWrapper to="/overview">
      <Hidden smDown>
        <img src="/static/images/logo/logo.svg" />
      </Hidden>
    </LogoWrapper>
  );
}

export default Logo;
