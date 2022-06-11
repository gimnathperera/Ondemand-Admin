import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { fetchLatestJobsByWorker } from '../../../store/actions/job.actions';
import { convertTimeValue, getWorkingHours } from 'src/common/functions';
import { DATE_FORMAT } from 'src/constants/common-configurations';

interface JobScheduleProps {
  workerId: string | number;
}
const style: any = {
  jobTxt: {
    fontWeight: 'bold',
    maxWidth: '400px'
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    minHeight: '80px',
    display: 'flex',
    minWidth: '258px',
    textAlign: 'justify',
    flexDirection: 'column',
    margin: 2,
    '@media (max-width: 1440px)': {
      minWidth: '100px'
    }
  },
  emptyJobCard: {
    backgroundColor: 'rgba(247, 151, 28, 0.5)',
    borderRadius: '10px',
    padding: '20px',
    minHeight: '80px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minWidth: '258px',
    alignItems: 'center',
    '@media (max-width: 1440px)': {
      minWidth: '100px'
    }
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '20px'
  },
  mSubmitBtn: {
    borderRadius: '10px',
    background: '#034DA1',
    color: '#fff',
    height: '35px',
    fontWeight: '300',
    textTransform: 'none',
    minWidth: '155px',
    '&:hover': { background: '#303f9f !important' },
    '@media (max-width: 1440px)': {
      maxWidth: '155px'
    }
  },
  mCancelBtn: {
    borderRadius: '10px',
    background: '#FF0404',
    color: '#fff',
    height: '35px',
    fontWeight: '300',
    textTransform: 'none',
    minWidth: '155px',
    '&:hover': { background: '#cc0303 !important' },
    '@media (max-width: 1440px)': {
      minWidth: '100px'
    }
  },
  jobCardContainer: {
    padding: '20px'
  },
  btnList: {
    '@media (max-width: 768px)': {
      paddingLeft: '0px !important',
      paddingRight: '0px !important'
    }
  },
  jobSubText: {
    fontWeight: 'normal',
    fontSize: 15,
    fontStyle: 'italic',
    paddingLeft: '5px'
  },
  flatList: {
    rowGap: '15px',
    padding: 4,
    maxHeight: '400px',
    flexWrap: 'nowrap',
    overflowY: 'auto'
  },
  spinnerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const WorkerJobSchedule = ({ workerId }: JobScheduleProps) => {
  const dispatch = useDispatch();
  const dailyJobs = useSelector(
    ({ dailyJob }: RootStateOrAny) => dailyJob.list
  );
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    dispatch(
      fetchLatestJobsByWorker({
        workerId,
        jobDate: moment().format(DATE_FORMAT)
      })
    );
  }, []);

  return (
    <>
      {loading ? (
        <Paper sx={style.jobCard}>
          <Box sx={style.spinnerContainer}>
            <CircularProgress />
          </Box>
        </Paper>
      ) : (
        <>
          {dailyJobs.length > 0 ? (
            <>
              {dailyJobs.map(
                ({ company, site_address, site, start_time, end_time }) => (
                  <Paper sx={style.jobCard}>
                    <Typography sx={style.jobTxt}>
                      Date:{' '}
                      <span style={style.jobSubText}>
                        {moment().format(DATE_FORMAT)}
                      </span>
                    </Typography>
                    <Typography sx={style.jobTxt}>
                      Client: <span style={style.jobSubText}>{company}</span>
                    </Typography>
                    <Typography sx={style.jobTxt}>
                      Site: <span style={style.jobSubText}>{site}</span>
                    </Typography>
                    <Typography sx={style.jobTxt}>
                      Site Address:{' '}
                      <span style={style.jobSubText}>{site_address}</span>
                    </Typography>
                    <Typography sx={style.jobTxt}>
                      Shift Time:{' '}
                      <span style={style.jobSubText}>
                        {convertTimeValue(start_time) || '-'} -{' '}
                        {convertTimeValue(end_time) || '-'}
                      </span>
                    </Typography>
                    <Typography sx={style.jobTxt}>
                      Hours:{' '}
                      <span style={style.jobSubText}>
                        {getWorkingHours(start_time, end_time)} Hours
                      </span>
                    </Typography>
                    <Typography sx={style.jobTxt}>
                      Notes: <span style={style.jobSubText}>TBA</span>
                    </Typography>
                  </Paper>
                )
              )}
            </>
          ) : (
            <Paper sx={style.jobCard}>
              <Box sx={style.spinnerContainer}>
                <Typography sx={style.jobTxt}>
                  No Jobs Available Today
                </Typography>
              </Box>
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default WorkerJobSchedule;
