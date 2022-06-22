import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import JobWorkerLayout from './JobWorkerLayout';
import { fetchJobList } from '../../../store/actions/job.actions';

function ReportList() {
  const dispatch = useDispatch();
  const jobList = useSelector(({ job }: RootStateOrAny) => job.list);

  useEffect(() => {
    dispatch(fetchJobList());
  }, []);

  return (
    <>
      <Helmet>
        <title>Job Worker Calendar</title>
      </Helmet>
      <PageTitleWrapper maxWidth="xl">
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            {jobList?.length > 0 && (
              <JobWorkerLayout initialJob={jobList[0]?.id} />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ReportList;
