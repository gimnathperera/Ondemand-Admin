import { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import leadingZeroes from 'leading-zeroes';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
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
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import CreateWorkerForm from './CreateWorkerForm';
import { formatDate } from 'src/common/functions';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WorkerDocuments from './WorkerDocuments/WorkerDocuments';
import WorkerCard from './WorkerCard';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { uploadProfilePic } from 'src/store/actions/document.action';
import bglogo from 'src/assets/images/bglogo.jpg';

import { BASE_URL } from 'src/constants/common-configurations';

const Input = styled('input')({
  display: 'none'
});
const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    
        position: relative;
        overflow: visible;
        display: inline-block;
        margin-top: -${theme.spacing(9)};
        margin-left: ${theme.spacing(2)};
    
        .MuiAvatar-root {
          width: ${theme.spacing(16)};
          height: ${theme.spacing(16)};
        }  
        
    `
);
const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
        position: absolute;
        width: ${theme.spacing(4)};
        height: ${theme.spacing(4)};
        bottom: -${theme.spacing(1)};
        right: -${theme.spacing(1)};
    
        .MuiIconButton-root {
          border-radius: 100%;
          background: ${theme.colors.primary.main};
          color: ${theme.palette.primary.contrastText};
          box-shadow: ${theme.colors.shadows.primary};
          width: ${theme.spacing(4)};
          height: ${theme.spacing(4)};
          padding: 0;
      
          &:hover {
            background: ${theme.colors.primary.dark};
          }
        }
    `
);
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
const CoverPhoto = styled(CardMedia)`
  background-size: contain;
`;

export type ApplicantStatus = 'Pending' | 'Active' | 'Deactivated';

