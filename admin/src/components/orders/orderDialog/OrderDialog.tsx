import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DishForm from './orderForm/OrderForm';
import { Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface IDish {
  id: number;
  title: string;
  default_ingredients: Array<Number>;
  price: number;
  weight: number;
  photos: Array<Object>
  categories: Array<Number>;
  ingredients: Array<Number>;
  calories: number;
}
interface IDishDIalogProps {
dish: IDish;
type: string;
handleClose: any;
open: boolean;
fetchDishes: Function;
}

const OrderDialog = ({order, status, setStatus, open, handleClose, saveStatus}: any) => {

  const statuses = ["Получен", "Отменен", "Принят в работу", "Изменен", "Готовится", "Готов"]

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle>Редактирование статуса заказа</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Смена статуса на следующую ступень
          </DialogContentText>
          <Box sx={{ minWidth: 120, mt: 2 }}>
          <FormControl fullWidth>
  <InputLabel id="status-select-label">Статус</InputLabel>
  <Select
    labelId="status-select-label"
    id="status-select"
    value={status}
    label="Статус"
    onChange={handleChange} 
  >
    {statuses.map((st, idx)=>{
     return <MenuItem key={idx} value={st} disabled={(idx > statuses.findIndex(el=> el === status) + 1) || (idx < statuses.findIndex(el=> el === status))}>{st}</MenuItem>
    })}
  </Select>
</FormControl></Box>
          {/* <DishForm dish={dish} handleClose={handleClose} fetchDishes={fetchDishes} /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button color="warning" variant="contained" onClick={saveStatus}>Изменить статус</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OrderDialog;