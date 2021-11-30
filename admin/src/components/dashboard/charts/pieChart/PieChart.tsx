import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Paper } from '@mui/material';
ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = ({allOrders}: any) => {
  let dishesInOrders: number[] = [0, 0, 0, 0, 0];
  let totalDishes = 0;

 allOrders.forEach((order: any) => {

   if (order.dish.length > 0) {
     let dishesInOrder = 0;
     order.dish.forEach((dish: any) => {
      dishesInOrder += dish.OrderDish.quantity;
      // console.log(dishesInOrder, 'dishes in order')
      totalDishes += dish.OrderDish.quantity;
      // console.log(totalDishes, 'total dishes')
     });
     if (dishesInOrder < 5) {
       dishesInOrders[dishesInOrder-1]++;
     } else {
      dishesInOrders[4]++;
     }
   }
 })

 const options = {
  plugins: {
  title: {
    display: true,
    text: 'Количество блюд в заказе',
  },
},}
console.log(dishesInOrders)
const data = {
  labels: ['Одно', 'Два', 'Три', 'Четыре', 'Пять и более'],
  datasets: [
    {
      label: '# of Votes',
      data: dishesInOrders,
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      hoverOffset: 20,
      responsive: true,
    },
  ],
};

  return <Paper elevation={4} sx={{p: 4}}><Pie options={options} data={data} /></Paper>;
}

export default PieChart;
