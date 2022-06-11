import moment from 'moment';
import { DATE_FORMAT } from 'src/constants/common-configurations';

export const formatDate = (date: string) => {
  return moment(date).format(DATE_FORMAT);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
};

export const convertTimeValue = (timeString: string) => {
  const timeString12hr = new Date(
    '1970-01-01T' + timeString + 'Z'
  ).toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  });
  return timeString12hr;
};

export const getWorkingHours = (_startTime, _endTime) => {
  let startTime = moment(_startTime, 'HH:mm:ss');
  let endTime = moment(_endTime, 'HH:mm:ss');

  // calculate total duration
  let duration: any = moment.duration(endTime.diff(startTime));
  // duration in hours
  let hours = parseInt(duration.asHours());

  return hours;
};
