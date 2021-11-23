import { Button, Container, Grid, IconButton, Typography } from '@mui/material';
import {useState, useEffect} from 'react';
import {useTheme} from '@mui/styles';
import DateSelector from '../common/dateselector/DateSelector';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { AddCircleOutline, Timer } from '@mui/icons-material';
import apiFetch from '../../components/common/apifetch/apifetch';
import OrderCard from '../orders/orderCard/OrderCard';
import TableDialog from './tableDialog/TableDialog';
import { makeStyles } from '@mui/styles';
import ReservationDialog from './reservationDialog/ReservationDialog';

interface ITable {
id?: number;
table_number?: number;
persons?: number;
is_available?: boolean;

}
const initialTable = {
  id: undefined,
  table_number: undefined,
  persons: 2,
  is_available: true
}
const useClasses = makeStyles(theme => ({
  iconContainer: {
      "&:hover $icon": {
          opacity: 1,
      }
  },
  icon: {
    opacity: 0.4,
  },
}));

const Reservations = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [reservationData, setReservationData] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [cardOpen, setCardOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [openRForm, setOpenRForm] = useState(false);
  const [currentTable, setCurrentTable] = useState<ITable>(initialTable)
  const [currentOrder, setCurrentOrder] = useState<any>({});

  const theme = useTheme();
  const classes = useClasses();


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
    setCurrentTable({...currentTable, table_number: reservationData.length + 1});
    setTableOpen(true);
  }
  const handleCloseTable = () => {
    setCurrentTable(initialTable);
    setTableOpen(false);
  }
  const handleEditTable = (rowData: any) => {
    const {id, table_number, persons, is_available} = rowData;
    setCurrentTable({...currentTable, id, table_number, persons, is_available});
  }
  const handleCloseCard = () => {
    setCardOpen(false)
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
      let hours = +slot.reserve_start_time.substring(0,2);
      hours += 3;
     // let minutes = +slot.reserve_time.substring(3,5);
     // if (minutes < 30) {
        hours = hours * 100;
     // } else {
     //   hours = hours * 100 + 50;
     // }
      for (let i = 0; i < 4; i++) {

      tempres['timeSlot' + hours.toString()] = slot.id;
      hours += 100;
      }
    }
  }
      )
      
  }
  return {id: table.id, table_number: table.table_number, persons: table.persons, is_available: table.is_available,...tempres}
})
const reservations = createFilteredReservations(dayjs(date).format('YYYY-MM-DD')).sort((a, b) => a.persons-b.persons);
  
  const cellViewButton =  (params: GridRenderCellParams) => {
      const onClick = (e: any) => {
        if (params.value) {
        const orderFound = allOrders.filter((el=> el.reserve_id === params.value));
        setCurrentOrder(orderFound[0]); 
        setCardOpen(true);
        } else {
          alert('Well gonna reserve a tabel')
        }
      };
      if (params.value) {
        return <IconButton onClick={onClick} color="warning" aria-label="change status" component="div"><Timer />        
      </IconButton> 
      } else {
        return <IconButton classes={{root: classes.iconContainer}} onClick={onClick} color="primary" aria-label="change status" component="div"><AddCircleOutline className={classes.icon}/>        
        </IconButton>
      }}

  const columns: GridColDef[] = [
    { field: 'table_number', headerName: 'Номер стола', width: 115, align: 'center' },
    { field: 'persons', headerName: 'Вместимость', width: 115, align: 'center' }, 
    { field: 'timeSlot1000', headerName: '10:00', width: 90, headerAlign: 'center', align:'center', renderCell: cellViewButton, filterable: false, disableColumnMenu: true }, 
    { field: 'timeSlot1100', headerName: '11:00', width: 90, headerAlign: 'center', align:'center', renderCell: cellViewButton, filterable: false, disableColumnMenu: true }, 
    { field: 'timeSlot1200', headerName: '12:00', width: 90, headerAlign: 'center', align:'center', renderCell: cellViewButton, filterable: false, disableColumnMenu: true },
    { field: 'timeSlot1300', headerName: '13:00', width: 90, headerAlign: 'center', align:'center', renderCell: cellViewButton, filterable: false, disableColumnMenu: true }, 
    { field: 'timeSlot1400', headerName: '14:00', width: 90, headerAlign: 'center', align:'center', renderCell: cellViewButton, filterable: false, disableColumnMenu: true }, 
    { field: 'timeSlot1500', headerName: '15:00', width: 90, headerAlign: 'center', align:'center', renderCell: cellViewButton, filterable: false, disableColumnMenu: true }, 
    { field: 'timeSlot1600', headerName: '16:00', width: 90, headerAlign: 'center', align:'center', renderCell: cellViewButton, filterable: false, disableColumnMenu: true },  
    { field: 'timeSlot1700', headerName: '17:00', width: 90, headerAlign: 'center', align:'center', renderCell: cellViewButton, filterable: false, disableColumnMenu: true }, 
    { field: 'timeSlot1800', headerName: '18:00', width: 90, headerAlign: 'center', align:'center', renderCell: cellViewButton, filterable: false, disableColumnMenu: true }, 
    { field: 'timeSlot1900', headerName: '19:00', width: 90, headerAlign: 'center', align:'center', renderCell: cellViewButton, filterable: false, disableColumnMenu: true }, 
    { field: 'timeSlot2000', headerName: '20:00', width: 90, headerAlign: 'center', align:'center', renderCell: cellViewButton, filterable: false, disableColumnMenu: true }, 
    { field: 'timeSlot2100', headerName: '21:00', width: 90, headerAlign: 'center', align:'center', renderCell: cellViewButton, filterable: false, disableColumnMenu: true }, 
    { field: 'edit', headerName: 'Управление столом', width: 170, align: 'center', filterable: false, sortable: false, disableColumnMenu: true, renderCell: (params: GridRenderCellParams)=> {
      const onClick = (e: any) => {
      handleEditTable(params.row);
      setTableOpen(true);
      };
      return <Button onClick={onClick} aria-label="edit-table" variant="contained">Правка
      </Button> } }, 
  ];
  return(<><div style={{height: '85vh'}}>
  <Container maxWidth="xl" sx={{mt: theme.spacing(3), height: '80%'}}>
        <Grid container spacing={0}>
      <Grid item md={3} xs={12} sx={{display: 'flex', justifyContent: 'flex-start', my: theme.spacing(3)}}><DateSelector date={date} setDate={setDate} /></Grid>
      <Grid item md={6} xs={12} sx={{display: 'flex', justifyContent: 'center', mt: theme.spacing(4) }}><Typography variant="h2">Бронирование столов на {dayjs(date).format('DD MMMM YYYY г.') }</Typography></Grid>
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
  <OrderCard currentOrder={currentOrder} openCard={cardOpen} handleCloseCard={handleCloseCard} />
  <TableDialog currentTable={currentTable} setCurrentTable={setCurrentTable} tableOpen={tableOpen} handleCloseTable={handleCloseTable} fetchReservationData={fetchReservationData} />
  <ReservationDialog openRForm={openRForm} setOpenRForm={setOpenRForm} />
  </>
);
}

export default Reservations;