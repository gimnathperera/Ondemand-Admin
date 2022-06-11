import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import NewApplicantLayout from './NewApplicantLayout';

const NewApplicantList = () => {
  return (
    <>
      <Helmet>
        <title>All New Applicants</title>
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
            <NewApplicantLayout />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default NewApplicantList;
