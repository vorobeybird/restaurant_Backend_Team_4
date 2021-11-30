import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface IDishDIalogProps {
  handleClose: any;
  deleteDish: any;
  open: boolean;
  dish: number;
  }


const DishAlertDialog = ({dish, deleteDish, handleClose, open}: IDishDIalogProps) => {
  const onClick = async () => {
    await deleteDish(dish);
    await handleClose();
 }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Предупреждение"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Данное блюдо находится в активном заказе. Всё равно удалить? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClick} autoFocus>
            Удалить
          </Button>
          <Button onClick={handleClose}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DishAlertDialog;