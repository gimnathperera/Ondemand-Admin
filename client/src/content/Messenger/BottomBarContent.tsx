import { useState } from 'react';
import {
  Card,
  Avatar,
  Tooltip,
  IconButton,
  Box,
  Button,
  Hidden,
  TextField,
  Divider
} from '@mui/material';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';

import { styled } from '@mui/material/styles';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { stringAvatar } from 'src/common/functions';
import { sendMessage } from 'src/store/actions/msg.action';

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
        height: 40px !important;
        margin: 0 ${theme.spacing(2)};
        align-self: center;
`
);

const Input = styled('input')({
  display: 'none'
});

function BottomBarContent({ to }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const currentUser = useSelector(({ auth }: RootStateOrAny) => auth.user);

  const onSendMessage = () => {
    if (message) {
      const payload = {
        to,
        from: currentUser?._id,
        description: message,
        isFromAdmin: true
      };
      dispatch(sendMessage(payload));
    }
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Hidden mdDown>
        <Avatar
          {...stringAvatar(
            `${currentUser?.fullName.split(' ')[0]} ${
              currentUser?.fullName.split(' ')[1]
            }`
          )}
        />

        <DividerWrapper orientation="vertical" flexItem />
      </Hidden>
      <Box sx={{ flex: 1, mr: 2 }}>
        <TextField
          hiddenLabel
          fullWidth
          placeholder="Write here your message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Box>
      <Tooltip arrow placement="top" title="Choose an emoji">
        <IconButton color="primary">😀</IconButton>
      </Tooltip>
      <Input accept="image/*" id="messenger-upload-file" type="file" />
      <Tooltip arrow placement="top" title="Attach a file">
        <label htmlFor="messenger-upload-file">
          <IconButton color="primary" component="span">
            <AttachFileTwoToneIcon />
          </IconButton>
        </label>
      </Tooltip>
      <Hidden mdDown>
        <DividerWrapper orientation="vertical" flexItem />
        <Button
          startIcon={<SendTwoToneIcon />}
          variant="contained"
          onClick={onSendMessage}
        >
          Send
        </Button>
      </Hidden>
    </Card>
  );
}

export default BottomBarContent;
