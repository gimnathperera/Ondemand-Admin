import { useEffect } from 'react';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';

import { userLogin } from '../../store/actions/auth.actions';

const FormHeaderContainer = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  `
);

const FormSubHeaderSection = styled(Box)(
  ({ theme }) => `
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    `
);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    ({ auth }: RootStateOrAny) => auth.isAuthenticated
  );
  const isLoginError = useSelector(
    ({ common }: RootStateOrAny) => common.error
  );
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    isAuthenticated && navigate('/dashboards/overview');
  }, [isAuthenticated]);

  const handleOnSubmit = (values) => {
    dispatch(userLogin(values));
  };

  const initialFormValues = {
    email: '',
    password: ''
  };

  const userLoginSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
  });
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Formik
          initialValues={initialFormValues}
          validationSchema={userLoginSchema}
          onSubmit={(values) => {
            handleOnSubmit(values);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <FormHeaderContainer sx={{ mb: 3 }}>
                <FormSubHeaderSection>
                  <Typography color="#252733" variant="h2" align="center">
                    Log in to Dashboard
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                    align="center"
                    sx={{
                      letterSpacing: '0.3px',
                      fontSize: '14px',
                      lineHeight: '20px'
                    }}
                  >
                    Enter your email and password below
                  </Typography>
                </FormSubHeaderSection>
              </FormHeaderContainer>

              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              {isLoginError && (
                <FormHelperText error id="outlined-adornment-password">
                  Invalid credentials
                </FormHelperText>
              )}

              <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Log In
                  </Button>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};
export default Login;
