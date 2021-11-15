import { DataGrid, GridCellValue, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import OrderDialog from '../orderDialog/OrderDialog';
import { useState, useEffect } from "react";
import axios, {AxiosResponse}  from 'axios';
import {Container, IconButton } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Edit, Pageview } from '@mui/icons-material';
import apiFetch from '../../common/apifetch/apifetch';
import OrderCard from '../orderCard/OrderCard';

interface IOrder {
  id: number;
  customer_id: string,
  delivery_method: string;
  total_price: number;
  delivery_date: string;
  contact_name: string;
  contact_phone: string;
  payment_method: boolean;
  adress: string;
  status: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  dish: IDish[];
}

interface IDish {
  id: number;
  title: string;
  price: number;
  weight: number;
  calories: number;
  OrderDish: IOrderDish;
}

interface IOrderDish {
  dish_id: number;
  order_id: number;
  quantity: number;
}
interface IResponse {
  status: number;
  data: IOrder[];
  message?: string;
}


const OrdersGrid = () => {
  const theme = useTheme();

  const initialOrder: any = {};
  const [open, setOpen] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [orders, setOrders]: [IOrder[], (orders: IOrder[])=> void] = useState<IOrder[]>([]);
  const [currentOrder, setCurrentOrder] = useState(initialOrder);
  const [status, setStatus] = useState(currentOrder.status);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    currentOrder.id && setCurrentOrder(initialOrder);
  };

  const handleOpenCard = () => {
    setOpenCard(true);
  }
  const handleCloseCard = () => {
    setOpenCard(false)
  }
   const saveStatus = () => {
    const newOrders = orders.map(order=> (order.id === currentOrder.id) ? {...currentOrder, status} : order);      
        setOrders(newOrders);
       setOrder();
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80, headerAlign: 'center', align: 'right', filterable: false, renderCell: (params: GridRenderCellParams)=> {
      return <>{params.id} <IconButton onClick={()=> {setCurrentOrder(params.row); handleOpenCard()}}><Pageview color='warning'/></IconButton></>
    } },
    {
      field: 'delivery_date',
      headerName: 'Дата доставки',
      sortable: true,
      width: 160,
      renderCell: (params: GridRenderCellParams) => { 
         const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}; 
       let deliverAt: any = params.value;
       deliverAt = new Date(deliverAt);
        return deliverAt.toLocaleString("ru", options) 
       //return `${deliverAt.getHours()}:${deliverAt.getMinutes()} ${deliverAt.getDate()}-${deliverAt.getMonth()}-${deliverAt.getFullYear()}`;
     },
      
    },
    {
      field: 'updatedAt',
      headerName: 'Дата изменения',
      sortable: true,
      width: 160,
      renderCell: (params: GridRenderCellParams) => { 
        const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}; 
       let updated: any = params.value;
       updated = new Date(updated);
        return updated.toLocaleString("ru", options) 
     },
    },
    { field: 'contact_name', headerName: 'Имя', width: 150 },
    { field: 'contact_phone', headerName: 'Телефон', width: 120 },
    { field: 'adress', headerName: 'Адрес', width: 150 },
    { field: 'comment', headerName: 'Комментарий', width: 150 },
    { field: 'total_price', headerName: 'Цена', width: 100, align: 'center' },
    { field:'status', headerName: 'Статус заказа', width: 200, sortable: false, filterable: false, disableColumnMenu: true, headerAlign: 'center', renderCell: (params) => {
      const onClick = (e: any) => {
        setCurrentOrder(params.row);
        setStatus(params.row.status);
        handleClickOpen();
      };
      return (<><IconButton onClick={onClick} sx={{mr: 2}} color="warning" aria-label="change status" component="div"><Edit />
      </IconButton><div>{params.row.status}</div></>)  
    },}
  ];

  const setOrder = async () => {
    apiFetch("PUT", `${process.env.REACT_APP_API}/order`, {status}, currentOrder.id)
  .then(response => {
     setOpen(false);
  })
  .catch((err) =>{
      const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
      console.error(error);
  })
  }

 const fetchOrders = () => {
  apiFetch("GET", `${process.env.REACT_APP_API}/order`)
  .then(response=> {
      console.log(response.data);
      setOrders(response.data);
  })
  .catch(err=>{
      const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
      console.error(error);
  })
} 

useEffect(() => {
  fetchOrders();
}, []);


  return (<>
          <div style={{height: '85vh'}}>
    <Container maxWidth="xl" sx={{mt: theme.spacing(3), height: '80%'}}>
      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection = {false}
      />
      </Container>
      </div>
<OrderDialog handleClose={handleClose} open={open} setStatus={setStatus} status={status} saveStatus={saveStatus} />
<OrderCard currentOrder={currentOrder} openCard={openCard} handleCloseCard={handleCloseCard} />
    </>
  );
}

export default OrdersGrid;