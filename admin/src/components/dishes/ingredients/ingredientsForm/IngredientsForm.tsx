import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import  fetchIngredients  from '../../../common/apifetch/apifetch';
const filter = createFilterOptions<ICIOptionType>();
interface ICIOptionType {
    inputValue?: string;
    title: any;
    id?: number;
  }
interface ICIFormProps {
    type: any;
}
export default function IngredientsForm({type}: ICIFormProps) {
  const theme = useTheme();
  const [iList, setIList] = React.useState<any>(null);
  const [value, setValue] = React.useState<any>(null);
  const [currentValue, setCurrentValue] = React.useState<ICIOptionType | null>(null);
  const [inDishes, setInDishes] = React.useState<Number[]>([]);
  
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue({title: e.target.value});
  }
  const getIngredients =()=> {
    fetchIngredients('GET', `${process.env.REACT_APP_API}/ingredient`)
    .then((response) => setIList(response.data))
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
  }

  const deleteIngredient = () => {
    const apiUrl = inDishes.length > 0 
    ? `${process.env.REACT_APP_API}/ingredient/${currentValue?.id}/delete` 
    : `${process.env.REACT_APP_API}/ingredient/${currentValue?.id}`;
    fetchIngredients('DELETE', apiUrl)
    .then((response) => {
        if (response.data.dishes) {
          setInDishes(response.data.dishes);
        } else {
          setInDishes([]);
        setValue(null);
        setCurrentValue(null);
        getIngredients();
        }
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
  }
  
  const saveIngredient = ()=>{
   if (value?.id) {
    fetchIngredients('PUT', `${process.env.REACT_APP_API}/ingredient`, currentValue, value?.id)
    .then((response) =>  {
        getIngredients();
        setValue(response.data);
    }
        )
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
   } else {
    fetchIngredients('POST', `${process.env.REACT_APP_API}/ingredient`, currentValue)
    
    .then((response) =>  {
        getIngredients();
        setCurrentValue(null);
    }
        )
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
        }
  }


  React.useEffect(()=>{
    getIngredients();
  }, [])
  return (<Container sx={{p: theme.spacing(3), height: 330, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
    <Box sx={{height:30}}><Typography color="error">{inDishes.length > 0 && `Ингредиент содержится в блюдах: ${inDishes.join(", ")}.` }</Typography></Box>
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setInDishes([]);
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            title: newValue.inputValue,
          });
          setCurrentValue({
            title: newValue.inputValue,
        })
        } else {
          setValue(newValue);
          setCurrentValue(newValue);
        }


      }}
      ListboxProps={{style: {maxHeight: 200}}}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Добавить "${inputValue}"`,
          });
        }

        return filtered;
      }}

      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="ic-form"
      options={iList}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}
    </li>}
      sx={{ width: 400, m: theme.spacing(3)}}
      renderInput={(params) => (
        <TextField {...params} fullWidth variant="filled" label={`Поиск ингредиентов`}/>
      )}
    />
    {value &&
     <><TextField required 
     fullWidth
     id="title"
     label={currentValue?.inputValue ? ` Добавить ингредиент` : `Редактировать ингредиент` }
     name="title"
     focused
     autoComplete="title" value={currentValue?.inputValue || currentValue?.title || ''} sx={{ width: 400, m: theme.spacing(3)}} onChange={handleChangeValue}></TextField>
     <Container sx={{width: 400, display: "flex", justifyContent: "space-evenly", p: 0}}>
       <Button sx={{m: theme.spacing(3), width: 100}} onClick={saveIngredient} color="primary" variant="contained">Сохранить</Button>
       <Button sx={{m: theme.spacing(3),  width: 100}} color={inDishes.length ? "error" : "warning"} variant="contained" onClick={deleteIngredient}>{inDishes.length ? "Удалить?" : "Удалить"}</Button>
     </Container></>
    }
    </Container>
  );
}