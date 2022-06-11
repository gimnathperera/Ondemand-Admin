import { FC, ReactNode } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import Sidebar from './Sidebar';
import Header from './Header';
import { errorClose, successClose } from 'src/store/actions/common.actions';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            padding-left: ${theme.sidebar.width};
        }
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
`
);

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const dispatch = useDispatch();
  const success = useSelector(({ common }: RootStateOrAny) => common.success);
  const successMessage = useSelector(
    ({ common }: RootStateOrAny) => common.successMessage
  );
  const error = useSelector(({ common }: RootStateOrAny) => common.error);
  const errorMessage = useSelector(
    ({ common }: RootStateOrAny) => common.errorMessage
  );

  return (
    <>
      <Sidebar />
      <MainWrapper>
        <Header />
        <MainContent>
          <Outlet />
          <Stack>
            <Snackbar
              open={success}
              autoHideDuration={6000}
              onClose={() => dispatch(successClose())}
            >
              <Alert severity="success" variant="filled">
                {successMessage}!
              </Alert>
            </Snackbar>
            <Snackbar
              open={error}
              autoHideDuration={6000}
              onClose={() => dispatch(errorClose())}
            >
              <Alert severity="error" variant="filled">
                {errorMessage}!
              </Alert>
            </Snackbar>
          </Stack>
        </MainContent>
      </MainWrapper>
    </>
  );
};

export default SidebarLayout;
