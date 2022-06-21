import { ChangeEvent, useState } from 'react';
import leadingZeroes from 'leading-zeroes';

import {
  Divider,
  Box,
  Card,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button
} from '@mui/material';
import moment from 'moment';
import Label from 'src/components/Label';
import ShiftTable from './ShiftTable';
import { DATE_FORMAT } from 'src/constants/common-configurations';
import Modal from 'src/components/Modal';

const JobWokerTable = ({ jobWorkerList }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shifts, setShifts] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<string>('');

  const getStatusLabel = (customerStatus: any): JSX.Element => {
    const map = {
      Pending: {
        text: 'Pending',
        color: 'warning'
      },
      Active: {
        text: 'Active',
        color: 'success'
      },
      Deactivated: {
        text: 'Deactivated',
        color: 'error'
      }
    };

    const { text, color }: any = map[customerStatus];

    return <Label color={color}>{text}</Label>;
  };

  const applyPagination = (
    _jobWorkers: any,
    page: number,
    limit: number
  ): any => {
    return _jobWorkers.slice(page * limit, page * limit + limit);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleMoreShift = (selectedShifts: any, worker: string) => {
    setShifts(selectedShifts);
    setCurrentUser(worker);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setShifts([]);
    setCurrentUser('');
    setIsOpen(false);
  };

  const paginatedJobWorkers = applyPagination(jobWorkerList, page, limit);

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Worker </TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Contact Number</TableCell>
              <TableCell align="center">User Type</TableCell>
              <TableCell align="center">Working Dates</TableCell>
              <TableCell align="center">Shift Details</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedJobWorkers?.map(
              ({ id, worker, workerEndDate, workerStartDate, shifts }: any) => {
                return (
                  <TableRow hover key={id}>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {`${worker?.fullName}` || '-'}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {`E-${leadingZeroes(worker?.userId, 3)}` || '-'}
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
                        {worker?.email || '-'}
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
                        {worker?.phoneNumber || '-'}
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
                        {worker?.userType || '-'}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around'
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {moment(workerStartDate).format(DATE_FORMAT) || '-'}
                        </Typography>
                        -
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {moment(workerEndDate).format(DATE_FORMAT) || '-'}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          handleMoreShift(shifts, worker?.fullName)
                        }
                      >
                        View schedule
                      </Button>
                    </TableCell>

                    <TableCell align="center">
                      {worker && getStatusLabel(worker?.status)}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={jobWorkerList.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>

      <Modal
        isOpen={isOpen}
        width={800}
        handleClose={handleModalClose}
        content={<ShiftTable data={shifts} />}
        modalHeader={`${currentUser} | Shift Allocation`}
      />
    </Card>
  );
};

export default JobWokerTable;
