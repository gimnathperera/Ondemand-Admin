import { Box, IconButton, Tooltip, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatDistance, subMinutes } from 'date-fns';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

import { stringAvatar } from 'src/common/functions';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);

function TopBarContent({ workerName }) {
  return (
    <>
      <RootWrapper>
        <Box sx={{ display: { sm: 'flex' } }} alignItems="center">
          <Avatar variant="rounded" {...stringAvatar(workerName)} />

          <Box sx={{ pl: { sm: 1.5 }, pt: { xs: 1.5, sm: 0 } }}>
            <Typography variant="h4" gutterBottom>
              {workerName}
            </Typography>
            <Typography variant="subtitle2">
              {formatDistance(subMinutes(new Date(), 8), new Date(), {
                addSuffix: true
              })}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: { xs: 3, md: 0 }
          }}
        >
          <Tooltip placement="bottom" title="Conversation information">
            <IconButton color="primary">
              <InfoTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </RootWrapper>
    </>
  );
}

export default TopBarContent;
