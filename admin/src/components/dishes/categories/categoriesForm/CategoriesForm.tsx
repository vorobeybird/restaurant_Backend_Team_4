import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import  fetchCategories  from '../../../common/apifetch/apifetch';
const filter = createFilterOptions<ICategoryOptionType>();
interface ICategoryOptionType {
    inputValue?: string;
    show_in_menu: boolean;
    title: any;
    id?: number;

  }
interface ICIFormProps {
    type: any;
}
export default function CategoriesForm({type}: ICIFormProps) {
  const theme = useTheme();
  const [iList, setIList] = React.useState<any>(null);
  const [value, setValue] = React.useState<any>(null);
  const [currentValue, setCurrentValue] = React.useState<any | null>(null);
 /*  const [inDishes, setInDishes] = React.useState<Number[]>([]); */
  
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue({
      ...currentValue,
      title: e.target.value 
                    });
  }

  const handleChangeMenuShow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue({
      ...currentValue,
      show_in_menu: e.target.checked 
                    });
  }

  const getCategories =()=> {
    fetchCategories('GET', `${process.env.REACT_APP_API}/category`)
    .then((response) => setIList(response.data))
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
  }

  const deleteCategory = () => {
    const apiUrl = /* inDishes.length > 0 ? `${process.env.REACT_APP_API}/ingredient/${currentValue?.id}/delete` :  */`${process.env.REACT_APP_API}/category/${currentValue?.id}`;
    fetchCategories('DELETE', apiUrl)
    .then((response) => {
      console.log(response.data)
        if (response.data.dishes) {
          /* setInDishes(response.data.dishes); */
        } else {
          /* setInDishes([]); */
        setValue(null);
        setCurrentValue(null);
        getCategories();
        }
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
  }
  const saveCategory = ()=>{
    const {title, show_in_menu} = currentValue;
   if (value?.id) {
    fetchCategories('PUT', `${process.env.REACT_APP_API}/category`, {title, show_in_menu}, value?.id)
    .then((response) =>  {
        getCategories();
        setValue(response.data);
    }
        )
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
   } else {
    fetchCategories('POST', `${process.env.REACT_APP_API}/category`, {title, show_in_menu})
    
    .then((response) =>  {
        getCategories();
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
    getCategories();
  }, [])
  return (<Container sx={{p: theme.spacing(3), height: 330, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        /* setInDishes([]); */
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
            title: `Добавить "${inputValue}"`,
            show_in_menu: false
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
        <TextField {...params} fullWidth variant="filled" label={`Поиск категорий`}/>
      )}
    />
    {value &&
     <><TextField required 
     fullWidth
     id="title"
     label={currentValue?.inputValue ? ` Добавить категорию` : `Редактировать категорию` }
     name="title"
     focused
     autoComplete="title" value={currentValue?.inputValue || currentValue?.title || ''} sx={{ width: 400, m: theme.spacing(3)}} onChange={handleChangeValue}></TextField>
     <FormGroup>
    <FormControlLabel control={<Checkbox onChange={handleChangeMenuShow} checked={currentValue?.show_in_menu }/>} label="Показывать в меню" />
   </FormGroup>
     <Container sx={{width: 400, display: "flex", justifyContent: "space-evenly", p: 0}}>
       <Button sx={{m: theme.spacing(3), width: 100}} onClick={saveCategory} color="primary" variant="contained">Save</Button>
       <Button sx={{m: theme.spacing(3),  width: 100}} color="warning" variant="contained" onClick={deleteCategory}>Удалить</Button>
     </Container></>
    }
    </Container>
  );
}