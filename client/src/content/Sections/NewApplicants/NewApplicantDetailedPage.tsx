import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Box, Container, CircularProgress } from '@mui/material';

import Footer from 'src/components/Footer';
import NewApplicantEditTab from './NewApplicantEditTab';
import { fetchDocumentsByOwner } from 'src/store/actions/document.action';

import { fetchWorkerById } from '../../../store/actions/worker.actions';

const NewApplicantDetailedPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const currentApplicant = useSelector(
    ({ newApplicant }: RootStateOrAny) => newApplicant.currentApplicant
  );
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    dispatch(fetchWorkerById(id));
  }, []);

  useEffect(() => {
    id &&
      dispatch(
        fetchDocumentsByOwner({
          owner: id
        })
      );
  }, []);

  return (
    <>
      <Helmet>
        <title>Worker Details - Management</title>
      </Helmet>

      <Container sx={{ mt: 3 }} maxWidth="lg">
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
            <CircularProgress size={64} disableShrink thickness={3} />
          </Box>
        ) : (
          <NewApplicantEditTab _worker={currentApplicant} />
        )}
      </Container>

      <Footer />
    </>
  );
};

export default NewApplicantDetailedPage;
