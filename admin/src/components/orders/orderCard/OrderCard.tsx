import React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import dayjs from 'dayjs';
import { Button, Container, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OrderCard = ({currentOrder, openCard, handleCloseCard}: any) => {

  const {id, adress, contact_phone, contact_name, createdAt, delivery_date, delivery_method, OrderDishes, payment_method, status, total_price, reserve_id} = currentOrder;
  
  const payment = ['Наличными', 'Картой онлайн', 'Картой на месте']
  return (
    <>
      <Dialog open={openCard} onClose={handleCloseCard} TransitionComponent={Transition} fullWidth/* ={OrderDishes && OrderDishes.length > 0 ? true : false} */  maxWidth={"lg"}>
        <DialogTitle><Container sx={{textAlign: "center"}}>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h3">
          Заказ № {id}
        </Typography>
        </Container>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Дата заказа: <span>{dayjs(createdAt).format('HH:mm DD-MM-YYYY') }</span>
          </DialogContentText>
          <DialogContentText>
          Дата готовности: <span>{dayjs(delivery_date).format('HH:mm DD-MM-YYYY') }</span>
          </DialogContentText>
          <DialogContentText>
          Статус заказа: <span>{status}</span>
          </DialogContentText>
          <Typography variant="body1">{delivery_method === 'delivery' && <span> Доставка по адресу: {adress}</span>}{delivery_method === 'bookTable' ? <span> Заказ столика: {reserve_id}</span> : <span>Самовывоз</span>}</Typography>
          <Typography variant="body1"><span>Клиент: {contact_name}</span>. Тел.:<span>{contact_phone}</span></Typography>
          <Typography variant="h4" sx={{fontWeight: "bold"}}>Блюда в заказе:</Typography>
          <TableContainer component={Paper} sx={{my: 2}}>
          <Table sx={{ minWidth: 650}} aria-label="Детали заказа">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: "bold"}}>Название блюда</TableCell>
            <TableCell sx={{fontWeight: "bold"}} align="right">Исключить ингредиенты</TableCell>
            <TableCell sx={{fontWeight: "bold"}} align="right">Количество</TableCell>
            <TableCell sx={{fontWeight: "bold"}} align="right">Вес&nbsp;(гр.)</TableCell>
            <TableCell sx={{fontWeight: "bold"}} align="right">Цена&nbsp;(руб.)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {OrderDishes && OrderDishes.map((row: any, index: number) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Dish.title}
              </TableCell>
              <TableCell align="right">{row.excluded_ingredients && row.excluded_ingredients}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.Dish.weight}</TableCell>
              <TableCell align="right">{row.Dish.price * row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <Typography variant="h4">Итого: {total_price} руб.</Typography>
      <Typography variant="h4">Оплата: {payment[payment_method]}</Typography>
      </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCard}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default OrderCard;