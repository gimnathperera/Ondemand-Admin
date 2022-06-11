import { useEffect, ChangeEvent, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';

import WatchListColumn2 from './WatchListColumn2';
import WatchListColumn3 from './WatchListColumn3';
import WatchListColumn4 from './WatchListColumn4';
import DetailedChart from './DetailedChart';
import { fetchDashboardData } from 'src/store/actions/common.actions';
import { fetchActiveWorkerList } from 'src/store/actions/worker.actions';
import { fetchDetailedChartData } from 'src/store/actions/common.actions';

const DetailedChartWrapper = styled(DetailedChart)`
  height: 130px;
`;

function WatchList() {
  const dispatch = useDispatch();
  const [selectedWorker, setSelectedWorker] = useState('');
  const _dashboard = useSelector(({ dashboard }: RootStateOrAny) => dashboard);

  const workerList = useSelector(
    ({ activeWorker }: RootStateOrAny) => activeWorker.list
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(fetchActiveWorkerList());
  }, []);

  useEffect(() => {
    handleWorkerData();
  }, [workerList]);

  useEffect(() => {
    if (selectedWorker) {
      dispatch(fetchDetailedChartData(selectedWorker));
    }
  }, [selectedWorker]);

  const handleWorkerData = () => {
    if (workerList?.length > 0) {
      setSelectedWorker(workerList?.[0]?.id);
    }
  };

  const handleWorkerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedWorker(e.target.value);
  };

  const renderWorkerList = () => {
    return (
      workerList &&
      workerList?.map((worker: any) => (
        <MenuItem value={worker.id} key={worker.id}>
          {`${worker?.fullName}`}
        </MenuItem>
      ))
    );
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography variant="h3">Overview</Typography>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <>
          <Grid item lg={4} xs={12}>
            <WatchListColumn2 count={_dashboard?.workers} />
          </Grid>
          <Grid item lg={4} xs={12}>
            <WatchListColumn3 count={_dashboard?.newApplicants} />
          </Grid>
          <Grid item lg={4} xs={12}>
            <WatchListColumn4 count={_dashboard?.jobs} />
          </Grid>
        </>

        <Grid item xs={12}>
          <Card
            sx={{
              textAlign: 'center',
              p: 3,
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Grid
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h3" component="h3" gutterBottom>
                    Detailed Hours Chart
                  </Typography>
                  <Typography variant="subtitle2">
                    as of {moment().format('MMMM Do YYYY, h:mm a')}
                  </Typography>
                </Box>

                <FormControl sx={{ width: '180px' }} variant="outlined">
                  <InputLabel>Select Worker</InputLabel>
                  <Select
                    value={selectedWorker}
                    onChange={handleWorkerChange}
                    label="Sort"
                    autoWidth
                  >
                    {renderWorkerList()}
                  </Select>
                </FormControl>
              </Box>
              {_dashboard.detailedChartData && (
                <DetailedChartWrapper
                  data={_dashboard.detailedChartData?.dataset}
                  labels={_dashboard.detailedChartData?.lables}
                />
              )}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default WatchList;
