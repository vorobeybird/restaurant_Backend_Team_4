import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
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
/* interface IDish {
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
} */

const OrderCard = ({currentOrder, openCard, handleCloseCard}: any) => {



  return (
    <div>
      <Dialog open={openCard} onClose={handleCloseCard} TransitionComponent={Transition}>
        <DialogTitle>Заказ номер: {currentOrder.id}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Смена статуса на следующую ступень
          </DialogContentText>
          <Box sx={{ minWidth: 120, mt: 2 }}></Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCard}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OrderCard;