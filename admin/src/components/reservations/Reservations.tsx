import { Button, Container, Grid, IconButton, Typography } from '@mui/material';
import {useState, useEffect} from 'react';
import {useTheme} from '@mui/styles';
import DateSelector from '../common/dateselector/DateSelector';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Timer } from '@mui/icons-material';
import apiFetch from '../../components/common/apifetch/apifetch';
import OrderCard from '../orders/orderCard/OrderCard';
import TableDialog from './tableDialog/TableDialog';


const Reservations = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [reservationData, setReservationData] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [cardOpen, setCardOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState<number | null>(null)
  const [currentOrder, setCurrentOrder] = useState<any>({});
  const theme = useTheme();


  const fetchReservationData = async () => {
    await apiFetch("GET", `${process.env.REACT_APP_API}/tables`)
    .then(response=> {
        console.log(response.data);
        setReservationData(response.data);
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
  } 
  const fetchAllOrders = async () => {
   await apiFetch("GET", `${process.env.REACT_APP_API}/order`)
    .then(response=> {
        console.log(response.data);
        setAllOrders(response.data);
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
  }

  const handleOpenNewTable = () => {
    setTableOpen(true);
    setCurrentTable(reservationData.length + 1);
  }

  useEffect(()=> {
    fetchReservationData();
    fetchAllOrders();
  }, [])


const createFilteredReservations = (date: string) => reservationData.map((table)=>{
  let tempres: any ={};
  if (table.reserve.length) {
    table.reserve.forEach((slot: any) => {
      if (slot.reserve_date === date) {
      let hours = +slot.reserve_time.substring(0,2);
      let minutes = +slot.reserve_time.substring(3,5);
      if (minutes < 30) {
        hours = hours * 100;
      } else {
        hours = hours * 100 + 50;
      }
      for (let i = 0; i < 8; i++) {

      tempres['timeSlot' + hours.toString()] = slot.id;
      hours += 50;
      }
    }
  }
      )
      
  }
  return {id: table.id, persons: table.persons, ...tempres}
})
const reservations = createFilteredReservations(dayjs(date).format('YYYY-MM-DD') );
  
  const cellViewButton =  (params: GridRenderCellParams) => {
      const onClick = (e: any) => {
        const orderFound = allOrders.filter((el=> el.reserve_id === params.value));
        setCurrentOrder(orderFound[0]); 
        setCardOpen(true);
      };
      if (params.value) return <IconButton onClick={onClick} color="warning" aria-label="change status" component="div"><Timer />
      </IconButton> }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Стол', width: 60, align: 'center' },
    { field: 'persons', headerName: 'Чел.', width: 60, align: 'center' }, 
    { field: 'timeSlot1000', headerName: '10:00', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1050', headerName: '10:30', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1100', headerName: '11:00', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1150', headerName: '11:30', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1200', headerName: '12:00', width: 62, renderCell: cellViewButton, filterable: false },
    { field: 'timeSlot1250', headerName: '12:30', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1300', headerName: '13:00', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1350', headerName: '13:30', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1400', headerName: '14:00', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1450', headerName: '14:30', width: 62, renderCell: cellViewButton, filterable: false },
    { field: 'timeSlot1500', headerName: '15:00', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1550', headerName: '15:30', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1600', headerName: '16:00', width: 62, renderCell: cellViewButton, filterable: false },  
    { field: 'timeSlot1650', headerName: '16:30', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1700', headerName: '17:00', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1750', headerName: '17:30', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1800', headerName: '18:00', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1850', headerName: '18:30', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1900', headerName: '19:00', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot1950', headerName: '19:30', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot2000', headerName: '20:00', width: 62, renderCell: cellViewButton, filterable: false }, 
    { field: 'timeSlot2050', headerName: '20:30', width: 62, renderCell: cellViewButton, filterable: false }, 
  ];
  return(<><div style={{height: '85vh'}}>
  <Container maxWidth="xl" sx={{mt: theme.spacing(3), height: '80%'}}>
        <Grid container spacing={0}>
      <Grid item md={3} xs={12} sx={{display: 'flex', justifyContent: 'flex-start', my: theme.spacing(3)}}><DateSelector date={date} setDate={setDate} /></Grid>
      <Grid item md={6} xs={12} sx={{display: 'flex', justifyContent: 'center', mt: theme.spacing(4) }}><Typography variant="h2">Резервирование столов на {dayjs(date).format('DD MMMM YYYY г.') }</Typography></Grid>
      <Grid item md={3} xs={12} sx={{display: 'flex', justifyContent: 'flex-end', mt: theme.spacing(4) }}><div><Button color="warning" variant="contained" onClick={handleOpenNewTable}>Создать стол</Button></div></Grid>
      </Grid>
      <DataGrid
      autoHeight
        rows={reservations}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection = {false}
      />
  </Container>
  </div>
  <OrderCard currentOrder={currentOrder} open={cardOpen} setOpen={setCardOpen} />
  <TableDialog currentTable={currentTable} tableOpen={tableOpen} setTableOpen={setTableOpen} />
  </>
);
}

export default Reservations;