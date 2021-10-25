import * as React from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const tempIgredients = [
  { title: "Сахар", id: 1, isOptional: false },
  { title: "Соль", id: 2, isOptional: false },
  { title: "Фисташки", id: 3, isOptional: false },
  { title: "Петрушка", id: 4, isOptional: false },
  { title: "Сыр", id: 5, isOptional: false },
  { title: "Сельдь", id: 6, isOptional: false },
  { title: "Перловка", id: 7, isOptional: false },
  { title: "Сметана", id: 8, isOptional: false },
  { title: "Творог", id: 9, isOptional: false },
  { title: "Перец", id: 10, isOptional: false },
  { title: "Ванилин", id: 11, isOptional: false },
  { title: "Говядина", id: 12, isOptional: false },
  { title: "Кукуруза", id: 13, isOptional: false },
  { title: "Гроршек", id: 14, isOptional: false },
  { title: "Сало", id: 15, isOptional: false },
  { title: "Клубника", id: 80, isOptional: false },
  { title: "Картофель", id: 17, isOptional: false },
  { title: "Сода", id: 18, isOptional: false },
  { title: "Ингредиент", id: 19, isOptional: false },
  { title: "Вермишель", id: 20, isOptional: false },
  { title: "Кориандр", id: 21, isOptional: false },
  { title: "Томаты", id: 22, isOptional: false },
  { title: "Горчица", id: 23, isOptional: false }
];

export default function IngSelector({dishIngredients}: any) {
const initialIngredients: any = [];
  const [items, setItems]: [any, (items: Object[]) => void] = React.useState(initialIngredients);

  const sortByProperty = (arr: Object[], prop: string) => {
    return arr.sort((a:any, b: any) => {
      return a[prop] - b[prop];
    });
  };

  const fetchAllIngredients = ()=> {

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
    tempIgredients.map((ingredient) => (ingredient.isOptional = false));
    mergeByProperty(values, items, "id");
    sortByProperty(values, "isOptional");
    setItems(values);
  };
  return (
    <Autocomplete
      multiple
      id="ingredients-selector"
      options={tempIgredients}
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
                        const itemIndex = items && items.findIndex(
                          (item: any) => item.id === option.id
                        );
                        const newItems: any = items && items.map((item: Object, idx: number) => {
                          if (itemIndex === idx) {
                            return { ...item, isOptional: e.target.checked };
                          }
                          return { ...item };
                        });
                        sortByProperty(newItems, "isOptional");
                        setItems(newItems);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      checked={
                        items.find((item: any): boolean => option.id === item.id).isOptional
                      }
                    />
                  }
                  //sx={{color: "blue"}}
                  label="Optional"
                />
              </FormGroup>
            )}
          </li>
        );
      }}
      style={{ width: '100%' }}
      renderTags={(value, getTagProps) => {
        return items.map((option: any, index: number) => (
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
