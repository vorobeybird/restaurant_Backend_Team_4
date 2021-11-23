import { Box, Button, Container, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, Typography } from "@mui/material";
import { useState } from "react";
import fetchTables from "../../../common/apifetch/apifetch";
import dayjs from 'dayjs';

const TableForm = ({currentTable, setCurrentTable, handleCloseTable, fetchReservationData}: any) => {

    const [reservations, setReservations] = useState<any>([]);
    const {table_number, persons, is_available} = currentTable;
    const handlePersonsChange = (event: SelectChangeEvent) => {
      setCurrentTable({...currentTable, persons: event.target.value as string});
      };
    const handleAvailableChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTable({...currentTable, is_available: event.target.checked});
      };
    const handleCreateTable = () => {
      if (currentTable.id) {
        const url = reservations.length > 0
        ? `${process.env.REACT_APP_API}/tables/${currentTable.id}/update` 
        : `${process.env.REACT_APP_API}/tables/${currentTable.id}`
        fetchTables('PUT', url, {table_number, persons, is_available })
        .then(response => {
          if (response.status === 200) {
            if (response.data.reservations) {
              setReservations(response.data.reservations);
            } else {
            setReservations([]);
            fetchReservationData();
            handleCloseTable();
            console.log('table updated')
            }
          }
        })
        .catch(err=>{
          const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
          console.error(error);
      })

      } else {
        fetchTables('POST', `${process.env.REACT_APP_API}/tables`, {table_number, persons, is_available })
        .then(response => {
          if (response.status === 201) {
            fetchReservationData();
            handleCloseTable();
            console.log('table created')
          }
        })
        .catch(err=>{
          const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
          console.error(error);
      })
      }

    }

    const handleDeleteTable = () => {
      const url = reservations.length > 0
      ? `${process.env.REACT_APP_API}/tables/${currentTable.id}/delete` 
      : `${process.env.REACT_APP_API}/tables/${currentTable.id}`
      fetchTables('DELETE', url)
      .then(response => {
        if (response.status === 200) {
          if (response.data.reservations) {
            setReservations(response.data.reservations);
          } else {
          setReservations([]);
          fetchReservationData();
          handleCloseTable();
          console.log('table deleted')
          }

        }
      })
      .catch(err => {
        console.error(err);
      })
    }

    return  <Container sx={{height: 270, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
      <Box sx={{height:30, mb: 4}}>{reservations.length > 0 && <><Typography color="error">Не завершенные бронирования стола: {reservations.length}.</Typography>
         <Typography color="error"> Ближайшее бронирование: {dayjs(reservations[0].reserve_start_time+ ' ' + reservations[0].reserve_date).add(3, 'h').format('DD-MM-YYYY в HH:mm')}. </Typography></>}</Box>
        <Box sx={{ width: 330}}>
      <FormControl fullWidth>
        <InputLabel id="persons">Вместимость (чел.)</InputLabel>
        <Select
          labelId="persons"
          id="persons"
          value={currentTable.persons}
          label="Количество человек"
          onChange={handlePersonsChange}
        >
          <MenuItem value={2}>Два</MenuItem>
          <MenuItem value={4}>Четыре</MenuItem>
          <MenuItem value={6}>Шесть</MenuItem>
          <MenuItem value={8}>Восемь</MenuItem>
          <MenuItem value={10}>Десять</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ m: 3,  width: 330}}>
      <FormGroup>
      <FormControlLabel control={<Switch checked={currentTable.is_available} onChange={handleAvailableChecked} />} label={currentTable.is_available ? "Доступен для бронирования": "Недоступен для бронирования" } />
    </FormGroup>
    </Box>
    <Box sx={{my: 4, display: "flex", justifyContent: "space-between"}}>
      <Button variant="contained" color={reservations.length ? "warning" : "primary"} onClick={handleCreateTable}>
        {currentTable.id ? "Сохранить" : "Создать"}
        </Button>
      {currentTable.id ? <Button variant="contained" color="error" onClick={handleDeleteTable}>Удалить</Button> : null}
    </Box>
    </Box>
    </Container>
}

export default TableForm;