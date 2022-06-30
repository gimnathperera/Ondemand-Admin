import { USER_LOGIN, CLEAR_REDUX_STORE } from '../../constants/common-constant';

//user login action
export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload
});

//clear redux store with persistant
export const userLogout = () => {
  return {
    type: CLEAR_REDUX_STORE
  };
};
