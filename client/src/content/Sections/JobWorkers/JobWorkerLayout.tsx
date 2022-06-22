import { ChangeEvent, useEffect, useState } from 'react';
import padWithLeadingZeroes from 'leading-zeroes';
import DatePicker from 'react-multi-date-picker';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { styled } from '@mui/material/styles';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import moment from 'moment';

import {
  Box,
  CircularProgress,
  Divider,
  Card,
  IconButton,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import JobWorkerLayout from './JobWorkerTable';
import { DATE_FORMAT } from 'src/constants/common-configurations';
import { fetchJobWorkerList } from 'src/store/actions/job.actions';

interface Filters {
  job?: string;
  requiredDate?: any;
}

const startOfMonth = moment()
  .clone()
  .startOf('month')
  .format('YYYY-MM-DDTHH:mm:ssZ');

const CardHeaderComponent = styled(CardHeader)(
  () => `
    .MuiCardHeader-action{
     width:65%;
    }
`
);

function ReportLayout({ initialJob }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [filters, setFilters] = useState<Filters>({
    job: 'All',
    requiredDate: new Date()
  });

  const reportList = useSelector(
    ({ jobWorker }: RootStateOrAny) => jobWorker.list
  );
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  const jobList = useSelector(({ job }: RootStateOrAny) => job.list);
  useEffect(() => {
    dispatch(
      fetchJobWorkerList({
        id: initialJob,
        requiredDate: moment(startOfMonth).format(DATE_FORMAT)
      })
    );

    setFilters((prevFilters) => ({
      ...prevFilters,
      job: initialJob
    }));
  }, []);

  const onReportSearch = ({ requiredDate }: any) => {
    //
    const payload = {
      id: initialJob,
      requiredDate: moment(requiredDate).format(DATE_FORMAT)
    };

    dispatch(fetchJobWorkerList(payload));
  };

  const handleDateChange = (value: any): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      requiredDate: moment(value?.toDate()).format(DATE_FORMAT)
    }));
  };

  const applyFilters = (): any => {
    onReportSearch(filters);
  };

  const handleJobChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'All') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      job: value
    }));
  };

  const renderJobList = () => {
    return (
      jobList &&
      jobList?.map((job: any) => (
        <MenuItem value={job.id} key={job.id}>
          <span>{`E-${padWithLeadingZeroes(job?.jobId, 3)}`}</span>
          <span style={{ marginLeft: 15 }}>{job?.name}</span>
        </MenuItem>
      ))
    );
  };

  return (
    <>
      {!loading ? (
        <Card>
          <CardHeaderComponent
            action={
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-end',
                  columnGap: '20px'
                }}
              >
                <FormControl sx={{ width: '200px' }} variant="outlined">
                  <InputLabel>Job</InputLabel>
                  <Select
                    value={filters.job || 'All'}
                    onChange={handleJobChange}
                    label="Job"
                    autoWidth
                  >
                    <MenuItem value={'All'}>
                      <span>{`All Job`}</span>
                    </MenuItem>
                    {renderJobList()}
                  </Select>
                </FormControl>

                <DatePicker
                  value={filters?.requiredDate}
                  onChange={handleDateChange}
                  style={{
                    height: '53px',
                    color: '#4C5359'
                  }}
                />

                <IconButton
                  sx={{
                    '&:hover': {
                      background: theme.colors.primary.lighter
                    },
                    color: '#5569FF',
                    width: '10%'
                  }}
                  color="inherit"
                  size="small"
                  onClick={applyFilters}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            }
            title="Job Worker Schedules"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />

          <Divider />

          {reportList?.length > 0 ? (
            <JobWorkerLayout reports={reportList} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh'
              }}
            >
              <h4>No workers found</h4>
            </Box>
          )}
        </Card>
      ) : (
        <Box
          sx={{
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={64} disableShrink thickness={3} />
        </Box>
      )}
    </>
  );
}

export default ReportLayout;
