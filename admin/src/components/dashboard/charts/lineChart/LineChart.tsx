import React from 'react';
import { Paper } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import dayjs from 'dayjs';
import "dayjs/locale/ru";
dayjs.locale("ru");

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  aspectRatio: 3.53,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: `Средний чек за ${dayjs().subtract(30, 'day').format('DD MMMM YYYY')} - ${dayjs().format('DD MMMM YYYY')} по типам заказов`,
    }
  },
    elements: {
        line: {
            tension: 0.25,
        }
    }
};





const LineChart = ({allOrders}: any) => {
    
    const labels: number[] = [];
for (let i = 0; i <= 30; i++ ){
    labels[i] = dayjs().subtract(30 - i, 'day').date();
}

    const data = {
        labels,
        datasets: [
          {
            label: 'Доставка',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)',
          },
          {
            label: 'Самовывоз',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
          },
          {
            label: 'Заказ стола',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235)',
          },
        ],
      };

  return <Paper elevation={4} sx={{p: 4, mb: 1}}><Line options={options} data={data} /></Paper>;
}

export default LineChart;