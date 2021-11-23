import React from "react";
import { useState, useEffect}  from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Slide, Box, Grid, TextField } from "@mui/material";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ReservationDialog = ({selectedCellData, setselectedCellData, openRForm, setOpenRForm, fetchReservationData}: any) => {
    console.log(selectedCellData)
    const initialFormValues = {    
                num_of_persons: selectedCellData.num_of_persons,
                delivery_method: "bookTable",
                payment_method: 2,
                contact_phone: "+375297894888",
                contact_name: "Артур Залевский",
                reserve_date: selectedCellData.reserve_date,
                reserve_time: selectedCellData.reserve_date,
                delivery_date: selectedCellData.reserve_date,
                customer_id: "0f9a8522-bb9e-49ae-8829-4c97a3a262a6",
                adress: "bookTable",
                comment: "Test reservation from admin side",
                dish: [],
                total_price: 0,
            }

    const [formValues, setFormValues] = useState({...initialFormValues});
            //console.log(formValues)
    const handleChangeValue = (e: any) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=> {
        setFormValues({...initialFormValues})
    },[])


    // const formik = useFormik({
    //     initialValues: {    
    //         num_of_persons: selectedCellData.num_of_persons,
    //         delivery_method: "bookTable",
    //         payment_method: 2,
    //         contact_phone: "+375297894888",
    //         contact_name: "Артур Залевский",
    //         reserve_date: selectedCellData.reserve_date,
    //         reserve_time: selectedCellData.reserve_date,
    //         delivery_date: selectedCellData.reserve_date,
    //         customer_id: "0f9a8522-bb9e-49ae-8829-4c97a3a262a6",
    //         adress: "bookTable",
    //         comment: "Test reservation from admin side",
    //         dish: [],
    //         total_price: 0,
    //     },
    //     onSubmit: values => {
    //         apiFetch('POST', `${process.env.REACT_APP_API}/reserve`, values)
    //         .then(response => {
    //             if (response.status === 201) {
    //               fetchReservationData();
    //               setOpenRForm(false);
    //               console.log('reservation created')
    //             }
    //           })
    //           .catch(err=>{
    //             const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
    //             console.error(error);
    //         })

    //     },
    //   });
    return (
        <Dialog
        fullWidth
        maxWidth="md"
        open={openRForm}
        onClose={()=> setOpenRForm(false)}
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
      <Container sx={{height: 330, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
    
      <Box sx={{height:30, mb: 4}}>Result</Box>
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
        onChange={handleChangeValue}
        value={formValues.num_of_persons}
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
        onChange={handleChangeValue}
        value={formValues.reserve_date}
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
	    />
      </Grid>
      </Grid>
      </Grid>
    </Grid>
      <Button variant="contained" color="primary" type="submit" >
        Зарезервировать
        </Button>
    </Container>
        </DialogContent>
        <DialogActions>
        <Button onClick={ ()=> setOpenRForm(false)}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    )
}

export default ReservationDialog;