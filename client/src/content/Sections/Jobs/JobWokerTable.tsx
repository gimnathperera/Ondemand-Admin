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
  TablePagination
} from '@mui/material';
import moment from 'moment';
import Label from 'src/components/Label';
import { DATE_FORMAT } from 'src/constants/common-configurations';
import { convertTimeValue } from 'src/common/functions';

const JobWokerTable = ({ jobWorkerList }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

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
              <TableCell align="center">Time Duration</TableCell>
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
                      {shifts?.map(({ workerStartTime, workerEndTime }) => (
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
                            {convertTimeValue(workerStartTime) || '-'}
                          </Typography>
                          -
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {convertTimeValue(workerEndTime) || '-'}
                          </Typography>
                        </Box>
                      ))}
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
    </Card>
  );
};

export default JobWokerTable;
