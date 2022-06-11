import { FC, ChangeEvent, useState } from 'react';
import leadingZeroes from 'leading-zeroes';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
  CardHeader,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import moment from 'moment';

import Label from 'src/components/Label';
import Modal from 'src/components/Modal';
import UpdateJobForm from './UpdateJobForm';
import { CryptoOrder } from 'src/models/crypto_order';
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT
} from 'src/constants/common-configurations';
import _ from 'lodash';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders?: CryptoOrder[];
  jobs?: any[];
}

const JobTable: FC<RecentOrdersTableProps> = ({ jobs }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<any>({});

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const getStatusLabel = (jobStatus: any): JSX.Element => {
    const map = {
      Pending: {
        text: 'Pending',
        color: 'warning'
      },
      Active: {
        text: 'Active',
        color: 'success'
      },
      Completed: {
        text: 'Completed',
        color: 'info'
      }
    };

    const { text, color }: any = map[jobStatus];

    return <Label color={color}>{text}</Label>;
  };

  const applyPagination = (_jobs: any, page: number, limit: number): any => {
    return _jobs.slice(page * limit, page * limit + limit);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleEditWorker = (job: any) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const paginatedJobs = applyPagination(jobs, page, limit);

  const handleDetailedClick = (jobId: string) => {
    navigate(`/app/jobs/${jobId}`);
  };

  const getAssignedWorkers = (workers: any[]) => {
    return <>{workers.length > 0 ? <p>{workers.length}</p> : <p>0</p>}</>;
  };

  return (
    <Card>
      <CardHeader title="Jobs" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Job ID</TableCell>
              <TableCell align="center">Job Name</TableCell>
              <TableCell align="center">Job Schedule Type</TableCell>
              <TableCell align="center">Number of Workers</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedJobs.map((job: any) => {
              return (
                <TableRow hover key={job?.id}>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {moment(job?.createdAt).format(DATE_TIME_FORMAT) || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '15px',
                        justifyContent: 'center'
                      }}
                    >
                      <Box>
                        <Button onClick={() => handleDetailedClick(job?.id)}>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                            align="left"
                          >
                            {`J-${leadingZeroes(job?.jobId, 3)}`}
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {job?.name || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {job?.scheduleType || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {job?.workers && getAssignedWorkers(job?.workers)}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {moment(job?.startDate).format(DATE_FORMAT) || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {moment(job?.endDate).format(DATE_FORMAT) || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    {getStatusLabel(job.status)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: '#5569FF'
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleEditWorker(job)}
                      >
                        <EditTwoToneIcon />
                      </IconButton>
                    </Tooltip>
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
          count={jobs.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <Modal
        isOpen={modalOpen}
        handleClose={handleModalClose}
        content={
          <UpdateJobForm onSuccess={handleModalClose} formData={selectedJob} />
        }
        modalHeader={'Update Job'}
        modalDescription={
          'Fill the forum and press submit button to update job.'
        }
      />
    </Card>
  );
};

export default JobTable;
