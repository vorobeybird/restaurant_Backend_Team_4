import {useState, useEffect} from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { fetchIngredients } from "../../../common/apifetch/apifetch";

interface IIngredientType {
  title: any;
  id: number;
  isOptional?: boolean;
}
export default function IngSelector({ingredients, setIngredients}: any) {

  const [allIngredients, setAllIngredients] = useState<any>(null);
  //const [items, setItems]: [any, (items: Object[]) => void] = useState<any[]>([]);

  const sortByProperty = (arr: Object[], prop: string) => {
    return arr.sort((a:any, b: any) => {
      return a[prop] - b[prop];
    });
  };

  const fetchAllIngredients = ()=> {
    fetchIngredients('GET', `${process.env.REACT_APP_API}/ingredient`)
    .then((response: any) => {
      const boolIngredients: Object[] = response.data.data.map((ingredient: any) => ({...ingredient, isOptional: false}));
      setAllIngredients(boolIngredients);
    })
    .catch(err=>{
        const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
        console.error(error);
    })
  }

  
  const mergeByProperty = (target: Object[], source: Object[] | undefined, prop: string): void => {
    source && source.forEach((sourceElement: any) => {
      let targetElement = target.find((targetElement: any) => {
        return sourceElement[prop] === targetElement[prop];
      });
      targetElement && Object.assign(targetElement, sourceElement);
    });
  };
  const handleChangeInput = (
    e: React.SyntheticEvent,
    values: any,
    reason: string
  ) => {
    reason === "clear" &&
    allIngredients.map((ingredient:any) => (ingredient.isOptional = false));
    mergeByProperty(values, ingredients, "id");
    sortByProperty(values, "isOptional");
    setIngredients(values);
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
                            return { ...item, isOptional: e.target.checked };
                          }
                          return { ...item };
                        });
                        sortByProperty(newItems, "isOptional");
                        setIngredients(newItems);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      checked={
                        ingredients.find((item: any): boolean => option.id === item.id).isOptional
                      }
                    />
                  }
                  label="Optional"
                />
              </FormGroup>
            )}
          </li>
        );
      }}
      style={{ width: '100%' }}
      renderTags={(value, getTagProps) => {
        return ingredients.map((option: any, index: number) => (
          <Chip
            variant={option.isOptional ? "outlined" : "filled"}
            color={option.isOptional ? "primary" : "error"}
            label={option.title}
            {...getTagProps({ index })}
          />
        ));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ingredients"
          placeholder="Add ingredient"
        />
      )}
    />
  );
}
