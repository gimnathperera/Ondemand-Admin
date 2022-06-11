import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import Footer from 'src/components/Footer';
import WorkerEditTab from './WorkerEditTab';

import { fetchWorkerById } from '../../../store/actions/worker.actions';

const ManagementUserProfile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const _worker = useSelector(
    ({ worker }: RootStateOrAny) => worker.currentWorker
  );

  useEffect(() => {
    dispatch(fetchWorkerById(id));
  }, []);

  return (
    <>
      <Helmet>
        <title>Worker Details - Management</title>
      </Helmet>

      <Container sx={{ mt: 3 }} maxWidth="lg">
        <WorkerEditTab _worker={_worker} />
      </Container>

      <Footer />
    </>
  );
};

export default ManagementUserProfile;
