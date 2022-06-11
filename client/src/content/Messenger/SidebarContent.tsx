import { useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  IconButton,
  InputAdornment,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useSelector, RootStateOrAny } from 'react-redux';
import { stringAvatar } from 'src/common/functions';
import AllMessages from './AllMessages';
import UnreadMessages from './UnreadMessages';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `
);

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(3)};
                font-size: ${theme.typography.pxToRem(16)};
                color: ${theme.colors.alpha.black[50]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${theme.colors.alpha.black[100]};
            }
        }
  `
);

function SidebarContent({ handleChatClick }) {
  const [currentTab, setCurrentTab] = useState<string>('all');

  const currentUser = useSelector(({ auth }: RootStateOrAny) => auth.user);

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const onChatClick = (worker: any) => {
    handleChatClick(worker);
  };

  return (
    <RootWrapper>
      <Box display="flex" alignItems="flex-start">
        <Avatar
          variant="rounded"
          {...stringAvatar(
            `${currentUser?.fullName?.split(' ')[0]} ${
              currentUser?.fullName?.split(' ')[1]
            }`
          )}
        />

        <Box sx={{ ml: 1.5, flex: 1 }}>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h5" noWrap>
                {`${currentUser?.fullName}`}
              </Typography>
              <Typography variant="subtitle1" noWrap>
                {'Admin'}
              </Typography>
            </Box>

            <IconButton sx={{ p: 1 }} size="small" color="primary">
              <SettingsTwoToneIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <TextField
        sx={{ mt: 2, mb: 1 }}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          )
        }}
        placeholder="Search..."
      />

      <Typography sx={{ mb: 1, mt: 2 }} variant="h3">
        Chats
      </Typography>

      <TabsContainerWrapper>
        <Tabs
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </TabsContainerWrapper>

      <Box mt={2}>
        {currentTab === 'all' && <AllMessages onChatClick={onChatClick} />}
        {currentTab === 'unread' && (
          <UnreadMessages onChatClick={onChatClick} />
        )}
      </Box>
    </RootWrapper>
  );
}

export default SidebarContent;
