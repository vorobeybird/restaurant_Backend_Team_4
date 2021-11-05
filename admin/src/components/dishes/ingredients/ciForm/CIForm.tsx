import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import { Button, Container } from '@mui/material';
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
export default function CIForm({type}: ICIFormProps) {
  const theme = useTheme();
  const [iList, setIList] = React.useState<any>(null);
  const [value, setValue] = React.useState<any>(null);
  const [currentValue, setCurrentValue] = React.useState<ICIOptionType | null>(null);
  
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue({title: e.target.value});
  }
  const getIngredients =()=> {
    fetchIngredients('GET', `${process.env.REACT_APP_API}/ingredient`)
    .then((response) => setIList(response.data.data))
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
  }

  const deleteIngredient = () => {
    fetchIngredients('DELETE', `${process.env.REACT_APP_API}/ingredient`, undefined, currentValue?.id)
    .then((response) => {
        getIngredients();
        setValue(null);
        setCurrentValue(null);
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
        setValue(response.data.data);
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
  return (<Container sx={{p: theme.spacing(3), height: 300, display: "flex", flexDirection: "column", alignItems: "center"}}>
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
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
            title: `Add "${inputValue}"`,
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
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}
    </li>}
      sx={{ width: 400, m: theme.spacing(3)}}
      /* freeSolo */
      renderInput={(params) => (
        <TextField {...params} fullWidth variant="filled" label={`Search ${type}`}/>
      )}
    />
    {value &&
     <><TextField required 
     fullWidth
     id="title"
     label={currentValue?.inputValue ? ` Add ${type}` : `Edit ${type}` }
     name="title"
     focused
     autoComplete="title" value={currentValue?.inputValue || currentValue?.title || ''} sx={{ width: 400, m: theme.spacing(3)}} onChange={handleChangeValue}></TextField>
     <Container sx={{width: 400, display: "flex", justifyContent: "space-evenly", p: 0}}><Button sx={{m: theme.spacing(3), width: 80}} onClick={saveIngredient} color="primary" variant="contained">Save</Button><Button sx={{m: theme.spacing(3),  width: 80}} color="error" variant="contained" onClick={deleteIngredient}>Delete</Button></Container></>
    }
    </Container>
  );
}