import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DishDialog from '../dishDialog/DishDialog';
import Button from '@mui/material/Button/Button';
import { useState, useEffect } from "react";
import axios from 'axios';
import {Container, Grid } from '@mui/material';
import { useTheme } from '@mui/styles';
import IngDialog from '../ingredients/catIngDialog/CatIngDialog';

interface IDish {
  id: number;
  title: string;
  default_ingredients: string;
  price: number;
  weight: number;
  photos: Array<Object>
  categories: Array<Number>;
  ingredients: Array<Number>;
  calories: number;
}

interface IResponse {
  status: number;
  data: IDish[];
  message?: string;
}

const DishesGrid = () => {
  const theme = useTheme();
  const allDishes:IDish[] = [];
  const initialDish: any = {};
  const [open, setOpen] = useState(false);
  const [currentDish, setCurrentDish] = useState(initialDish);
  const [dishes, setDishes]: [IDish[], (dishes: IDish[])=> void] = useState(allDishes);
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
    currentDish.id && setCurrentDish(initialDish);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 250 },
    {
      field: 'default_ingredients',
      headerName: 'Ingredients',
      sortable: true,
      width: 160,
    },
    { field: 'categories', headerName: 'Category', width: 300 },
    { field: 'price', headerName: 'Price', width: 150, align: 'center' },
    { field: 'dishes_photos', headerName: 'Photos', width: 120, align: 'center',
      valueGetter: (params: GridValueGetterParams) =>{
        const photos: any = params.getValue(params.id, 'photos')
      return photos.length;
    }},
    { field:'Edit', width: 100, sortable: false, filterable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center', renderCell: (params) => {
      const onClick = (e: any): void => {
      setCurrentDish(params.api.getRow(params.id));
      handleClickOpen();
      }
      return <Button color="warning" variant="contained" onClick={onClick}>Edit</Button>
    },},
    { field:'Delete', width: 100, sortable: false, filterable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center', renderCell: (params) => {
      const onClick = (e: any) => {
        e.stopPropagation(); 
            deleteDish(params.id);
      };
  
      return <Button color="error" variant="contained" onClick={onClick}>Delete</Button>;
    },}
  ];
  
  const deleteDish = (id: any) => {
    const urlToDelete = `${process.env.REACT_APP_API!}/${id}`;
    axios.delete<IResponse>(urlToDelete, {
      headers: {
          "Content-type": "application/json"
         }
      })
      .then(response=> {
        console.log(response.data.data)
        fetchDishes();
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
 }

  const fetchDishes = () => {
    const apiUrl = process.env.REACT_APP_API!;
    axios.get<IResponse>(apiUrl, {
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response=> {
        console.log(response.data.data);
        setDishes(response.data.data);
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
        <Grid item md={6} xs={12} sx={{my: theme.spacing(3) }}><Button variant="contained" onClick={handleClickOpen}>Add a new Dish</Button></Grid>
      <Grid item md={6} xs={12} sx={{display: 'flex', justifyContent: 'flex-end', my: theme.spacing(3)}}>
      <Button id="ingredient" onClick={(e)=>{openInCa(e, 'ingredient')}} sx={{mr: theme.spacing(1)}} key={"ingredient"} variant="contained" color="warning" size="small">Add an ingredient</Button>
      <Button id="category" onClick={(e)=>{openInCa(e, 'category')}} sx={{ml: theme.spacing(1)}} variant="contained" color="warning" size="small">Add a category</Button></Grid>
      </Grid>
      </Container>

      <DataGrid
        rows={dishes}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection = {false}
      />
     
      </Container>
      </div>
    <DishDialog dish={currentDish} handleClose={handleClose} type={currentDish.id ? "Edit a" : "Add a"} open={open} fetchDishes={fetchDishes} />
    <IngDialog handleClose={handleClose} type={entityToAdd} />
    </>
  );
}
export default DishesGrid;