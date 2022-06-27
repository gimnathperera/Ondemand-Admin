import { useState, useRef } from 'react';
import leadingZeroes from 'leading-zeroes';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  CardMedia,
  Button,
  IconButton,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import SortIcon from '@mui/icons-material/Sort';
import moment from 'moment';

import Text from 'src/components/Text';
import Label from 'src/components/Label';
import Modal from 'src/components/Modal';

import UpdateJobForm from './UpdateJobForm';
import AddWorkerToJobForm from './AddWorkerToJobForm';
import JobWokerTable from './JobWokerTable';
import { DATE_FORMAT } from 'src/constants/common-configurations';
import JobTimeLog from './JobTimeLog';
import bglogo from 'src/assets/images/bglogo.jpg';

const Input = styled('input')({
  display: 'none'
});
const CardCover = styled(Card)(
  ({ theme }) => `
        position: relative;
    
        .MuiCardMedia-root {
          height: ${theme.spacing(26)};
        }
    `
);
const CardCoverAction = styled(Box)(
  ({ theme }) => `
        position: absolute;
        right: ${theme.spacing(2)};
        bottom: ${theme.spacing(2)};
    `
);
const HeaderContaienr = styled(Box)({
  display: 'flex',
  alignItems: 'center'
});
const CoverPhoto = styled(CardMedia)`
  background-size: contain;
`;

const JobEditTab = ({ _job }: any) => {
  const navigate = useNavigate();
  const myRef = useRef(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAddWorker, setIsAddWorker] = useState<boolean>(false);

  const handleBackClick = () => {
    navigate('/app/jobs');
  };

  const executeScroll = () => myRef.current.scrollIntoView();

  const handleModalClose = () => {
    setIsEdit(false);
    setIsAddWorker(false);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} md={12}>
        <>
          <Box display="flex" mb={3}>
            <Tooltip arrow placement="top" title="Go back">
              <IconButton
                color="primary"
                sx={{ p: 2, mr: 2 }}
                onClick={handleBackClick}
              >
                <ArrowBackTwoToneIcon />
              </IconButton>
            </Tooltip>
            <HeaderContaienr>
              <Typography variant="h3" component="h3" gutterBottom>
                {_job?.name || <Skeleton variant="text" width={210} />}
              </Typography>
            </HeaderContaienr>
          </Box>
          <CardCover style={{ backgroundColor: '#000' }}>
            <CoverPhoto image={bglogo} />
            <CardCoverAction>
              <Input accept="image/*" id="change-cover" multiple type="file" />
            </CardCoverAction>
          </CardCover>

          <Box py={2} pl={2} mb={3}>
            <Typography gutterBottom variant="h4">
              {`J-${leadingZeroes(_job?.jobId, 3)}` || (
                <Skeleton variant="text" width={210} />
              )}
            </Typography>

            <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
              {_job?.status == 'Active' ? (
                <Label color="success">Active</Label>
              ) : _job?.status == 'Pending' ? (
                <Label color="warning">Pending</Label>
              ) : _job?.status == 'Pending' ? (
                <Label color="info">Completed</Label>
              ) : (
                <Skeleton variant="text" width={60} />
              )}
            </Typography>

            <Box
              display={{ xs: 'block', md: 'flex' }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setIsAddWorker(true)}
                >
                  Assign Worker
                </Button>
                <Button
                  size="small"
                  sx={{ mx: 1 }}
                  variant="outlined"
                  onClick={executeScroll}
                >
                  View Job Wokers
                </Button>
                <IconButton color="primary" sx={{ p: 0.5 }}>
                  <MoreHorizTwoToneIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </>
      </Grid>

      <Grid item xs={12} md={12}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            direction="row"
            sx={{ display: 'flex', columnGap: 2 }}
          >
            <Grid xs={6}>
              <Card>
                <Box
                  p={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      Job Details
                    </Typography>
                    <Typography variant="subtitle2">
                      Manage informations related to job and workers
                    </Typography>
                  </Box>
                  <Button
                    variant="text"
                    startIcon={<EditTwoToneIcon />}
                    onClick={() => setIsEdit(true)}
                  >
                    Edit
                  </Button>
                </Box>
                <Divider />
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="subtitle2">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={4} md={3}>
                        <Box pr={3} pb={2}>
                          Job Name:
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <Text color="black">
                          <b> {_job?.name || '-'}</b>
                        </Text>
                      </Grid>

                      <Grid item xs={12} sm={4} md={3}>
                        <Box pr={3} pb={2}>
                          Schedule Type:
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <Text color="black">
                          <b> {_job?.scheduleType || '-'}</b>
                        </Text>
                      </Grid>

                      <Grid item xs={12} sm={4} md={3}>
                        <Box pr={3} pb={2}>
                          Start Date:
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <Text color="black">
                          <b>
                            {' '}
                            {moment(_job?.startDate).format(DATE_FORMAT) || '-'}
                          </b>
                        </Text>
                      </Grid>
                      <Grid item xs={12} sm={4} md={3}>
                        <Box pr={3} pb={2}>
                          End Date:
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <Box sx={{ maxWidth: { xs: 'auto', sm: 500 } }}>
                          <Text color="black">
                            {' '}
                            <b>
                              {' '}
                              {moment(_job?.endDate).format(DATE_FORMAT) || '-'}
                            </b>
                          </Text>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4} md={3}>
                        <Box pr={3} pb={2}>
                          Job Status:
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <Box sx={{ maxWidth: { xs: 'auto', sm: 600 } }}>
                          <Typography variant="subtitle2" color="text.primary">
                            {_job?.status == 'Active' ? (
                              <Label color="success">Active</Label>
                            ) : _job?.status == 'Pending' ? (
                              <Label color="warning">Pending</Label>
                            ) : _job?.status == 'Pending' ? (
                              <Label color="info">Completed</Label>
                            ) : (
                              <Skeleton variant="text" width={60} />
                            )}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4} md={3}>
                        <Box pr={3} pb={2}>
                          Notes:
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <Box sx={{ maxWidth: { xs: 'auto', sm: 500 } }}>
                          <Text color="black">{_job.note || 'N/A'}</Text>
                        </Box>
                      </Grid>
                    </Grid>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={6}>
              <Card>
                <Box
                  p={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      Job Time Line
                    </Typography>
                    <Typography variant="subtitle2">
                      Job time line changes
                    </Typography>
                  </Box>
                  <Button variant="text" startIcon={<SortIcon />}>
                    Sort
                  </Button>
                </Box>
                <Divider />
                <CardContent sx={{ p: 4 }}>
                  {_job?.id && <JobTimeLog jobId={_job?.id} />}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid item xs={12} ref={myRef}>
            <Card>
              <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Job workers
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage workers related to job
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <CardContent>
                {_job?.workers && (
                  <JobWokerTable jobWorkerList={_job?.workers} />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        isOpen={isEdit}
        handleClose={handleModalClose}
        content={<UpdateJobForm onSuccess={handleModalClose} formData={_job} />}
        modalHeader={'Update Job'}
        modalDescription={
          'Fill the forum and press update button to update the selected job.'
        }
      />
      <Modal
        isOpen={isAddWorker}
        handleClose={handleModalClose}
        content={
          <AddWorkerToJobForm
            onSuccess={handleModalClose}
            jobID={_job?.id}
            scheduleType={_job?.scheduleType}
            startDate={_job?.startDate}
            endDate={_job?.endDate}
            existingWorkers={_job?.workers}
          />
        }
        modalHeader={'Assign Workers'}
        modalDescription={
          'Fill the forum and press update button to update the selected job.'
        }
      />
    </Grid>
  );
};

export default JobEditTab;
