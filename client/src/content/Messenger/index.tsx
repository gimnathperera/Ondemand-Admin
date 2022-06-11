import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

import TopBarContent from './TopBarContent';
import BottomBarContent from './BottomBarContent';
import SidebarContent from './SidebarContent';
import ChatContent from './ChatContent';
import PlaceHolder from './PlaceHolder';
import { fetchChatByUser, updateMessage } from 'src/store/actions/msg.action';

const RootWrapper = styled(Box)(
  () => `
       height: 100%;
       display: flex;
`
);

const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`
);

const ChatWindow = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
);

const ChatTopBar = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        padding: ${theme.spacing(3)};
`
);

const ChatMain = styled(Box)(
  () => `
        flex: 1;
`
);

const ChatBottomBar = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(3)};
`
);

const SpinnerContainer = styled(Box)(
  ({ theme }) => `
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
);

function ApplicationsMessenger() {
  const ref = useRef<any>(null);
  const dispatch = useDispatch();
  const [worker, setWorker] = useState<any>('');

  const currentChat = useSelector(({ msg }: RootStateOrAny) => msg.currentChat);
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollToBottom();
    }
  });

  useEffect(() => {
    if (worker) {
      dispatch(fetchChatByUser(worker.id));
      dispatch(updateMessage({ id: worker.id }));
    }
  }, [worker]);

  const onChatClick = (worker: any) => {
    setWorker(worker);
  };

  return (
    <>
      <Helmet>
        <title>Messenger</title>
      </Helmet>
      <RootWrapper>
        <Sidebar>
          <Scrollbars autoHide>
            <SidebarContent handleChatClick={onChatClick} />
          </Scrollbars>
        </Sidebar>
        <ChatWindow>
          {worker ? (
            <>
              {loading ? (
                <SpinnerContainer>
                  <CircularProgress size={20} />
                </SpinnerContainer>
              ) : (
                <>
                  <ChatTopBar>
                    <TopBarContent workerName={worker?.name} />
                  </ChatTopBar>
                  <ChatMain>
                    <Scrollbars ref={ref} autoHide>
                      {currentChat && <ChatContent currentChat={currentChat} />}
                    </Scrollbars>
                  </ChatMain>
                  <ChatBottomBar>
                    <BottomBarContent to={worker?.id} />
                  </ChatBottomBar>
                </>
              )}
            </>
          ) : (
            <PlaceHolder />
          )}
        </ChatWindow>
      </RootWrapper>
    </>
  );
}

export default ApplicationsMessenger;
