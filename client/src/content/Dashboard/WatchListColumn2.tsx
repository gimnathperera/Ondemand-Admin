import { Card, Box, Typography } from '@mui/material';

import ActiveBackgroundImage from '../../assets/images/active.svg';

function WatchListColumn2({ count }) {
  return (
    <Card
      sx={{
        backgroundImage: `url(${ActiveBackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        borderRadius: '20px',
        boxShadow: ' 0px 4px 4px #b9d9d1',
        backgroundColor: '#E8F3EF'
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box display="flex" alignItems="center">
          <Box>
            <Typography
              variant="h4"
              noWrap
              color="#17805B"
              sx={{
                fontSize: '24px',
                letterSpacing: '0.2px',
                fontWeight: '600'
              }}
            >
              Active Workers
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
            color="#17805B"
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

export default WatchListColumn2;
