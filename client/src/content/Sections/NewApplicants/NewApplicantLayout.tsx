import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { Card } from '@mui/material';
import NewApplicantTable from './NewApplicantTable';

import { fetchPendingWorkerList } from '../../../store/actions/worker.actions';

function RecentOrders() {
  const dispatch = useDispatch();
  const applicantList = useSelector(
    ({ newApplicant }: RootStateOrAny) => newApplicant.list
  );

  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  useEffect(() => {
    dispatch(fetchPendingWorkerList());
  }, []);

  return (
    <>
      {!loading ? (
        <Card>
          {applicantList.length > 0 ? (
            <NewApplicantTable applicants={applicantList} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h4>No new applicants</h4>
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