const WorkerEditTab = ({ _worker }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    if (_worker?.profPic) {
      setProfilePic(`${BASE_URL}/documents/prof-pic/${_worker?.profPic}`);
    } else {
      setProfilePic('');
    }
  }, [_worker]);

  const handleModalClose = () => {
    setIsEdit(false);
    setIsCard(false);
  };

  const handleBackClick = () => {
    navigate('/app/workers');
  };

  const getStatusLabel = (applicantStatus: ApplicantStatus): JSX.Element => {
    const map = {
      Pending: {
        text: 'Pending',
        color: 'warning'
      },
      Active: {
        text: 'Active',
        color: 'success'
      },
      Reviewing: {
        text: 'Reviewing',
        color: 'warning'
      },
      Deactivated: {
        text: 'Deactivated',
        color: 'error'
      }
    };
    const { text, color }: any = map[applicantStatus];

    return <Label color={color}>{text}</Label>;
  };

  const handleProfilePicUpload = (event: any) => {
    if (event.target.files.length > 0) {
      setProfilePic(URL.createObjectURL(event.target.files[0]));

      const formData = new FormData();

      formData.append(
        'files',
        event.target.files[0],
        `pp${_worker?.id}.${event.target.files[0].name.split('.').pop()}` //rename the profile picture file
      );
      formData.append('owner', _worker?.id);

      dispatch(uploadProfilePic(formData));
    }
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

            <Box>
              <Typography
                variant="h3"
                component="h3"
                gutterBottom
                sx={{ textTransform: 'capitalize' }}
              >
                {`${_worker?.fullName}` || (
                  <Skeleton variant="text" width={210} />
                )}
              </Typography>

              <Typography variant="subtitle2">
                {`E-${leadingZeroes(_worker?.userId, 3)}` || (
                  <Skeleton variant="text" width={210} />
                )}
              </Typography>
            </Box>
          </Box>
          <CardCover style={{ backgroundColor: '#000' }}>
            <CoverPhoto image={bglogo} />
            <CardCoverAction>
              <Input accept="image/*" id="change-cover" multiple type="file" />
            </CardCoverAction>
          </CardCover>
          <AvatarWrapper>
            <Avatar variant="rounded" alt={'avatar'} src={profilePic} />
            <ButtonUploadWrapper>
              <Input
                accept="image/*"
                id="icon-button-file"
                name="icon-button-file"
                type="file"
                onChange={(event) => handleProfilePicUpload(event)}
              />
              <label htmlFor="icon-button-file">
                <IconButton component="span" color="primary">
                  <UploadTwoToneIcon />
                </IconButton>
              </label>
            </ButtonUploadWrapper>
          </AvatarWrapper>

          <Box py={2} pl={2} mb={3}>
            <Typography gutterBottom variant="h4">
              {_worker.email || <Skeleton variant="text" width={210} />}
            </Typography>
            <Typography variant="subtitle2">
              {`E-${leadingZeroes(_worker?.userId, 3)}` || (
                <Skeleton variant="text" width={100} />
              )}
            </Typography>
            <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
              {_worker?.status && getStatusLabel(_worker?.status)}
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
                  endIcon={<CreditCardIcon />}
                  onClick={() => setIsCard(true)}
                >
                  Generate Profile Card
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      </Grid>

      <Grid item xs={12} md={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Personal Details
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage informations related to personal details
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
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Full Name:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>
                          {' '}
                          {`${_worker?.fullName}` || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Date of birth:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>
                          {' '}
                          {formatDate(_worker?.dob) || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Contact Number:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>
                          {' '}
                          {_worker?.phoneNumber || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Email address:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>
                          {' '}
                          {_worker?.email || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Address:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 500 } }}>
                        <Text color="black">
                          <b>
                            {' '}
                            {_worker?.address || (
                              <Skeleton variant="text" width={210} />
                            )}
                          </b>
                        </Text>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Gender:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 600 } }}>
                        <Text color="black">
                          <b>
                            {' '}
                            {_worker?.gender || (
                              <Skeleton variant="text" width={210} />
                            )}
                          </b>
                        </Text>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Nationality:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 600 } }}>
                        <Text color="black">
                          <b>
                            {' '}
                            {_worker?.nationality || (
                              <Skeleton variant="text" width={210} />
                            )}
                          </b>
                        </Text>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Emergency Contact:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 600 } }}>
                        <Text color="black">
                          <b>
                            {' '}
                            {_worker?.emergencyContact || (
                              <Skeleton variant="text" width={210} />
                            )}
                          </b>
                        </Text>
                      </Box>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Account Settings
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage details related to account
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle2">
                  <Grid container spacing={0}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Employee Number:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Text color="black">
                        <b>
                          {' '}
                          {`E-${leadingZeroes(_worker?.userId, 3)}` || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Registered as:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Text color="black">
                        <b>
                          {' '}
                          {_worker.userType || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Account Type:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Text color="black">
                        <b>
                          {_worker.role || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
                      </Text>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Account status:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      {_worker?.status && getStatusLabel(_worker?.status)}
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Bank Details
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage bank details related to worker
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle2">
                  <Grid container spacing={0}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        ABN:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Text color="black">
                        <b>
                          {' '}
                          {_worker?.abn || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Name Of Bank:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Text color="black">
                        <b>
                          {' '}
                          {_worker?.nameOfBank || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        BSB:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Text color="black">
                        <b>
                          {_worker?.bsb || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        Account Number:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Text color="black">
                        <b>
                          {_worker?.accountNumber || (
                            <Skeleton variant="text" width={210} />
                          )}
                        </b>
                      </Text>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            {_worker?.id && (
              <WorkerDocuments
                workerId={_worker?.id}
                employeeId={_worker?.userId}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Modal
        isOpen={isEdit}
        handleClose={handleModalClose}
        content={
          <CreateWorkerForm onSuccess={handleModalClose} formData={_worker} />
        }
        modalHeader={'Update worker'}
        modalDescription={
          'Fill the forum and press update button to update the selected worker.'
        }
      />

      <Modal
        isOpen={isCard}
        handleClose={handleModalClose}
        content={
          <WorkerCard
            data={{
              avatar:
                _worker?.profPic &&
                `${BASE_URL}/documents/prof-pic/${_worker?.profPic}`,
              name: _worker.fullName,
              type: _worker.userType,
              mobile: _worker.phoneNumber,
              email: _worker.email,
              address: _worker.address
            }}
          />
        }
        modalHeader={'Worker Card'}
      />
    </Grid>
  );
};

export default WorkerEditTab;
