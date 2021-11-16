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

  const {id, adress, contact_phone, contact_name, createdAt, delivery_date, delivery_method, dish, payment_method, status, total_price, reserve_id} = currentOrder;
  
  const payment = ['Наличными', 'Картой онлайн', 'Картой на месте']
  return (
    <div>
      <Dialog open={openCard} onClose={handleCloseCard} TransitionComponent={Transition} fullWidth maxWidth={"lg"}>
        <DialogTitle><Container sx={{textAlign: "center"}}>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h3">
          Заказ номер: {id}
        </Typography>
        </Container>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>Дата заказа: <span>{dayjs(createdAt).format('HH:mm DD-MM-YYYY') }</span></div>
          <div>Дата готовности: <span>{dayjs(delivery_date).format('HH:mm DD-MM-YYYY') }</span></div>
          </DialogContentText>
          <div>{delivery_method === 'delivery' && <span> Доставка по адресу: {adress}</span>}{delivery_method === 'bookTable' ? <span> Заказ столика: {reserve_id}</span> : <span>Самовывоз</span>}</div>
          <div><span>Клиент: {contact_name}</span>. Тел.:<span>{contact_phone}</span></div>
          <h3>Блюда в заказе:</h3>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Название блюда</TableCell>
            <TableCell align="right">Исключить ингредиенты</TableCell>
            <TableCell align="right">Количество</TableCell>
            <TableCell align="right">Вес&nbsp;(гр.)</TableCell>
            <TableCell align="right">Цена&nbsp;(руб.)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dish && dish.map((row: any, index: number) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.OrderDish.excluded_ingredients && row.OrderDish.excluded_ingredients}</TableCell>
              <TableCell align="right">{row.OrderDish.quantity}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <h4>Итого: {total_price} руб.</h4>
      <h4>Оплата: {payment[payment_method]}</h4>
      </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCard}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default OrderCard;