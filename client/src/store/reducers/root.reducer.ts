import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { CLEAR_REDUX_STORE } from '../../constants/common-constant';

import commonReducer from './common.reducer';
import authReducer from './auth.reducer';
import workerReducer from './worker.reducer';
import companySiteReducer from './company-site.reducer';
import jobReducer from './job.reducer';
import jobWorkerReducer from './job-worker.reducer';
import dashboardReducer from './dashboard.reducer';
import dailyJobReducer from './daily-job.reducer';
import msgReducer from './msg.reducer';
import reportReducer from './report.reducer';
import newApplicantReducer from './new-applicant-reducer';
import activeWorkerReducer from './active-worker.reducer';
import paymentReducer from './payment.reducer';
import documentReducer from './document.reducer';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [
    'common',
    'worker',
    'companySite',
    'job',
    'jobWorker',
    'dashboard',
    'dailyJob',
    'msg',
    'report',
    'newApplicant',
    'activeWorker',
    'document',
    'payment'
  ]
};

const appReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  worker: workerReducer,
  companySite: companySiteReducer,
  job: jobReducer,
  jobWorker: jobWorkerReducer,
  dashboard: dashboardReducer,
  dailyJob: dailyJobReducer,
  msg: msgReducer,
  report: reportReducer,
  newApplicant: newApplicantReducer,
  activeWorker: activeWorkerReducer,
  document: documentReducer,
  payment: paymentReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === CLEAR_REDUX_STORE) {
    state = undefined;
    storage.removeItem('persist:root');
  }

  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);
