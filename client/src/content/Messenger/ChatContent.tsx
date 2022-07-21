import { Box, Avatar, Typography, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import _ from 'lodash';

import { stringAvatar } from 'src/common/functions';
import { DATE_TIME_FORMAT } from 'src/constants/common-configurations';

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

function ChatContent({ currentChat }) {
  return (
    <Box p={3}>
      {currentChat &&
        currentChat?.map(
          ({ from, isFromAdmin, description, createdAt, to }: any) => {
            return !isFromAdmin ? (
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                py={3}
              >
                <Avatar
                  variant="rounded"
                  sx={{ width: 50, height: 50 }}
                  {...stringAvatar(
                    `${to.fullName.split(' ')[0]} ${to.fullName.split(' ')[1]}`
                  )}
                />
                <Box
                  display="flex"
                  alignItems="flex-start"
                  flexDirection="column"
                  justifyContent="flex-start"
                  ml={2}
                >
                  <CardWrapperSecondary>{description}</CardWrapperSecondary>
                  <Typography
                    variant="subtitle1"
                    sx={{ pt: 1, display: 'flex', alignItems: 'center' }}
                  >
                    {moment(createdAt).format(DATE_TIME_FORMAT)}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-end"
                py={3}
              >
                <Box
                  display="flex"
                  alignItems="flex-end"
                  flexDirection="column"
                  justifyContent="flex-end"
                  mr={2}
                >
                  <CardWrapperPrimary>{description}</CardWrapperPrimary>
                  <Typography
                    variant="subtitle1"
                    sx={{ pt: 1, display: 'flex', alignItems: 'center' }}
                  >
                    {moment(createdAt).format(DATE_TIME_FORMAT)}
                  </Typography>
                </Box>
                <Avatar
                  variant="rounded"
                  sx={{ width: 50, height: 50 }}
                  {...stringAvatar(
                    `${from.fullName.split(' ')[0]} ${
                      from.fullName.split(' ')[1]
                    }`
                  )}
                />
              </Box>
            );
          }
        )}
    </Box>
  );
}

export default ChatContent;
