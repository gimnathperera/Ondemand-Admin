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

import ReportTable from './ReportTable';
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

const statusOptions = [
  {
    id: 'All',
    name: 'All'
  },
  {
    id: 'Active',
    name: 'Active'
  },
  {
    id: 'Completed',
    name: 'Completed'
  }
];

const sortOptions = [
  {
    id: 'asc',
    name: 'Asc'
  },
  {
    id: 'desc',
    name: 'Desc'
  }
];

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
    status: 'All',
    sorted: 'desc',
    worker: 'All',
    startDate: new Date(startOfMonth),
    endDate: new Date(endOfMonth)
  });

  const reportList = useSelector(({ report }: RootStateOrAny) => report.list);
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  const workerList = useSelector(
    ({ activeWorker }: RootStateOrAny) => activeWorker.list
  );

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

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSortChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      sorted: value
    }));
  };

  const handleWorkerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'All') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      worker: value
    }));
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

  const renderWorkerList = () => {
    return (
      workerList &&
      workerList?.map((worker: any) => (
        <MenuItem value={worker.id} key={worker.id}>
          <span>{`E-${leadingZeroes(worker?.userId, 3)}`}</span>
          <span style={{ marginLeft: 15 }}>{worker?.fullName}</span>
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
                <DateRangePicker
                  onChange={handleDateChange}
                  value={[filters?.startDate, filters?.endDate]}
                  showLeadingZeros
                />

                <FormControl sx={{ width: '200px' }} variant="outlined">
                  <InputLabel>Worker</InputLabel>
                  <Select
                    value={filters.worker || 'All'}
                    onChange={handleWorkerChange}
                    label="Worker"
                    autoWidth
                  >
                    <MenuItem value={'All'}>
                      <span>{`All Workers`}</span>
                    </MenuItem>
                    {renderWorkerList()}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: '180px' }} variant="outlined">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={filters.sorted || 'desc'}
                    onChange={handleSortChange}
                    label="Sort"
                    autoWidth
                  >
                    {sortOptions.map((statusOption) => (
                      <MenuItem key={statusOption.id} value={statusOption.id}>
                        {statusOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: '180px' }} variant="outlined">
                  <InputLabel> Shift Status</InputLabel>
                  <Select
                    value={filters.status || 'All'}
                    onChange={handleStatusChange}
                    label="Status"
                    autoWidth
                  >
                    {statusOptions.map((statusOption) => (
                      <MenuItem key={statusOption.id} value={statusOption.id}>
                        {statusOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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
            title="Job Reports"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />

          <Divider />

          {reportList?.length > 0 ? (
            <ReportTable reports={reportList} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh'
              }}
            >
              <h4>No records found</h4>
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
