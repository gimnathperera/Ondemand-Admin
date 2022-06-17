import { useEffect } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import Timeline from 'react-time-line';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import _ from 'lodash';

import { fetchJobTimeLine } from 'src/store/actions/job.actions';

const JobTimeLog = ({ jobId }) => {
  const dispatch = useDispatch();
  const recordList = useSelector(({ job }: RootStateOrAny) => job.records);
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    dispatch(fetchJobTimeLine({ jobId }));
  }, []);

  const convertedRecords = () => {
    const records = [];
    if (recordList.length > 0) {
      _.map(recordList, (record) => {
        let temp = {
          ts: record?.createdAt,
          text: record?.description
        };
        records.push(temp);
      });
    }
    return records;
  };

  return (
    <Grid
      container
      spacing={0}
      sx={{ height: '260px', overflow: 'auto', width: '100%' }}
    >
      {loading ? (
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
          <CircularProgress size={16} disableShrink thickness={3} />
        </Box>
      ) : recordList.length > 0 ? (
        <Box sx={{ width: '100%' }}>
          <Timeline items={convertedRecords()} />
        </Box>
      ) : (
        <p>No data</p>
      )}
    </Grid>
  );
};

export default JobTimeLog;
