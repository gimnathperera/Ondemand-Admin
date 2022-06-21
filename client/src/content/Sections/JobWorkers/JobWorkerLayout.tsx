import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { styled } from '@mui/material/styles';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import moment from 'moment';

import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Select,
  MenuItem,
  CardHeader,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import leadingZeroes from 'leading-zeroes';

import JobWorkerLayout from './JobWorkerTable';
import { fetchAllReports } from '../../../store/actions/report.action';
import { fetchActiveWorkerList } from 'src/store/actions/worker.actions';
import { DATE_FORMAT } from 'src/constants/common-configurations';
interface Filters {
  status?: string;
  sorted?: string;
  worker?: string;
  startDate?: Date;
  endDate?: Date;
}

const startOfMonth = moment()
  .clone()
  .startOf('month')
  .format('YYYY-MM-DDTHH:mm:ssZ');
const endOfMonth = moment()
  .clone()
  .endOf('month')
  .format('YYYY-MM-DDTHH:mm:ssZ');

const CardHeaderComponent = styled(CardHeader)(
  () => `
    .MuiCardHeader-action{
     width:65%;
    }
`
);

function ReportLayout() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [filters, setFilters] = useState<Filters>({
    startDate: new Date(startOfMonth),
    endDate: new Date(endOfMonth)
  });

  const reportList = useSelector(({ report }: RootStateOrAny) => report.list);
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    dispatch(
      fetchAllReports({
        status: 'Completed',
        sorted: 'desc',
        startDate: moment(startOfMonth).format(DATE_FORMAT),
        endDate: moment(endOfMonth).format(DATE_FORMAT)
      })
    );
  }, []);

  useEffect(() => {
    dispatch(fetchActiveWorkerList());
  }, []);

  const onReportSearch = ({
    status,
    worker,
    sorted,
    startDate,
    endDate
  }: any) => {
    const payload = {
      status,
      worker,
      sorted,
      startDate: moment(startDate).format(DATE_FORMAT),
      endDate: moment(endDate).format(DATE_FORMAT)
    };

    dispatch(fetchAllReports(payload));
  };

  const handleDateChange = (value: any): void => {
    if (value?.length > 0) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        startDate: value?.[0],
        endDate: value?.[1]
      }));
    }
  };

  const applyFilters = (): any => {
    onReportSearch(filters);
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
                <DateRangePicker
                  onChange={handleDateChange}
                  value={[filters?.startDate, filters?.endDate]}
                  showLeadingZeros
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
