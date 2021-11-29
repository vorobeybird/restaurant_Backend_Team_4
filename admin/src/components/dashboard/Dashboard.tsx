import React, {useEffect} from 'react';
import { useTheme } from '@mui/styles';
import { Container, Grid } from '@mui/material';
import apiFetch from '../common/apifetch/apifetch';


const Dashboard = ()=>{

    const fetchOrders = async () => {
        await apiFetch("GET", `${process.env.REACT_APP_API}/order`)
    .then(response => {
      /* const ordersWithReservations = response.data.filter( (order: any) => order.reserve_id);
        console.log(ordersWithReservations);
        setAllOrders(ordersWithReservations); */
        console.log(response.data)
        
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
    }
    const theme = useTheme();
    useEffect(()=> {
        fetchOrders();
    }, [])
   return (<Container maxWidth="lg" sx={{mt: theme.spacing(5)}}>

    <Grid container spacing={4}>
    <Grid item md={12} xs={12}>
Full width chart
    </Grid>
    </Grid>
    <Grid container spacing={4}>
    
    <Grid container item xs={12} md={4} spacing={0}>
    1/3 width chart
    </Grid>
    <Grid container item xs={12} md={4} spacing={0}>
    1/3 width chart
    </Grid>
    <Grid container item xs={12} md={4} spacing={0}>
    1/3 width chart
    </Grid>
    
    </Grid>
    </Container>
)};

export default Dashboard;

