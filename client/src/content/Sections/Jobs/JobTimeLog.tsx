import { useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';

import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import { fetchJobTimeLine } from 'src/store/actions/job.actions';
import { DATE_TIME_FORMAT } from 'src/constants/common-configurations';

const LogItem = styled(Grid)`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #e6fcd8;
  padding: 8px;
  column-gap: 20px;
  margin-bottom: 10px;
`;

const JobTimeLog = ({ jobId }) => {
  const dispatch = useDispatch();
  const recordList = useSelector(({ job }: RootStateOrAny) => job.records);
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    dispatch(fetchJobTimeLine({ jobId }));
  }, []);

  return (
    <Typography variant="subtitle2">
      <Grid container spacing={0} sx={{ maxHeight: '238px', overflow: 'auto' }}>
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
          recordList.map((record) => (
            <LogItem item xs={12} key={record?.id}>
              <Grid item>
                <Box>
                  <b>{moment(record.createdAt).format(DATE_TIME_FORMAT)}</b>
                </Box>
              </Grid>
              <Grid item>
                <Box>{record?.description}</Box>
              </Grid>
            </LogItem>
          ))
        ) : (
          <p>No data</p>
        )}
      </Grid>
    </Typography>
  );
};

export default JobTimeLog;
