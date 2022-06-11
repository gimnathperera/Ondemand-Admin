import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import _ from 'lodash';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';

import { createWorker, updateWorker } from 'src/store/actions/worker.actions';
import { formatDate } from 'src/common/functions';
import { MOBILE_REGEX } from 'src/constants/common-configurations';

interface CreateWorkerFormProps {
  onSuccess(): any;
  formData?: any;
}

const CreateWorkerForm = ({ onSuccess, formData }: CreateWorkerFormProps) => {
  const dispatch = useDispatch();

  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  const initialFormValues = {
    fullName: formData?.fullName || '',
    dob: formData ? formatDate(formData?.dob) : '',
    userType: formData?.userType || '',
    email: formData?.email || '',
    password: '',
    role: formData?.role || 'Worker',
    status: formData?.status || 'Pending',
    phoneNumber: formData?.phoneNumber || '',
    address: formData?.address || '',
    gender: formData?.gender || '',
    nationality: formData?.nationality || '',
    emergencyContact: formData?.emergencyContact || '',
    abn: formData?.abn || '',
    nameOfBank: formData?.nameOfBank || '',
    bsb: formData?.bsb || '',
    accountNumber: formData?.accountNumber || ''
  };

  const workerRegisterSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    dob: Yup.string().required('Date of birth is required'),
    userType: Yup.string().required('User Type is required'),
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Account Type is required'),
    status: Yup.string().required('Status is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.string()
      .matches(MOBILE_REGEX, 'Invalid phone number')
      .required('Contact number required'),
    gender: Yup.string().required('Gender is required'),
    nationality: Yup.string().required('Nationality is required'),
    emergencyContact: Yup.string()
      .matches(MOBILE_REGEX, 'Invalid phone number')
      .required('Emergency number required'),
    abn: Yup.string().required('ABN is required'),
    nameOfBank: Yup.string().required('Name Of Bank is required'),
    bsb: Yup.string().required('BSB is required'),
    accountNumber: Yup.string().required('Account Number is required')
  });

  const workerUpdateSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    dob: Yup.string().required('Date of birth is required'),
    userType: Yup.string().required('User Type is required'),
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    status: Yup.string().required('Status is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.string()
      .matches(MOBILE_REGEX, 'Invalid phone number')
      .required('Contact number required'),
    gender: Yup.string().required('Gender is required'),
    nationality: Yup.string().required('Nationality is required'),
    emergencyContact: Yup.string()
      .matches(MOBILE_REGEX, 'Invalid phone number')
      .required('Emergency number required'),
    abn: Yup.string().required('ABN is required'),
    nameOfBank: Yup.string().required('Name Of Bank is required'),
    bsb: Yup.string().required('BSB is required'),
    accountNumber: Yup.string().required('Account Number is required')
  });

  const onSubmitWorker = (values: any) => {
    if (formData) {
      dispatch(
        updateWorker({
          id: formData?.id,
          data: _.omit(values, ['password', 'role']) // removing password for now & role is not allowed to update
        })
      );
    } else {
      dispatch(createWorker(values));
    }
    onSuccess();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Formik
          initialValues={initialFormValues}
          validationSchema={
            formData ? workerUpdateSchema : workerRegisterSchema
          }
          onSubmit={(values) => {
            onSubmitWorker(values);
          }}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <Form>
              <TextField
                error={Boolean(touched.fullName && errors.fullName)}
                fullWidth
                helperText={touched.fullName && errors.fullName}
                label="Worker Full Name"
                margin="normal"
                name="fullName"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.fullName}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.dob && errors.dob)}
                fullWidth
                helperText={touched.dob && errors.dob}
                type="date"
                label="Worker Date Of Birth"
                margin="normal"
                name="dob"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dob}
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextField
                error={Boolean(touched.userType && errors.userType)}
                fullWidth
                helperText={touched.userType && errors.userType}
                select
                label="Worker Type"
                margin="normal"
                name="userType"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userType}
                variant="outlined"
              >
                <MenuItem value={'Driver'}>Driver</MenuItem>
                <MenuItem value={'Car Cleaner'}>Car Cleaner</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
              </TextField>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Worker Email"
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
                label="Worker Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
                disabled={formData ? true : false}
              />

              <TextField
                error={Boolean(touched.gender && errors.gender)}
                fullWidth
                helperText={touched.gender && errors.gender}
                select
                label="Worker Gender"
                margin="normal"
                name="gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                variant="outlined"
              >
                <MenuItem value={'M'}>Male</MenuItem>
                <MenuItem value={'F'}>Female</MenuItem>
              </TextField>

              <TextField
                error={Boolean(touched.nationality && errors.nationality)}
                fullWidth
                helperText={touched.nationality && errors.nationality}
                label="Worker Nationality"
                margin="normal"
                name="nationality"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.nationality}
                variant="outlined"
              />

              <TextField
                error={Boolean(
                  touched.emergencyContact && errors.emergencyContact
                )}
                fullWidth
                helperText={touched.emergencyContact && errors.emergencyContact}
                label="Emergency Contact Number"
                margin="normal"
                name="emergencyContact"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.emergencyContact}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.abn && errors.abn)}
                fullWidth
                helperText={touched.abn && errors.abn}
                label="ABN"
                margin="normal"
                name="abn"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.abn}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.nameOfBank && errors.nameOfBank)}
                fullWidth
                helperText={touched.nameOfBank && errors.nameOfBank}
                label="Name Of Bank"
                margin="normal"
                name="nameOfBank"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.nameOfBank}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.bsb && errors.bsb)}
                fullWidth
                helperText={touched.bsb && errors.bsb}
                label="BSB"
                margin="normal"
                name="bsb"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.bsb}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.accountNumber && errors.accountNumber)}
                fullWidth
                helperText={touched.accountNumber && errors.accountNumber}
                label="Account Number"
                margin="normal"
                name="accountNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.accountNumber}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.role && errors.role)}
                fullWidth
                helperText={touched.role && errors.role}
                label="Account Type"
                margin="normal"
                name="role"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.role}
                variant="outlined"
                disabled
              />

              <TextField
                error={Boolean(touched.status && errors.status)}
                fullWidth
                helperText={touched.status && errors.status}
                select
                label="Worker Status"
                margin="normal"
                name="status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                variant="outlined"
              >
                <MenuItem value={'Active'}>Active</MenuItem>
                <MenuItem value={'Pending'}>Pending</MenuItem>
                <MenuItem value={'Reviewing'}>Reviewing</MenuItem>
                <MenuItem value={'Deactivated'}>Deactivated</MenuItem>
              </TextField>
              <TextField
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                fullWidth
                helperText={touched.phoneNumber && errors.phoneNumber}
                label="Worker Phone Number"
                margin="normal"
                name="phoneNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.phoneNumber}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.address && errors.address)}
                fullWidth
                helperText={touched.address && errors.address}
                label="Worker Address"
                margin="normal"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.address}
                variant="outlined"
              />
              <Box sx={{ py: 2 }}>
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
                    {formData ? 'UPDATE' : 'SUBMIT'}
                  </Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};
export default CreateWorkerForm;
