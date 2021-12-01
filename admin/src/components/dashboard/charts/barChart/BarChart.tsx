import React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import dayjs from 'dayjs';
import "dayjs/locale/ru";

dayjs.locale("ru");
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: `Выручка за ${dayjs().subtract(30, 'day').format('DD MMMM YYYY')} - ${dayjs().format('DD MMMM YYYY')} по типам заказов`,
    },
  },
  responsive: true,
  aspectRatio: 5,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};


const BarChart = ({allOrders}: any) => {
    

   /*  allOrders.filter((order: any) => {
        // dayjs(order.delivery_date) > dayjs().subtract(30, 'day')
        console.log( dayjs(order.delivery_date))
    return 'hi'
}); */
    let labels = [];
    for (let i = 0; i <= 30; i++ ){
        labels[i] = dayjs().subtract(30 - i, 'day').date();
    }

    // const deliveryFilter = (type: string) => allOrders.filter((order: any) => order.delivery_method === type);
    
     const data = {
        labels,
        datasets: [
          {
            label: 'Доставка',
            data: labels.map((date: number) =>  allOrders.reduce((acc: any, order: any) => date === dayjs(order.delivery_date).date() && order.delivery_method === 'delivery' ? acc + order.total_price : acc, 0)),
            backgroundColor: 'rgb(255, 99, 132)',
          },
          {
            label: 'Самовывоз',
            data: labels.map((date: number) =>  allOrders.reduce((acc: any, order: any) => date === dayjs(order.delivery_date).date() && order.delivery_method === 'takeaway' ? acc + order.total_price : acc, 0)),
            backgroundColor: 'rgb(75, 192, 192)',
          },
          {
            label: 'Заказ стола',
            data: labels.map((date: number) =>  allOrders.reduce((acc: any, order: any) => date === dayjs(order.delivery_date).date() && order.delivery_method === 'bookTable' ? acc + order.total_price : acc, 0)),
            backgroundColor: 'rgb(53, 162, 235)',
          },
        ],
      };

  return <Paper elevation={4} sx={{padding: 3}}><Bar options={options} data={data} /></Paper>;
}

export default BarChart;