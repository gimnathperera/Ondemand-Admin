import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { Card } from '@mui/material';
import _ from 'lodash';
import WorkerTable from './WorkerTable';

import { fetchWorkerList } from '../../../store/actions/worker.actions';

function WorkerLayout() {
  const dispatch = useDispatch();
  const workerList = useSelector(({ worker }: RootStateOrAny) => worker.list);
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    dispatch(fetchWorkerList());
  }, []);

  const _workerList =
    _.reject(
      workerList,
      (worker: any) =>
        worker.status == 'Pending' || worker.status == 'Reviewing'
    ) || [];

  return (
    <>
      {!loading ? (
        <Card>
          {_workerList.length > 0 ? (
            <WorkerTable workers={_workerList} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h4>No Workers</h4>
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

export default WorkerLayout;
