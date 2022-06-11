import { FC } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/material';
import moment from 'moment';

interface DetailedChart {
  data: any[];
  labels: string[];
}

const DetailedChart: FC<DetailedChart> = ({ labels, data }) => {
  const theme = useTheme();
  const startOfMonth = moment().clone().startOf('month').format('YYYY/MM/DD');
  const endOfMonth = moment().clone().endOf('month').format('YYYY/MM/DD');

  const _data = {
    labels,
    datasets: [
      {
        label: 'Working Hours',
        data,
        fill: true,
        backgroundColor: '#9AD0F5',
        borderColor: '#001E3C'
      }
    ]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true
    },
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            min: startOfMonth,
            max: endOfMonth
          },
          gridLines: {
            display: true,
            drawBorder: true
          },
          ticks: {
            display: true
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true
          },
          ticks: {
            display: true,
            min: 0, 
            max: 10 
          }
        }
      ]
    },
    tooltips: {
      enabled: true,
      mode: 'nearest',
      intersect: false,
      caretSize: 6,
      displayColors: false,
      yPadding: 8,
      xPadding: 16,
      borderWidth: 4,
      borderColor: theme.palette.common.black,
      backgroundColor: theme.palette.common.black,
      titleFontColor: theme.palette.common.white,
      bodyFontColor: theme.palette.common.white,
      footerFontColor: theme.palette.common.white
    }
  };

  return (
    <div>
      <Bar data={_data} options={options} />
    </div>
  );
};

DetailedChart.propTypes = {
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired
};

export default DetailedChart;
