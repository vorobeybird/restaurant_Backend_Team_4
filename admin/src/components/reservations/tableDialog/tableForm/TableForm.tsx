import {useState} from "react";
import { Box, Button, Container, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import apiFetch from "../../../common/apifetch/apifetch";



const TableForm = ({currentTable}: any) => {

    const [persons, setPersons] = useState('2');
    const [checked, setChecked] = useState(true);

    const handleChange = (event: SelectChangeEvent) => {
        setPersons(event.target.value as string);
      };
    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
      };
    const handleCreateTable = () => {

    }

    //if (!currentTable) 
    return  <Container sx={{p: 2, height: 230, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
        <Box sx={{ width: 330}}>
      <FormControl fullWidth>
        <InputLabel id="persons">Количество человек</InputLabel>
        <Select
          labelId="persons"
          id="persons"
          value={persons}
          label="Количество человек"
          onChange={handleChange}
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
      <FormControlLabel control={<Switch checked={checked} onChange={handleChecked} />} label={checked ? "Доступен для бронирования": "Недоступен для бронирования" } />
    </FormGroup>
    </Box>
    <Box sx={{m: 4, textAlign: "center"}}><Button variant="contained" color="warning" onClick={handleCreateTable}>Создать</Button></Box>
    </Box>
    </Container>
}

export default TableForm;