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
  Button,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { convertTimeValue } from 'src/common/functions';
import moment from 'moment';
import _ from 'lodash';

import Label from 'src/components/Label';
import Modal from 'src/components/Modal';
import ShiftTable from '../Jobs/ShiftTable';

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

const ReportTable: FC<ReportTableProps> = ({ reports }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shifts, setShifts] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<string>('');

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

  const handleModalClose = () => {
    setShifts([]);
    setCurrentUser('');
    setIsOpen(false);
  };

  const viewSchedules = (workers, currentWorkerId, fullName) => {
    const selectedWorker = _.find(
      workers,
      (user) => user.worker === currentWorkerId
    );

    setShifts(selectedWorker?.shifts);
    setCurrentUser(fullName);
    setIsOpen(true);
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
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        viewSchedules(
                          report?.job?.workers,
                          report?.worker?._id,
                          report?.worker?.fullName
                        )
                      }
                    >
                      View schedule
                    </Button>
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
      <Modal
        isOpen={isOpen}
        width={800}
        handleClose={handleModalClose}
        content={<ShiftTable data={shifts} />}
        modalHeader={`${currentUser} | Shift Allocation`}
      />
    </>
  );
};

export default ReportTable;
