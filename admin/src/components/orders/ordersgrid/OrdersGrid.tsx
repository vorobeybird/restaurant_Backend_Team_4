import { DataGrid, GridCellValue, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import OrderDialog from '../orderDialog/OrderDialog';
import Button from '@mui/material/Button/Button';
import { useState, useEffect } from "react";
import axios from 'axios';
import {Container, Grid } from '@mui/material';
import { useTheme } from '@mui/styles';
import IngDialog from '../ingredients/catIngDialog/CatIngDialog';
import { AnyRecord } from 'dns';

interface IOrder {
  id: number;
  customer_id: string,
  delivery_method: string;
  total_price: number;
  delivery_date: string;
  contact_info: string;
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
  const [currentOrder, setCurrentOrder] = useState(initialOrder);
  const [orders, setOrders]: [IOrder[], (orders: IOrder[])=> void] = useState(allOrders);
  const [entityToAdd, setEntityToAdd] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const openInCa = (e: React.SyntheticEvent, type: string) => {
    setEntityToAdd(type);
  }

  const handleClose = () => {
    setOpen(false);
    setEntityToAdd('');
    currentOrder.id && setCurrentOrder(initialOrder);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, filterable: false, },
    { field: 'customer_id', headerName: 'Customer ID', width: 150 },
    {
      field: 'delivery_date',
      headerName: 'Delivery date',
      sortable: true,
      width: 160,
      renderCell: (params: GridRenderCellParams) => { 
        /* const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}; */
       let deliverAt: any = params.value;
       deliverAt = new Date(deliverAt);
       /* return created.toLocaleString("ru", options) */
       return `${deliverAt.getHours()}:${deliverAt.getMinutes()} ${deliverAt.getDate()}-${deliverAt.getMonth()}-${deliverAt.getFullYear()}`;
     },
      
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      sortable: true,
      width: 160,
      renderCell: (params: GridRenderCellParams) => { 
         /* const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}; */
        let created: any = params.value;
        created = new Date(created);
        /* return created.toLocaleString("ru", options) */
        return `${created.getHours()}:${created.getMinutes()} ${created.getDate()}-${created.getMonth()}-${created.getFullYear()}`;
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Updated',
      sortable: true,
      width: 160,
      renderCell: (params: GridRenderCellParams) => { 
        /* const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}; */
       let updated: any = params.value;
       updated = new Date(updated);
       /* return created.toLocaleString("ru", options) */
       return `${updated.getHours()}:${updated.getMinutes()} ${updated.getDate()}-${updated.getMonth()}-${updated.getFullYear()}`;
     },
    },
    { field: 'contact_info', headerName: 'Contact Info', width: 300 },
    { field: 'adress', headerName: 'Address', width: 300 },
    { field: 'comment', headerName: 'Comment', width: 300 },
    { field: 'total_price', headerName: 'Price', width: 150, align: 'center' },
/*     { field: 'dishes_photos', headerName: 'Photos', width: 120, align: 'center',
      valueGetter: (params: GridValueGetterParams) =>{
        const photos: any = params.getValue(params.id, 'photos')
      return photos.length;
    }}, */
/*     { field:'Edit', width: 100, sortable: false, filterable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center', renderCell: (params) => {
      const onClick = (e: any): void => {
      setCurrentOrder(params.api.getRow(params.id));
      handleClickOpen();
      }
      return <Button color="warning" variant="contained" onClick={onClick}>Edit</Button>
    },}, */
/*     { field:'Delete', width: 100, sortable: false, filterable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center', renderCell: (params) => {
      const onClick = (e: any) => {
        e.stopPropagation(); 
            deleteDish(params.id);
      };
  
      return <Button color="error" variant="contained" onClick={onClick}>Delete</Button>;
    },} */
  ];
  
/*   const deleteDish = (id: any) => {
    const urlToDelete = `${process.env.REACT_APP_API!}/dish/${id}`;
    axios.delete<IResponse>(urlToDelete, {
      headers: {
          "Content-type": "application/json"
         }
      })
      .then(response=> {
        console.log(response.data.data)
        fetchOrders();
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
 } */
/* 
  const fetchOrders = () => {
    const apiUrl = process.env.REACT_APP_API!;
    axios.get<IResponse>(`${apiUrl}/order`, {
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response=> {
        console.log(response.data.data);
        setOrders(response.data.data);
    })
    .catch(err=>{
  
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
} */

/* useEffect(() => {
    fetchOrders();
}, []); */

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
{/*     <OrderDialog dish={currentDish} handleClose={handleClose} type={currentDish.id ? "Edit a" : "Add a"} open={open} fetchDishes={fetchDishes} /> */}
{/*     <IngDialog handleClose={handleClose} type={entityToAdd} /> */}
    </>
  );
}

