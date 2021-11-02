import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CIForm from '../ciForm/CIForm';
/* 
interface ICatIng{
    id: number;
    title: string
} */

export default function CatIngDialog({type, handleClose}: any ) {
  const initialItems: any = [];
/*   const [items, setItems]= useState(initialItems); */
/*   const theme = useTheme(); */

/*   const fillCatIng = async ( type: Method, url: string, data?: ICatIng, id?: number) => {

    const queryUrl = id ? `${url}/${id}`: url;
   await axios.request<AxiosResponse>({
        method: type,
        url: queryUrl,
        data: data,
        headers: {
          "Content-type": "application/json"
         }
      })
    .then(response => {
        setItems(response.data.data);
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
  } */

  useEffect(()=> {
   // fillCatIng('GET', `http://http://18.192.170.78:5000/api/${type}` );

  },[type])

  return (
    <div>
      <Dialog
        fullWidth
        open={type && true}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        <Typography sx={{ ml: 2, flex: 1 }} variant="h3">
         Add/edit {type}
        </Typography>
        </DialogTitle>
        <DialogContent>
          
<CIForm type={type} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}