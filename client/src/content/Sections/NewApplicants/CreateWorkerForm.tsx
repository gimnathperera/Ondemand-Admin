import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

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
    name: formData?.name || '',
    email: formData?.email || '',
    password: '',
    status: formData?.status == 1 ? '1' : formData?.status == 0 ? '0' : '',
    assign_alias: formData?.assign_alias || '',
    additional_info: formData?.additional_info || '',
    dob: formData ? formatDate(formData?.dob) : '',
    address: formData?.address || '',
    contact_number: formData?.contact_number || '',
    certificate: formData?.certificate || '',
    certificate_expire_date: formData
      ? formatDate(formData.certificate_expire_date)
      : ''
  };

  const workerRegisterSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    password: Yup.string().max(255).required('Password is required'),
    status: Yup.string().required('Status is required'),
    assign_alias: Yup.string().required('Assign Alias is required'),
    additional_info: Yup.string().required('Additional info is required'),
    dob: Yup.string().required('Date of birth is required'),
    address: Yup.string().required('Address is required'),
    contact_number: Yup.string()
      .matches(MOBILE_REGEX, 'Invalid phone number')
      .required('Contact number required'),
    certificate: Yup.string().required('Certificate is required'),
    certificate_expire_date: Yup.string().required(
      'Certificate Exp is required'
    )
  });

  const workerUpdateSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    status: Yup.string().required('Status is required'),
    assign_alias: Yup.string().required('Assign Alias is required'),
    additional_info: Yup.string().required('Additional info is required'),
    dob: Yup.string().required('Date of birth is required'),
    address: Yup.string().required('Address is required'),
    contact_number: Yup.string()
      .matches(MOBILE_REGEX, 'Invalid phone number')
      .required('Contact number required'),
    certificate: Yup.string().required('Certificate is required'),
    certificate_expire_date: Yup.string().required(
      'Certificate Exp is required'
    )
  });

  const onSubmitWorker = (values: any) => {
    if (formData) {
      dispatch(
        updateWorker(
          Object.assign(values, {
            id: formData.id,
            password: formData.password
          })
        )
      ); //assign id to formData
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
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Worker Name"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.name}
                variant="outlined"
              />

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
                label="Password"
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
                <MenuItem value={'1'}>Active</MenuItem>
                <MenuItem value={'0'}>Inactive</MenuItem>
              </TextField>

              <TextField
                error={Boolean(touched.assign_alias && errors.assign_alias)}
                fullWidth
                helperText={touched.assign_alias && errors.assign_alias}
                label="Worker Assign Alias"
                margin="normal"
                name="assign_alias"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.assign_alias}
                variant="outlined"
              />
              <TextField
                error={Boolean(
                  touched.additional_info && errors.additional_info
                )}
                fullWidth
                helperText={touched.additional_info && errors.additional_info}
                label="Additional Info"
                margin="normal"
                name="additional_info"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.additional_info}
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
              <TextField
                error={Boolean(touched.contact_number && errors.contact_number)}
                fullWidth
                helperText={touched.contact_number && errors.contact_number}
                label="Worker Contact Number"
                margin="normal"
                name="contact_number"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.contact_number}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.certificate && errors.certificate)}
                fullWidth
                helperText={touched.certificate && errors.certificate}
                label="Worker Certificate"
                margin="normal"
                name="certificate"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.certificate}
                variant="outlined"
              />
              <TextField
                error={Boolean(
                  touched.certificate_expire_date &&
                    errors.certificate_expire_date
                )}
                fullWidth
                helperText={
                  touched.certificate_expire_date &&
                  errors.certificate_expire_date
                }
                label="Worker Certificate Expire Date"
                margin="normal"
                name="certificate_expire_date"
                onBlur={handleBlur}
                onChange={handleChange}
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                value={values.certificate_expire_date}
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