export default OrdersGrid;

const allOrders:IOrder[] = [
  {
    "id": 16,
    "customer_id": "9dd06131-d190-48dd-8afc-ea4ce811de02",
    "delivery_method": "Самовывоз",
    "total_price": 120,
    "delivery_date": "2021-11-01T19:06:42.000Z",
    "contact_info": "EdgarAllanPoe +375666666666",
    "payment_method": true,
    "adress": "Brest",
    "status": "Принят в работу",
    "comment": "Hi, I'm hardcode comment :)",
    "createdAt": "2021-11-01T19:20:51.000Z",
    "updatedAt": "2021-11-01T19:20:51.000Z",
    "dish": [
      {
        "id": 5,
        "title": "Dish for adding ingredient",
        "price": 4000,
        "weight": 300,
        "calories": 1000,
        "OrderDish": {
          "dish_id": 5,
          "order_id": 16,
          "quantity": 2
        }
      },
      {
        "id": 7,
        "title": "Dish for adding category",
        "price": 4000,
        "weight": 300,
        "calories": 1000,
        "OrderDish": {
          "dish_id": 7,
          "order_id": 16,
          "quantity": 5
        }
      }
    ]
  },
  {
    "id": 17,
    "customer_id": "9dd06131-d190-48dd-8afc-ea4ce811de02",
    "delivery_method": "Самовывоз",
    "total_price": 120,
    "delivery_date": "2021-11-01T19:06:42.000Z",
    "contact_info": "EdgarAllanPoe +375666666666",
    "payment_method": true,
    "adress": "Brest",
    "status": "Принят в работу",
    "comment": "Hi, I'm hardcode comment :)",
    "createdAt": "2021-11-01T19:20:51.000Z",
    "updatedAt": "2021-11-01T19:20:51.000Z",
    "dish": [
      {
        "id": 5,
        "title": "Dish for adding ingredient",
        "price": 4000,
        "weight": 300,
        "calories": 1000,
        "OrderDish": {
          "dish_id": 5,
          "order_id": 16,
          "quantity": 2
        }
      },
      {
        "id": 7,
        "title": "Dish for adding category",
        "price": 4000,
        "weight": 300,
        "calories": 1000,
        "OrderDish": {
          "dish_id": 7,
          "order_id": 16,
          "quantity": 5
        }
      }
    ]
  },
  {
    "id": 18,
    "customer_id": "9dd06131-d190-48dd-8afc-ea4ce811de02",
    "delivery_method": "Самовывоз",
    "total_price": 120,
    "delivery_date": "2021-11-01T19:06:42.000Z",
    "contact_info": "EdgarAllanPoe +375666666666",
    "payment_method": true,
    "adress": "Brest",
    "status": "Принят в работу",
    "comment": "Hi, I'm hardcode comment :)",
    "createdAt": "2021-11-01T19:20:51.000Z",
    "updatedAt": "2021-11-01T19:20:51.000Z",
    "dish": [
      {
        "id": 5,
        "title": "Dish for adding ingredient",
        "price": 4000,
        "weight": 300,
        "calories": 1000,
        "OrderDish": {
          "dish_id": 5,
          "order_id": 16,
          "quantity": 2
        }
      },
      {
        "id": 7,
        "title": "Dish for adding category",
        "price": 4000,
        "weight": 300,
        "calories": 1000,
        "OrderDish": {
          "dish_id": 7,
          "order_id": 16,
          "quantity": 5
        }
      }
    ]
  }
];