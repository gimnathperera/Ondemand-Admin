import { useSelector, RootStateOrAny } from 'react-redux';
import { Typography, Button, Grid } from '@mui/material';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Papa from 'papaparse';

function PageHeader() {
  const reportList = useSelector(({ report }: RootStateOrAny) => report.list);

  const convertedDataset = () => {
    if (reportList?.length > 0) {
      let convertedData = [];
      reportList.map((report: any) => {
        const _report = {
          Date: report?.logginDate,
          JobName: report?.job?.name,
          ShiftStatus: report?.status,
          JobStatus: report?.job?.status,
          ScheduleType: report?.job?.scheduleType,
          CustomerName: report?.job?.customer?.customerName,
          Priority: report?.job?.customer?.priority,
          WorkerName: `${report?.worker?.firstName} ${report?.worker?.lastName}`,
          TimeLog: `${report?.startTime} ${report?.endTime}`,
          GeoLocationStatus: report?.locationStatus
        };

        convertedData.push(_report);
      });
      return convertedData;
    }
  };

  const downloadCSV = (args: any) => {
    if (convertedDataset()) {
      const dataset = convertedDataset();
    
      let filename = args.filename || 'export.csv';
      let columns = args.columns || null;

      let csv = Papa.unparse({ data: reportList, fields: columns });
      if (csv == null) return;

      var blob = new Blob([csv]);
      if ((window.navigator as any).msSaveOrOpenBlob)
        (window.navigator as any).msSaveBlob(blob, args.filename);
      else {
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Job Reports
        </Typography>
        <Typography variant="subtitle2">All reports details</Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<LocalPrintshopIcon fontSize="small" />}
          onClick={() =>
            downloadCSV({
              filename: `ondemand_worker_report_${new Date()
                .toJSON()
                .slice(0, 10)}.csv`,
              data: reportList,
              columns: Object.keys(reportList[0])
            })
          }
        >
          Print Report
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
