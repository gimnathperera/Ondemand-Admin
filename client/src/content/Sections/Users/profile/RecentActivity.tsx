import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';

import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import AddTaskTwoToneIcon from '@mui/icons-material/AddTaskTwoTone';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function RecentActivity({
  totalJobs,
  completedJobs,
  registeredEmployees,
  newEmployees
}) {
  const theme = useTheme();

  return (
    <Card>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <BusinessCenterTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography
            variant="h3"
            color="#9FA2B4"
            sx={{ fontSize: '16px', textAlign: 'center', fontWeight: '600' }}
          >
            Total Jobs
          </Typography>

          <Box pt={2} display="flex">
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography variant="h2">{89}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <DoneAllTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography
            variant="h3"
            color="#9FA2B4"
            sx={{ fontSize: '16px', textAlign: 'center', fontWeight: '600' }}
          >
            Completed Jobs
          </Typography>

          <Box pt={2} display="flex">
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography variant="h2">{78}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <GroupsTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography
            variant="h3"
            color="#9FA2B4"
            sx={{ fontSize: '16px', textAlign: 'center', fontWeight: '600' }}
          >
            Registered Employees
          </Typography>

          <Box pt={2} display="flex">
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography variant="h2">{24}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <AddTaskTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography
            variant="h3"
            color="#9FA2B4"
            sx={{ fontSize: '16px', textAlign: 'center', fontWeight: '600' }}
          >
            New Employees
          </Typography>

          <Box pt={2} display="flex">
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography variant="h2">{85}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Card>
  );
}

export default RecentActivity;
