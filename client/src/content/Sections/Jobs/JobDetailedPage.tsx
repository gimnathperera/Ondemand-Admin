import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import Footer from 'src/components/Footer';
import JobEditTab from './JobEditTab';

import { fetchJobById } from '../../../store/actions/job.actions';

const JobDetailedPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const _job = useSelector(({ job }: RootStateOrAny) => job.currentJob);

  useEffect(() => {
    dispatch(fetchJobById(id));
  }, []);

  return (
    <>
      <Helmet>
        <title>Job Details - Management</title>
      </Helmet>

      <Container sx={{ mt: 3 }} maxWidth="lg">
        <JobEditTab _job={_job} />
      </Container>

      <Footer />
    </>
  );
};

export default JobDetailedPage;
