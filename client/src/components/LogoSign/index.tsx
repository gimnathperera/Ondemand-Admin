import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        justify-content: center;
`
);

function Logo() {
  return (
    <LogoWrapper to="/overview">
      <img src={'/static/images/logo/bglogo.jpg'} style={{ width: '25%' }} />
    </LogoWrapper>
  );
}

export default Logo;
