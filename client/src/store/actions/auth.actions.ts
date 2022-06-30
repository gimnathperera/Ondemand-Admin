import { USER_LOGIN, CLEAR_REDUX_STORE } from '../../constants/common-constant';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload
});


export const userLogout = () => {
  return {
    type: CLEAR_REDUX_STORE
  };
};
