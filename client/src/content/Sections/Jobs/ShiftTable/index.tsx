import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import _ from 'lodash';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function BasicTable({ data }) {
  const convertedData = () => {
    if (data?.length > 0) {
      let _shifts = [];
      data?.map((shift: any) => {
        shift?.dates?.map((date: any) => {
          let tempObj = {
            date: date,
            times: shift?.times
          };
          _shifts.push(tempObj);
        });
      });
      return _shifts;
    }
    return [];
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {convertedData().map((shift, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>
              <h4>{shift?.date}</h4>
              <ul style={{ listStylePosition: 'inside', paddingLeft: 0 }}>
                {shift?.times?.map((time, index) => (
                  <li
                    key={index}
                  >{`${time?.workerStartTime} - ${time?.workerEndTime}`}</li>
                ))}
              </ul>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
