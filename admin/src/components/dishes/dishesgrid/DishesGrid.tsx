import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridApi, GridCellValue } from '@mui/x-data-grid';
import DishDialog from '../dialog/DishDialog';
import Button from '@mui/material/Button/Button';
import { useState, useEffect } from "react";
import axios from 'axios';

interface IDish {
  id: number;
  title: string;
  default_ingredients: string;
  price: number;
  weight: number;
  photos: Array<Object>
  categories: Array<Number>;
  ingredients: Array<Number>;
}

interface IResponse {
  status: number;
  data: IDish[];
  message?: string;
}

const DishesGrid = () => {
  const allDishes:IDish[] = [];
  const [open, setOpen] = React.useState(false);
  const [currentDish, setCurrentDish] = React.useState();
  const [dishes, setDishes]: [IDish[], (dishes: IDish[])=> void] = React.useState(allDishes);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'dishes_photos', headerName: 'Photos', width: 120,   
      valueGetter: (params: GridValueGetterParams) =>{
        const photos: any = params.getValue(params.id, 'photos')
      return photos.length;
    }},
    { field:'Edit', width: 100, sortable: false, filterable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center', renderCell: (params) => {
      const onClick = (e: any): void => {
      setCurrentDish(params.api.getRow(params.id));
      handleClickOpen();
      }
      return <Button onClick={onClick}>Edit</Button>
    },},
    { field:'Delete', width: 100, sortable: false, filterable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center', renderCell: (params) => {
      const onClick = (e: any) => {
        e.stopPropagation(); // don't select this row after clicking
  
/*         const api: GridApi = params.api;
        const thisRow: Record<string, GridCellValue> = {};
        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          ); */

            deleteDish(params.id);
      };
  
      return <Button onClick={onClick}>Delete</Button>;
    },}
  ];
  
  const deleteDish = (id: any) => {
    const urlToDelete = `http://ec2-18-185-80-4.eu-central-1.compute.amazonaws.com:5000/api/dish/${id}`;
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
        setError(error);
        setLoading(false);
    })
 }

  const fetchDishes = () => {
    const apiUrl = "http://ec2-18-185-80-4.eu-central-1.compute.amazonaws.com:5000/api/dish";
    axios.get<IResponse>(apiUrl, {
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response=> {
        console.log(response.data.data)
        setDishes(response.data.data);
        setLoading(false);
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        setError(error);
        setLoading(false);
    })
}

useEffect(() => {
    fetchDishes();
}, []);

  return (<>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dishes}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection = {false}
      />
    </div>
    <DishDialog dish={currentDish} handleClose={handleClose} type={'Edit'} open={open} handleClickOpen={handleClickOpen} />
    </>
  );
}
export default DishesGrid;