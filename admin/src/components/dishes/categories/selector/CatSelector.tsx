import * as React from 'react';
import fetchCategories from "../../../common/apifetch/apifetch";
import { Autocomplete, TextField } from '@mui/material';

export default function CatSelector({categories, setCategories}: any) {
  const [allCategories, setAllCategories] = React.useState<Object[]>([]);
  
  const handleChange = (
    e: React.SyntheticEvent,
    newValues: any
  ) => { setCategories(newValues);
          };

  const fetchAllCategories = ()=> {
    fetchCategories('GET', `${process.env.REACT_APP_API}/category`)
    .then((response: any) => { 
setAllCategories(response.data);
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
  }
  React.useEffect(()=> {
    fetchAllCategories();
  },[])
  return (
    <Autocomplete
        style={{ width: '100%' }}
        multiple
        id="category-select"
        options={allCategories}
        getOptionLabel={(option) => option.title}
        value={categories ? categories : []}
        onChange={handleChange}
        isOptionEqualToValue={(option, value)=> option.id === value.id} 
        renderInput={(params) => {
            return (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Категории"
                    placeholder="Выберите категорию" />
            );
        }}
      />
  );
}