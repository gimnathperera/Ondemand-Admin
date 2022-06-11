import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import moment from 'moment';
import leadingZeroes from 'leading-zeroes';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { createJobWorkers } from 'src/store/actions/job.actions';
import { fetchActiveWorkerList } from 'src/store/actions/worker.actions';
import { DATE_FORMAT } from 'src/constants/common-configurations';

interface AddWorkerToJobFormProps {
  onSuccess(): any;
  jobID: string;
  startDate: string;
  endDate: string;
  scheduleType: string;
  existingWorkers: any[];
}

const AddWorkerToJobForm = ({
  onSuccess,
  jobID,
  startDate,
  endDate,
  scheduleType,
  existingWorkers
}: AddWorkerToJobFormProps) => {
  const dispatch = useDispatch();
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  const workerList = useSelector(
    ({ activeWorker }: RootStateOrAny) => activeWorker.list
  );

  useEffect(() => {
    dispatch(fetchActiveWorkerList());
  }, []);

  const convertedWorkerList = () => {
    const _workerList = _.map(existingWorkers, (item: any) => ({
      ...{
        worker: item.worker.id,
        workerStartDate: moment(item.workerStartDate).format(DATE_FORMAT),
        workerEndDate: moment(item.workerEndDate).format(DATE_FORMAT),
        shifts: _.map(item.shifts, (shift) => _.omit(shift, '_id'))
      }
    }));

    return _workerList;
  };

  const initialFormValues = {
    workers:
      existingWorkers?.length > 0
        ? convertedWorkerList()
        : [
            {
              worker: '',
              workerStartDate: moment(startDate).format(DATE_FORMAT),
              workerEndDate: moment(endDate).format(DATE_FORMAT),
              shifts: [
                { workerStartTime: '06:00', workerEndTime: '14:00' },
                { workerStartTime: '14:00', workerEndTime: '22:00' },
                { workerStartTime: '22:00', workerEndTime: '06:00' }
              ]
            }
          ]
  };

  const assignWorkerSchema = Yup.object({
    workers: Yup.array().of(
      Yup.object().shape({
        worker: Yup.string().required('Worker required'),
        workerStartDate: Yup.string().required('Start date required'),
        workerEndDate: Yup.string().required('End date required'),
        shifts: Yup.array().of(
          Yup.object().shape({
            workerStartTime: Yup.string().required('Start time required'),
            workerEndTime: Yup.string().required('End time required')
          })
        )
      })
    )
  });

  const onSubmitWorker = ({ workers }: any) => {
    const payLoad = {
      jobID,
      workers
    };

    dispatch(createJobWorkers(payLoad));
    onSuccess();
  };

  const renderWorkerList = () => {
    return (
      workerList &&
      workerList?.map((worker: any) => (
        <MenuItem value={worker.id} key={worker.id}>
          <span>{`E-${leadingZeroes(worker?.userId, 3)}`}</span>
          <span style={{ marginLeft: 20 }}>{worker?.fullName}</span>
        </MenuItem>
      ))
    );
  };

  const Shifts = ({
    name,
    shifts,
    touched,
    errors,
    handleBlur,
    handleChange
  }) => {
    return (
      <FieldArray
        name={name}
        render={(helpers) => (
          <>
            {shifts &&
              shifts.length &&
              shifts.map((shift, index) => (
                <Box
                  display="flex"
                  sx={{
                    justifyContent: 'space-between',
                    paddingTop: '20px',
                    columnGap: '10px'
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    {`Shift #${index + 1}`}
                  </Typography>
                  <TextField
                    error={Boolean(
                      touched?.shifts?.[index]?.workerStartTime &&
                        errors?.shifts?.[index]?.workerStartTime
                    )}
                    helperText={
                      touched?.shifts?.[index]?.workerStartTime &&
                      errors?.shifts?.[index]?.workerStartTime
                    }
                    label="Start Time"
                    type="time"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    sx={{ width: '50%' }}
                    name={`${name}.${index}.workerStartTime`}
                    value={shifts[index]?.workerStartTime}
                  />
                  <TextField
                    error={Boolean(
                      touched?.shifts?.[index]?.workerEndTime &&
                        errors?.shifts?.[index]?.workerEndTime
                    )}
                    helperText={
                      touched?.shifts?.[index]?.workerEndTime &&
                      errors?.shifts?.[index]?.workerEndTime
                    }
                    label="End Time"
                    type="time"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    sx={{ width: '50%' }}
                    name={`${name}.${index}.workerEndTime`}
                    value={shifts[index]?.workerEndTime}
                  />

                  <Box sx={{ display: 'flex' }}>
                    <IconButton
                      onClick={() =>
                        helpers.insert(index, {
                          workerStartTime: '',
                          workerEndTime: ''
                        })
                      }
                      color="primary"
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        shifts.length > 1 && helpers.remove(index);
                      }}
                      color="error"
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
          </>
        )}
      />
    );
  };

  const handleAddMoreWorkers = (helpers: any, index: number) => {
    helpers.insert(index, {
      worker: '',
      workerStartDate: moment(startDate).format(DATE_FORMAT),
      workerEndDate: moment(endDate).format(DATE_FORMAT),
      shifts: [
        { workerStartTime: '06:00', workerEndTime: '14:00' },
        { workerStartTime: '14:00', workerEndTime: '22:00' },
        { workerStartTime: '22:00', workerEndTime: '06:00' }
      ]
    });
  };

  const renderMoreWorker = (
    errors: any,
    handleBlur: any,
    handleChange: any,
    touched: any,
    values: any
  ): JSX.Element => {
    return (
      <FieldArray
        name="workers"
        render={(helpers) => (
          <>
            {Array.from({ length: values?.workers.length }, (item, index) => (
              <>
                <Card key={index} sx={{ margin: '15px 0px' }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        Worker #{index + 1}
                      </Typography>
                      <IconButton
                        onClick={() => {
                          values.workers.length > 1 && helpers.remove(index);
                        }}
                        size="small"
                      >
                        ❌
                      </IconButton>
                    </Box>

                    <TextField
                      error={Boolean(
                        touched?.workers &&
                          touched?.workers[index]?.worker &&
                          errors?.workers &&
                          errors?.workers[index]?.worker
                      )}
                      fullWidth
                      helperText={
                        touched?.workers &&
                        touched?.workers[index]?.worker &&
                        errors?.workers &&
                        errors?.workers[index]?.worker
                      }
                      select
                      label="Worker"
                      margin="normal"
                      name={`workers.${index}.worker`}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      variant="outlined"
                      value={values?.workers[index]?.worker}
                    >
                      {renderWorkerList()}
                    </TextField>

                    <Box
                      display="flex"
                      sx={{
                        justifyContent: 'space-between',
                        paddingTop: '10px',
                        columnGap: '10px'
                      }}
                    >
                      <TextField
                        error={Boolean(
                          touched?.workers?.[index]?.workerStartDate &&
                            errors?.workers?.[index]?.workerStartDate
                        )}
                        helperText={
                          touched?.workers?.[index]?.workerStartDate &&
                          errors?.workers?.[index]?.workerStartDate
                        }
                        label="Start Date"
                        type="date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true
                        }}
                        sx={{ width: '50%' }}
                        name={`workers.${index}.workerStartDate`}
                        inputProps={{
                          min: moment(startDate).format(DATE_FORMAT),
                          max: moment(endDate).format(DATE_FORMAT)
                        }}
                        value={values?.workers[index]?.workerStartDate}
                      />

                      <TextField
                        error={Boolean(
                          touched?.workers?.[index]?.workerEndDate &&
                            errors?.workers?.[index]?.workerEndDate
                        )}
                        helperText={
                          touched?.workers?.[index]?.workerEndDate &&
                          errors?.workers?.[index]?.workerEndDate
                        }
                        label="End Date"
                        type="date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true
                        }}
                        sx={{ width: '50%' }}
                        name={`workers.${index}.workerEndDate`}
                        inputProps={{
                          min: moment(startDate).format(DATE_FORMAT),
                          max: moment(endDate).format(DATE_FORMAT)
                        }}
                        value={values?.workers[index]?.workerEndDate}
                      />
                    </Box>

                    <Shifts
                      name={`workers.${index}.shifts`}
                      shifts={values?.workers[index]?.shifts}
                      touched={touched}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                  </CardContent>
                </Card>
                <Box display="flex">
                  <Button
                    onClick={() => handleAddMoreWorkers(helpers, index)}
                    color="primary"
                    variant="outlined"
                  >
                    Add more
                  </Button>
                </Box>
              </>
            ))}
          </>
        )}
      />
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      <Container maxWidth="xl">
        <Formik
          initialValues={initialFormValues}
          validationSchema={assignWorkerSchema}
          onSubmit={(values) => {
            onSubmitWorker(values);
          }}
          enableReinitialize
        >
          {({ errors, handleBlur, handleChange, touched, values }) => {
            return (
              <Form>
                {renderMoreWorker(
                  errors,
                  handleBlur,
                  handleChange,
                  touched,
                  values
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
                      {'ADD WORKERS'}
                    </Button>
                  )}
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Box>
  );
};
export default AddWorkerToJobForm;
