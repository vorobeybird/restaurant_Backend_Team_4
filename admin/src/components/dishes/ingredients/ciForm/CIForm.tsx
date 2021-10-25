import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
const filter = createFilterOptions<ICIOptionType>();
interface ICIOptionType {
    inputValue?: string;
    title: string;
    id?: number;
  }
interface ICIFormProps {
    type: any;
}

export default function CIForm({type}: ICIFormProps) {
  const theme = useTheme();
  const [value, setValue] = React.useState<ICIOptionType | null>(null);
  const [currentValue, setCurrentValue]  = React.useState<string | null>(null);
  
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  }

  return (<>
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
        } else {
          setValue(newValue);
        }
        setCurrentValue(newValue && newValue.title)
      }}
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
      options={top100Films}
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
 {/*      <IconButton aria-label="delete">
      <DeleteIcon color="error" />
    </IconButton> */}</li>}
      sx={{ width: 400, m: theme.spacing(3)}}
      /* freeSolo */
      renderInput={(params) => (
        <TextField {...params} label={type} />
      )}
    />
    {
     <form><TextField /* label={`Add/Edit ${type}`} */ defaultValue={currentValue} value={currentValue} sx={{ width: 400, m: theme.spacing(3)}} onChange={handleChangeValue}></TextField>
     <Button>Add</Button><Button>Delete</Button></form>
    }
    </>
  );
}



const top100Films: readonly ICIOptionType[] = [
  { title: 'The Shawshank Redemption', id: 1 },
  { title: 'The Godfather', id: 2 },
  { title: 'The Godfather: Part II', id: 3 },
  { title: 'The Dark Knight', id: 4 },
  { title: '12 Angry Men', id: 5 },
  { title: "Schindler's List", id: 6 },
  { title: 'Pulp Fiction', id: 7 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    id: 8,
  },
  { title: 'The Good, the Bad and the Ugly', id: 9 },
  { title: 'Fight Club', id: 10 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    id: 11,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    id: 12,
  },
  { title: 'Forrest Gump', id: 13 },
  { title: 'Inception', id: 14 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    id: 15,
  },
  { title: "One Flew Over the Cuckoo's Nest", id: 16 },
  { title: 'Goodfellas', id: 17 },
  { title: 'The Matrix', id: 18 },
  { title: 'Seven Samurai', id: 19 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    id: 20,
  },
];