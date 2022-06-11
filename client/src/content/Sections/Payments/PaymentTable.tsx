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
  useTheme,
  Tooltip,
  IconButton
} from '@mui/material';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import fileDownload from 'js-file-download';
import axios from 'axios';

import { BASE_URL } from 'src/constants/common-configurations';
import Label from 'src/components/Label';
import CurrencyFormat from 'react-currency-format';

import moment from 'moment';
import _ from 'lodash';

interface ReportTableProps {
  payments?: any[];
}

const TableComponent = styled(Table)(
  () => `
    .css-1mhwo98-MuiTypography-root{
      width:185px;
    }
`
);

const PaymentTable: FC<ReportTableProps> = ({ payments }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const theme = useTheme();

  const applyPagination = (
    _payments: any,
    page: number,
    limit: number
  ): any => {
    return _payments.slice(page * limit, page * limit + limit);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredPayments = payments;

  const paginatedReports = applyPagination(filteredPayments, page, limit);

  const handleFileDownload = async (docKey: string) => {
    try {
      const DOWNLOAD_URL = `${BASE_URL}/documents/${docKey}`;
      await handleDownload(DOWNLOAD_URL, docKey);
    } catch (err) {}
  };

  const handleDownload = async (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: 'blob'
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <>
      <TableContainer>
        <TableComponent>
          <TableHead>
            <TableRow>
              <TableCell align="center">Log Date</TableCell>
              <TableCell align="center">Payslip ID</TableCell>
              <TableCell align="center">Worker Name</TableCell>
              <TableCell align="center">Reference Invoice</TableCell>
              <TableCell align="center">Bank Details</TableCell>
              <TableCell align="center">Total Payment</TableCell>
              <TableCell align="center">Payment Status</TableCell>
              <TableCell align="center">Action</TableCell>
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
                          {moment(report?.createdAt).format('YYYY-MM-DD') ||
                            '-'}
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
                      {report?.paySlipKey?.split('.')?.[0] || '-'}
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
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {`E-${leadingZeroes(report?.worker?.userId, 3)}` || '-'}
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
                      {report?.invoiceId || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        ABN-{report?.worker?.abn}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        Bank Name-{report?.worker?.nameOfBank}
                      </Typography>

                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        BSB-{report?.worker?.bsb}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <CurrencyFormat
                      value={report?.totalPayment}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                      suffix={'.00'}
                      renderText={(value) => (
                        <div style={{ fontWeight: 'bold' }}>{value}</div>
                      )}
                    />
                  </TableCell>

                  <TableCell align="center" sx={{ minWidth: '172px' }}>
                    {report?.isSend ? (
                      <Label color="success">Sent</Label>
                    ) : (
                      <Label color="warning">Not Sent</Label>
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      height: '108px'
                    }}
                  >
                    <Tooltip title="Download Payslip" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          }
                        }}
                        color="success"
                        size="medium"
                        onClick={() => handleFileDownload(report?.paySlipKey)}
                      >
                        <CloudDownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Send Payslip" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          }
                        }}
                        color="info"
                        size="medium"
                      >
                        <SendIcon />
                      </IconButton>
                    </Tooltip>
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
          count={filteredPayments.length}
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

export default PaymentTable;
