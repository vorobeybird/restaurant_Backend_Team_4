import React from "react";
import { useState }  from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Slide, Box, Grid, TextField } from "@mui/material";
import dayjs from 'dayjs';
import fetchReservation from '../../common/apifetch/apifetch';
/* import NumberFormat from 'react-number-format'; */


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ReservationDialog = ({selectedCellData, setSelectedCellData, openRForm, setOpenRForm, fetchAllOrders, fetchReservationData}: any) => {
    console.log(selectedCellData)
    const initialFormValues = {    
                delivery_method: "bookTable",
                payment_method: 2,
                contact_phone: "+375297894888",
                contact_name: "Артур Залевский",
                customer_id: "0f9a8522-bb9e-49ae-8829-4c97a3a262a6",
                adress: "bookTable",
                comment: "Test reservation from admin side",
                dish: [],
                total_price: 0,
                status: "Принят",
            }

    const [formValues, setFormValues] = useState({...initialFormValues});
    const [response, setResponse] = useState<any>({});

            //console.log(formValues)
    const handleChangeValue = (e: any) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }
    const handleCLose = () => {
      setResponse({})
      setOpenRForm(false);
    }

    const handleTableReserve = () => {
      fetchReservation('POST',  `${process.env.REACT_APP_API}/reserve`, {
        reserve_date: selectedCellData.reserve_date,
        reserve_time: selectedCellData.reserve_date,
        delivery_date: selectedCellData.reserve_date,
        num_of_persons: selectedCellData.num_of_persons,
        ...formValues
      })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          setResponse(response.data);
          fetchReservationData();
          fetchAllOrders();
        }
      })
      .catch(err=>{
       if (err.response.status === 400 && err.response.data.message === "No tables found!" ) {
        setResponse(err.response.data);
      }
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })


    }
    return (
        <Dialog
        fullWidth
        maxWidth="sm"
        open={openRForm}
        onClose={handleCLose}
        aria-labelledby="create-reservation"
        TransitionComponent={Transition}
      >
        <DialogTitle id="create-reservation">
        <Container sx={{textAlign: "center"}}><Typography sx={{ my: 2, flex: 1 }} variant="h3">
         Забронировать стол
        </Typography>
        </Container>
        </DialogTitle>
        <DialogContent>
      <Container sx={{height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
    
      <Box sx={{ height:30, mb: 4}}>
        {response.message === "No tables found!" && <span style={{color: "red", }}>Извините, нет свободных столов на указанное время</span>}
        {response.persons === selectedCellData.num_of_persons && <span>Стол № {response.table_number} на {response.num_of_persons} забронирован на {dayjs(selectedCellData.reserve_date).format('HH:mm DD MMMM YYYY г.')} </span>}
       </Box>
      <Grid container spacing={2}>
     
      <Grid container item xs={12} spacing={2}>
      <Grid item md={6} xs={12}>
      <TextField
		variant="outlined"
		required
		fullWidth
        disabled
		id="num_of_persons"
		label="Вместимость стола"
		name="num_of_persons"
		autoComplete="num_of_persons"
        onChange={setSelectedCellData}
        value={selectedCellData.num_of_persons}
	    />
      </Grid>
      <Grid item md={6} xs={12}>
      <TextField
		variant="outlined"
		required
       
		fullWidth
		id="reserve_date"
		label="Дата бронирования"
		name="reserve_date"
		autoComplete="reserve_date"
        disabled
        value={dayjs(selectedCellData.reserve_date).format('HH:mm DD MMMM YYYY г.') }
	    />
        </Grid>
        <Grid container item xs={12} spacing={2}>
      <Grid item md={6} xs={12}>
      <TextField
		variant="outlined"
		required
		fullWidth
		id="contact_name"
		label="Имя Фамилия"
		name="contact_name"
		autoComplete="contact_name"
        onChange={handleChangeValue}
        value={formValues.contact_name}
	    />
      </Grid>
      <Grid item md={6} xs={12}>
      <TextField
		variant="outlined"
		required
		fullWidth
		id="contact_phone"
		label="Номер телефона"
		name="contact_phone"
		autoComplete="contact_phone"
        onChange={handleChangeValue}
        value={formValues.contact_phone}
	    >{/* <NumberFormat format="+375 (###) ###-##-##"
      mask="_" /> */}
      </TextField>
      </Grid>
      </Grid>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} sx={{textAlign: "center"}}>
      <Button variant="contained" color="primary" type="submit" sx={{ my: 3}} disabled={!(Object.keys(response).length === 0 && Object.getPrototypeOf(response) === Object.prototype)} onClick={handleTableReserve}>
        Забронировать
        </Button>
        </Grid>
        </Grid>
    </Grid>

    </Container>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCLose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    )
}

export default ReservationDialog;