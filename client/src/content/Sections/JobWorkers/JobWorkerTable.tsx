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
  Typography,
  Button
} from '@mui/material';
import _ from 'lodash';
import { styled } from '@mui/material/styles';

import Modal from 'src/components/Modal';
import ShiftTable from 'src/content/Sections/Jobs/ShiftTable';

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shifts, setShifts] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<string>('');

  const applyPagination = (_jobs: any, page: number, limit: number): any => {
    return _jobs.slice(page * limit, page * limit + limit);
  };

  const handleModalClose = () => {
    setShifts([]);
    setCurrentUser('');
    setIsOpen(false);
  };

  const handleMoreShift = (selectedShifts: any, worker: string) => {
    setShifts(selectedShifts);
    setCurrentUser(worker);
    setIsOpen(true);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredReports = reports;

  const paginatedReports = applyPagination(filteredReports, page, limit);

  return (
    <>
      <TableContainer>
        <TableComponent>
          <TableHead>
            <TableRow>
              <TableCell align="center">Worker</TableCell>
              <TableCell align="center">Contact Number</TableCell>
              <TableCell align="center">Emergency Number</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Schedules</TableCell>
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
                          align="center"
                        >
                          {report?.worker?.fullName || '-'}
                          <br />
                          {`E-${leadingZeroes(report?.worker?.userId, 3)}`}
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
                      {`${report?.worker.phoneNumber}` || '-'}
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
                      {`${report?.worker?.emergencyContact}` || '-'}
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
                      {report?.worker?.email || '-'}
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
                      {report?.worker?.address || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        handleMoreShift(
                          report?.shifts,
                          report?.worker?.fullName
                        )
                      }
                    >
                      View schedule
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableComponent>
      </TableContainer>
      <Modal
        isOpen={isOpen}
        width={800}
        handleClose={handleModalClose}
        content={<ShiftTable data={shifts} />}
        modalHeader={`${currentUser} | Shift Allocation`}
      />

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
