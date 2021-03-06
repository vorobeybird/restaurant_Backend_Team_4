import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DishForm from './dishForm/DishForm';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface IPhoto {
  photo_url: string,
  public_id: string,
  ordinal_num: number,
  width: number,
  height: number,
}
interface IDish {
  id?: string;
  title: string;
  default_ingredients: Array<Number>;
  price: number;
  weight: number;
  photo: Array<IPhoto>
  category: Array<Number>;
  ingredient: Array<Number>;
  calories: number;
}
interface IDishDIalogProps {
dish: IDish;
type: string;
handleClose: any;
open: boolean;
fetchDishes: Function;
}
const DishDialog = ({type, dish, handleClose, open, fetchDishes}: IDishDIalogProps) => {

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h3" component="div">
              Настройки блюда
            </Typography>
          </Toolbar>
        </AppBar>
       <DishForm dish={dish} handleClose={handleClose} fetchDishes={fetchDishes} />
      </Dialog>
    </div>
  );
}

export default DishDialog;