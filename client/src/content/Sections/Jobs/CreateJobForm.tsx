import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';

import { createJob } from 'src/store/actions/job.actions';
import { JOB_SCHEDULE_TYPE } from 'src/constants/common-configurations';

interface CreateJobFormProps {
  onSuccess(): any;
  formData?: any;
}

const CreateJobForm = ({ onSuccess }: CreateJobFormProps) => {
  const dispatch = useDispatch();

  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  const initialFormValues = {
    name: '',
    scheduleType: JOB_SCHEDULE_TYPE.SHIFTTED,
    startDate: '',
    endDate: '',
    status: 'Active',
    note: '',
    longitude: '',
    latitude: ''
  };

  const jobRegisterSchema = Yup.object({
    name: Yup.string().required('Job name is required'),
    scheduleType: Yup.string().required('Job schedule type is required'),
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string().required('End date is required'),
    status: Yup.string().required('Job status is required'),
    longitude: Yup.string().required('Longitude is required'),
    latitude: Yup.string().required('Latitude is required')
  });

  const onSubmitJob = ({
    endDate,
    latitude,
    longitude,
    name,
    note,
    startDate,
    status,
    scheduleType
  }) => {
    const payload = {
      endDate,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      name,
      startDate,
      status,
      scheduleType
    };
    if (note) Object.assign(payload, { note });
    dispatch(createJob(payload));
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
          validationSchema={jobRegisterSchema}
          onSubmit={(values) => {
            onSubmitJob(values);
          }}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <Form>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Job Name"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.name}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.scheduleType && errors.scheduleType)}
                fullWidth
                helperText={touched.scheduleType && errors.scheduleType}
                select
                label="Job Schedule Type"
                margin="normal"
                name="scheduleType"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.scheduleType}
                variant="outlined"
                disabled
              >
                {Object.values(JOB_SCHEDULE_TYPE).map((schedule) => (
                  <MenuItem value={schedule}>{schedule}</MenuItem>
                ))}
              </TextField>

              <TextField
                error={Boolean(touched.status && errors.status)}
                fullWidth
                helperText={touched.status && errors.status}
                select
                label="Job Status"
                margin="normal"
                name="status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                variant="outlined"
              >
                <MenuItem value={'Pending'}>Pending</MenuItem>
                <MenuItem value={'Active'}>Active</MenuItem>
                <MenuItem value={'Completed'}>Completed</MenuItem>
              </TextField>

              <TextField
                error={Boolean(touched.longitude && errors.longitude)}
                fullWidth
                helperText={touched.longitude && errors.longitude}
                label="Job Location (Longitude)"
                margin="normal"
                name="longitude"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.longitude}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.latitude && errors.latitude)}
                fullWidth
                helperText={touched.latitude && errors.latitude}
                label="Job Location (Latitude)"
                margin="normal"
                name="latitude"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.latitude}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.startDate && errors.startDate)}
                fullWidth
                helperText={touched.startDate && errors.startDate}
                type="date"
                label="Start Date"
                margin="normal"
                name="startDate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startDate}
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                error={Boolean(touched.endDate && errors.endDate)}
                fullWidth
                helperText={touched.endDate && errors.endDate}
                type="date"
                label="End Date"
                margin="normal"
                name="endDate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endDate}
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                error={Boolean(touched.note && errors.note)}
                fullWidth
                helperText={touched.note && errors.note}
                label="Notes"
                margin="normal"
                name="note"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.note}
                variant="outlined"
                multiline
                rows={5}
              />

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
                    SUBMIT
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
export default CreateJobForm;
