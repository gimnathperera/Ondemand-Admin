import { FC, ChangeEvent, useState } from 'react';
import leadingZeroes from 'leading-zeroes';
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';

import Label from 'src/components/Label';
import { convertTimeValue } from 'src/common/functions';
import moment from 'moment';
import _ from 'lodash';

interface ReportTableProps {
  reports?: any[];
}

const TableComponent = styled(Table)(
  () => `
    .css-1mhwo98-MuiTypography-root{
      width:185px;
    }
`
);

const JobWorkerTable: FC<ReportTableProps> = ({ reports }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const applyPagination = (_jobs: any, page: number, limit: number): any => {
    return _jobs.slice(page * limit, page * limit + limit);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredReports = reports;

  const paginatedReports = applyPagination(filteredReports, page, limit);

  const getGeoStatus = (status: Boolean) => {
    if (status) {
      return <Label color={'success'}>{'Matched'}</Label>;
    } else {
      return <Label color={'warning'}>{'Unmatched'}</Label>;
    }
  };

  const getShiftStatusLabel = (shiftStatus: string): JSX.Element => {
    const map = {
      Completed: {
        text: 'Completed',
        color: 'success'
      },
      Active: {
        text: 'Active',
        color: 'info'
      }
    };

    const { text, color }: any = map[shiftStatus];

    return <Label color={color}>{text}</Label>;
  };

  const getJobStatusLabel = (jobStatus: string): JSX.Element => {
    const map = {
      Pending: {
        text: 'Pending',
        color: 'warning'
      },
      Active: {
        text: 'Active',
        color: 'info'
      },
      Completed: {
        text: 'Completed',
        color: 'success'
      }
    };

    const { text, color }: any = map[jobStatus];

    return <Label color={color}>{text}</Label>;
  };

  const getShiftTimeList = (
    shifts: Array<any>,
    workerId: string
  ): JSX.Element => {
    const worker = _.filter(shifts, { worker: workerId });

    return (
      <ul>
        {worker[0]?.shifts.map(({ workerStartTime, workerEndTime, _id }) => (
          <li key={_id}>
            {convertTimeValue(workerStartTime) || '-'} -{' '}
            {convertTimeValue(workerEndTime) || '-'}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <TableContainer>
        <TableComponent>
          <TableHead>
            <TableRow>
              <TableCell align="center">Log Date</TableCell>
              <TableCell align="center">Worker ID</TableCell>
              <TableCell align="center">Worker Name</TableCell>
              <TableCell align="center">Shift Status</TableCell>
              <TableCell align="center">Job Status</TableCell>
              <TableCell align="center">Schedule Type</TableCell>
              <TableCell align="center">Assigned Start / End</TableCell>
              <TableCell align="center">Actual Start / End</TableCell>
              <TableCell align="center">Working Hours</TableCell>
              <TableCell align="center">Geo Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.map((report: any) => {
              return (
                <TableRow hover key={report.id}>
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
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          align="left"
                        >
                          {moment(report?.logginDate).format('YYYY-MM-DD') ||
                            '-'}
                          <br />
                          {moment(report?.logginDate).format('dddd') || '-'}
                        </Typography>
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
                      {`E-${leadingZeroes(report?.worker?.userId, 3)}`}
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
                      {`${report?.worker.fullName}` || '-'}
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
                      {getShiftStatusLabel(report?.status) || '-'}
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
                      {getJobStatusLabel(report?.job?.status) || '-'}
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
                      {report?.job?.scheduleType || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center" sx={{ minWidth: '172px' }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {getShiftTimeList(
                        report?.job.workers,
                        report.worker._id
                      ) || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: '172px' }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {convertTimeValue(report?.startTime) || '-'} -{' '}
                      {convertTimeValue(report?.endTime) || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {`${report?.workingHours} Hours` || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {getGeoStatus(report?.locationStatus)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableComponent>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredReports.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </>
  );
};

export default JobWorkerTable;
