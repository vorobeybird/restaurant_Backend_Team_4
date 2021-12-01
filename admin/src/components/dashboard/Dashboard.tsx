import React, {useState, useEffect} from 'react';
import { useTheme } from '@mui/styles';
import { Container, Grid } from '@mui/material';
import apiFetch from '../common/apifetch/apifetch';
import BarChart from './charts/barChart/BarChart';
import PieChart from './charts/pieChart/PieChart';
import LineChart from './charts/lineChart/LineChart';


const Dashboard = () => {
    const initialOrders:any = [];
    const [allOrders, setAllOrders] = useState(initialOrders);
    
    const fetchOrders = async () => {
    await apiFetch("GET", `${process.env.REACT_APP_API}/order`)
    .then(response => {
        console.log(response.data)
     setAllOrders(response.data); 
        
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
    }
    const theme = useTheme();
    useEffect(()=> {
        console.log('here')
        fetchOrders();
    }, [])
   return (<Container maxWidth="xl">
    <Grid container item spacing={4}>
    <Grid item md={12} xs={12} sx={{my: theme.spacing(2)}}>
    <BarChart allOrders={allOrders} />
    </Grid>
    </Grid>
    <Grid container item spacing={2} >
    <Grid item xs={12} md={3}>
    <PieChart allOrders={allOrders}/>
    </Grid>
    <Grid item xs={12} md={9}>
    <LineChart />
{/*     </Grid>
    <Grid item xs={12} md={4}>
    <PieChart allOrders={allOrders}/> */}
    </Grid>
    </Grid>
    
    </Container>
)};

export default Dashboard;

