import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DishDialog from '../dishDialog/DishDialog';
import DishAlertDialog from '../dishDialog/DishAlertDialog';
import Button from '@mui/material/Button/Button';
import { useState, useEffect } from "react";
import {Container, Grid } from '@mui/material';
import { useTheme } from '@mui/styles';
import IngDialog from '../catIngDialog/CatIngDialog';
import apiFetch from '../../common/apifetch/apifetch';

interface IDish {
  id?: string;
  title: string;
  price: number;
  weight: number;
  photo: Array<Object>
  category: Array<Object>;
  ingredient: Array<Object>;
  calories: number;
}

interface IResponse {
  data: IDish[];
  message?: string;
}

const DishesGrid = () => {
  const theme = useTheme();
  const allDishes:IDish[] = [];
  const initialDish: any = {};
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [currentDish, setCurrentDish] = useState(initialDish);
  const [dishes, setDishes]: [IDish[], (dishes: IDish[])=> void] = useState(allDishes);
  const [entityToAdd, setEntityToAdd] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const openInCa = (e: React.SyntheticEvent, type: string) => {
    setEntityToAdd(type);
  }
  const handleCloseAlert = () => {
    setOpenAlert(false);
  }
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEntityToAdd('');
    currentDish.id && setCurrentDish(initialDish);
  };

    const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Название', width: 200 }, 
    { field: 'category', headerName: 'Категории', width: 350,  renderCell: (params) => {
      return params.row.category.map((c:any)=> c.title).join(', ');
    }, },
    { field: 'ingredient', headerName: 'Ингредиенты', sortable: true, width: 400,  renderCell: (params) => {
        return params.row.ingredient.map((i:any)=> i.title).join(', ');
      },
    },
    { field: 'price', headerName: 'Цена', width: 150, align: 'center' },
    { field:'Edit', headerName: 'Правка', width: 100, sortable: false, filterable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center', renderCell: (params) => {
      const onClick = (e: any): void => {
      setCurrentDish(params.api.getRow(params.id));
      handleClickOpen();
      }
      return <Button color="warning" variant="contained" onClick={onClick}>Правка</Button>
    },},
    { field:'Delete', headerName: 'Удалить', width: 100, sortable: false, filterable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center', renderCell: (params) => {
      const onClick = (e: any) => {
        e.stopPropagation(); 
        const activeOrders = params.row.order.filter((order:any) =>  order.status !== "Готов" && order.status !== "Отменен"  )
        setCurrentDish(params.id);
        if(activeOrders.length > 0 ){
          handleClickOpenAlert();
        } else {
            deleteDish(params.id);
        }
      };
  
      return <Button color="error" variant="contained" onClick={onClick}>Удалить</Button>;
    },}
  ];
  
  const deleteDish = (id: any) => {

    const urlToDelete = `${process.env.REACT_APP_API!}/dish/${id}`;
    apiFetch('DELETE', urlToDelete)
      .then(response=> {

        fetchDishes();
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
 }

  const fetchDishes = () => {
    const apiUrl = process.env.REACT_APP_API!;
    apiFetch('GET', `${apiUrl}/dishes?allInfo=true`)
    .then(response=> {
        setDishes(response.data);
    })
    .catch(err=>{
  
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
}

useEffect(() => {
    fetchDishes();
}, []);

  return (<>
          <div style={{height: '85vh'}}>
    <Container maxWidth="xl" sx={{mt: theme.spacing(3), height: '80%'}}>
      
      <Container sx={{textAlign: 'center'}}>
        <Grid container spacing={0} >
        <Grid item md={6} xs={12} sx={{my: theme.spacing(3) }}><Button variant="contained" onClick={handleClickOpen}>Добавить блюдо</Button></Grid>
      <Grid item md={6} xs={12} sx={{display: 'flex', justifyContent: 'flex-end', my: theme.spacing(3)}}>
      <Button id="ingredient" onClick={(e)=>{openInCa(e, 'ingredient')}} sx={{mr: theme.spacing(1)}} variant="contained" color="warning" size="small">Ингредиенты</Button>
      <Button id="category" onClick={(e)=>{openInCa(e, 'category')}} sx={{ml: theme.spacing(1)}} variant="contained" color="secondary" size="small">Категории</Button></Grid>
      </Grid>
      </Container>

      <DataGrid
        rows={dishes}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection = {false}
      />
     
      </Container>
      </div>
    <DishDialog dish={currentDish} handleClose={handleClose} type={currentDish.id ? "Edit a" : "Add a"} open={open} fetchDishes={fetchDishes} />
    <DishAlertDialog handleClose={handleCloseAlert}  open={openAlert} deleteDish={deleteDish} dish={currentDish}/>
    <IngDialog handleClose={handleClose} type={entityToAdd} />
    </>
  );
}
export default DishesGrid;