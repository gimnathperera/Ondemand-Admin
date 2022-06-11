import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { Card } from '@mui/material';
import JobTable from './JobTable';

import { fetchJobList } from '../../../store/actions/job.actions';

function RecentOrders() {
  const dispatch = useDispatch();
  const jobList = useSelector(({ job }: RootStateOrAny) => job.list);
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    dispatch(fetchJobList());
  }, []);

  return (
    <>
      {!loading ? (
        <Card>
          {jobList.length > 0 ? (
            <JobTable jobs={jobList} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h4>No jobs</h4>
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

export default RecentOrders;
