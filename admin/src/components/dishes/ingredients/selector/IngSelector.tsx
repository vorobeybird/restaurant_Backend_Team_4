import {useState, useEffect} from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import fetchIngredients from "../../../common/apifetch/apifetch";

interface IIngSelectorProps {
  ingredients: IIngredient[] | [];
  setIngredients: Function;
}
interface IIngredient {
  title: any;
  id: number;
  DishIngredient: Object;
}
export default function IngSelector({ingredients, setIngredients}: any) {

  const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);

  const sortByProperty = (arr: Object[], prop: string) => {
    return arr.sort((a:any, b: any) => {
      return b.DishIngredient[prop] - a.DishIngredient[prop];
    });
  };

  const fetchAllIngredients = ()=> {
    console.log('fetch')
    fetchIngredients('GET', `${process.env.REACT_APP_API}/ingredient`)
    .then((response: any) => {
      const boolIngredients: IIngredient[] = response.data.map((ingredient: any) => ({...ingredient, DishIngredient: {is_default: false}}));
      setAllIngredients(boolIngredients);
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
  }

  const handleChangeInput = (
    e: React.SyntheticEvent,
    newValues: any,
    reason: string
  ) => {
    if (reason === "clear") {allIngredients.map((ingredient:any) => (ingredient.DishIngredient.is_default = false));}
    console.log(reason)
    sortByProperty(newValues, "is_default");
    setIngredients(newValues);
  };
  useEffect(()=> {
    fetchAllIngredients();
  },[])
  return (
    <Autocomplete
      multiple
      id="ingredients-selector"
      options={allIngredients}
      freeSolo
      disableCloseOnSelect
      value={ingredients ? ingredients : []}
      isOptionEqualToValue={(option, value)=> option.id === value.id}
      getOptionLabel={(option) => option.title}
      onChange={handleChangeInput}
      renderOption={(props, option, { selected }) => {
        return (
          <li
            {...props}
            style={{
              display: "flex",
              justifyContent: "space-between",
              lineHeight: "38px"
            }}
          >
            {option.title}
            
            {selected && (
              <FormGroup>
                <FormControlLabel
                  labelPlacement="end"
                  control={
                    <Switch
                      onChange={(e) => {
                        const itemIndex = ingredients && ingredients.findIndex(
                          (item: any) => item.id === option.id
                        );
                        const newItems: any = ingredients && ingredients.map((item: Object, idx: number) => {
                          if (itemIndex === idx) {
                            return { ...item, DishIngredient: {is_default: e.target.checked} };
                          }
                          return { ...item };
                        });
                        sortByProperty(newItems, "is_default");
                        setIngredients(newItems);                      
                      }}
/*                       onClick={(e) => {
                        e.stopPropagation();
                      }} */
                      checked={ingredients.find((item: any): boolean => option.id === item.id).DishIngredient.is_default}
                    />
                  }
                  label={ingredients.find((item: any): boolean => option.id === item.id).DishIngredient.is_default ? "Обязательный" : "Опциональный"}
                />
              </FormGroup>
             )} 
          </li>
        );
      }}
      style={{ width: '100%' }}
      renderTags={(tagValue, getTagProps) => 
        ingredients.map((option: any, index: number) => (
          <Chip
            variant={option.DishIngredient.is_default ? "filled" : "outlined" }
            color={option.DishIngredient.is_default ? "error" : "primary"}
            label={option.title}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ингредиенты"
          placeholder="Добавить ингредиент"
        />
      )}
    />
  );
}
