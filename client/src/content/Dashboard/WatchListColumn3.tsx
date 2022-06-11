import { Card, Box, Typography } from '@mui/material';

import TodayBackgroundImage from '../../assets/images/today.svg';

function WatchListColumn3({ count }) {
  return (
    <Card
      sx={{
        backgroundImage: `url(${TodayBackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        borderRadius: '20px',
        boxShadow: ' 0px 4px 4px #cddbec',
        backgroundColor: '#D8EBFB'
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box display="flex" alignItems="center">
          <Box>
            <Typography
              variant="h4"
              noWrap
              color="#034DA1"
              sx={{
                fontSize: '24px',
                letterSpacing: '0.2px',
                fontWeight: '600'
              }}
            >
              New Applicants
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            pt: 3
          }}
        >
          <Typography
            variant="h2"
            color="#034DA1"
            sx={{
              fontSize: '35px',
              pr: 1,
              mb: 1,
              letterSpacing: '0.2px',
              fontWeight: '600'
            }}
          >
            {count || '-'}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        ></Box>
      </Box>
      <Box height={60} sx={{ ml: -1.5 }}></Box>
    </Card>
  );
}

export default WatchListColumn3;
