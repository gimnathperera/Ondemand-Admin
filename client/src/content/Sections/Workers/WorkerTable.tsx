import { FC, ChangeEvent, useState } from 'react';
import leadingZeroes from 'leading-zeroes';

import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
  TableContainer,
  CardHeader,
  Button
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Label from 'src/components/Label';
import { formatDate } from 'src/common/functions';
import { updateWorker, sendEmail } from '../../../store/actions/worker.actions';
import {
  AGREEMENT_DOC_NAME,
  AGREEMENT_MESSAGE,
  AGREEMENT_SUBJECT
} from 'src/constants/common-configurations';

interface NewApplicantTableProps {
  className?: string;
  workers?: any[];
}
export type ApplicantStatus = 'Pending' | 'Active' | 'Deactivated';

interface Filters {
  status?: ApplicantStatus;
}

const NewApplicantTable: FC<NewApplicantTableProps> = ({ workers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const selectedBulkActions = selectedWorkers.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [openAccept, setOpenAccept] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);

  const handleAcceptOpen = (id: string) => {
    setSelectedApplicantId(id);
    setOpenAccept(true);
  };

  const handleAcceptClose = () => {
    setSelectedApplicantId(null);
    setOpenAccept(false);
  };

  const handleDeclineOpen = (id: string) => {
    setSelectedApplicantId(id);
    setOpenDecline(true);
  };

  const handleDeclineClose = () => {
    setSelectedApplicantId(null);
    setOpenDecline(false);
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

  const applyFilters = (_workers: any, filters: Filters): any => {
    return _workers.filter((worker) => {
      let matches = true;

      if (filters.status && worker.status !== Number(filters.status)) {
        matches = false;
      }

      return matches;
    });
  };

  const applyPagination = (_workers: any, page: number, limit: number): any => {
    return _workers.slice(page * limit, page * limit + limit);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleAcceptApplicant = () => {
    try {
      dispatch(
        updateWorker({ id: selectedApplicantId, data: { status: 'Active' } })
      );
      setOpenAccept(false);
    } catch (err) {}
  };

  const handleDeclineApplicant = () => {
    try {
      dispatch(
        updateWorker({
          id: selectedApplicantId,
          data: { status: 'Deactivated' }
        })
      );
      setOpenDecline(false);
    } catch (err) {}
  };

  const filteredWorkers = applyFilters(workers, filters);

  const paginatedWorkers = applyPagination(filteredWorkers, page, limit);

  const theme = useTheme();

  const handleDetailedClick = (workerId: string) => {
    navigate(`/app/workers/${workerId}`);
  };

  const handleEmailSend = (workerEmail: string) => {
    try {
      const payLoad = {
        email: workerEmail,
        subject: AGREEMENT_SUBJECT,
        text: AGREEMENT_MESSAGE,
        attachment: AGREEMENT_DOC_NAME
      };

      dispatch(sendEmail(payLoad));
    } catch (err) {}
  };

  return (
    <Card>
      <CardHeader title="Workers" />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Registered Date</TableCell>
              <TableCell align="center">Worker Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">E-mail</TableCell>
              <TableCell align="center">Date of Birth</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Payment</TableCell>
              <TableCell align="center">Emergency Contact</TableCell>
              <TableCell align="center">Worker Type</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedWorkers.map((worker: any) => {
              const isWorkerSelected = selectedWorkers.includes(worker.id);
              return (
                <TableRow hover key={worker.id} selected={isWorkerSelected}>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '15px',
                        justifyContent: 'center'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          columnGap: '15px',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          align="left"
                        >
                          {formatDate(worker?.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <Button onClick={() => handleDetailedClick(worker?.id)}>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        fontWeight="bold"
                        gutterBottom
                        noWrap
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {`E-${leadingZeroes(worker?.userId, 3)}` || '-'}
                      </Typography>
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight="bold"
                      gutterBottom
                      noWrap
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {`${worker?.fullName}`}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {worker.email}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {formatDate(worker.dob)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {worker?.gender || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      <span style={{ fontWeight: 'bold' }}>Day shift</span>{' '}
                      {`- ${worker?.dayShiftPayment || '-'}.00$`}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      <span style={{ fontWeight: 'bold' }}>Night shift</span>{' '}
                      {`- ${worker?.nightShiftPayment || '-'}.00$`}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {worker?.emergencyContact || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">{worker.userType}</TableCell>
                  <TableCell align="center">
                    {getStatusLabel(worker.status)}
                  </TableCell>

                  <TableCell align="center">
                    {worker.status == 'Active' ? (
                      <Tooltip title="Deactivate" arrow>
                        {loading ? (
                          <CircularProgress size={20} color="error" />
                        ) : (
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              }
                            }}
                            color="error"
                            size="medium"
                            onClick={() => handleDeclineOpen(worker?.id)}
                          >
                            <ClearIcon />
                          </IconButton>
                        )}
                      </Tooltip>
                    ) : (
                      <Tooltip title="Activate" arrow>
                        {loading ? (
                          <CircularProgress size={20} color="success" />
                        ) : (
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              }
                            }}
                            color="success"
                            size="medium"
                            onClick={() => handleAcceptOpen(worker?.id)}
                          >
                            <CheckIcon />
                          </IconButton>
                        )}
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredWorkers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <Dialog
        open={openAccept}
        onClose={handleAcceptClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAcceptClose}>Cancel</Button>
          <Button onClick={handleAcceptApplicant} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDecline}
        onClose={handleDeclineClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeclineClose}>Cancel</Button>
          <Button onClick={handleDeclineApplicant} autoFocus>
            Decline
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default NewApplicantTable;
