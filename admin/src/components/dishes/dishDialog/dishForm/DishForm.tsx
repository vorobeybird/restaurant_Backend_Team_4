import {useState} from 'react';
import { Grid, Container, TextField, Button, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { useTheme } from '@mui/styles';
import IngSelector from '../../ingredients/selector/IngSelector';
import PhotoUploader from './photoUploader/PhotoUploader';
import axios, {AxiosResponse, Method}  from 'axios';
interface IPhoto {
  photo_url: string,
  public_id: string,
  ordinal_num: number,
  width: number,
  height: number,
}
interface IDish {
  id?: string;
  title: string;
  default_ingredients: Array<Number>;
  price: number;
  weight: number;
  photos: Array<IPhoto>
  categories: Array<Number>;
  ingredients: Array<Number>;
  calories: number;
}
interface IDishFormProps{
dish: IDish;
handleClose: Function;
fetchDishes: Function;
}

const DishForm = ({dish, handleClose, fetchDishes}: IDishFormProps ) => {
  const [ingredients, setIngredients]: [any, (items: Object[]) => void] = useState<any[]>([]);
  const initialImages = dish.photos || [];
  const [newImages, setNewImages] = useState<IPhoto[]>(initialImages);
  
  const theme = useTheme();

        const formik = useFormik({
          initialValues: {
            title: dish.title,
            default_ingredients: dish.default_ingredients,
            price: dish.price,
            weight: dish.weight,
            photos: dish.photos,
            categories: dish.categories,
            ingredients: dish.ingredients,
            calories: dish.calories,
          },
          onSubmit: values => {
            console.log(values)
            values.photos = newImages;
            dish.id ? fillDish( 'PUT', `${process.env.REACT_APP_API}/dish`, values, dish.id) : fillDish('POST', `${process.env.REACT_APP_API}/dish`, values);
          },
        });
        const fillDish = ( type: Method, url: string, data: IDish, id?: string) => {

          const queryUrl = id ? `${url}/${id}`: url;
          axios.request<AxiosResponse>({
              method: type,
              url: queryUrl,
              data: data,
              headers: {
                "Content-type": "application/json"
               }
            })
          .then(response => {
              handleClose();
              fetchDishes();
          })
          .catch(err=>{
              const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
              console.error(error);
          })
      }


        return (<Container maxWidth="lg" sx={{mt: theme.spacing(5)}}>
          <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
								<Grid item md={6} xs={12}>
                <Grid container item xs={12} spacing={0}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="title"
										label="Dish Title"
										name="title"
										autoComplete="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
									/>
								</Grid>
                <Grid container item xs={12} spacing={2} sx={{mt: theme.spacing(1)}}>
						<Grid item xs={4}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="price"
										label="Price"
										name="price"
										autoComplete="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    InputProps={{
                    endAdornment: <InputAdornment position="end">BYN</InputAdornment>
                    }}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
									/>
								</Grid>

							<Grid item xs={4}>
							<TextField
										variant="outlined"
										required
										fullWidth
										id="weight"
										label="Weight (grams)"
										name="weight"
										autoComplete="weight"
                    onChange={formik.handleChange}
                    value={formik.values.weight}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
									/></Grid>
	            <Grid item xs={4}>
              <TextField
										variant="outlined"
										required
										fullWidth
										id="calores"
										label="Calories"
										name="calories"
										autoComplete="calories"
                    onChange={formik.handleChange}
                    value={formik.values.calories}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
									/>
								</Grid>
								</Grid>
						</Grid>
								<Grid item md={6} xs={12} sx={{ display:'flex', flexDirection: 'column', alignItems:'flex-start'}}>
                  <IngSelector ingredients={ingredients} setIngredients={setIngredients}/>
								</Grid>
                <Grid item  md={12} xs={12}>
                  <PhotoUploader dishId={dish.id} newImages={newImages} setNewImages={setNewImages} />
                  </Grid>

							</Grid>
        <Container sx={{mt: theme.spacing(3), textAlign: 'center'}}>
        <Button variant="contained" type="submit">{dish.id ? 'Edit a dish' : 'Add a new dish'}</Button>
        </Container>
        </form>

          </Container>
        );
      

};

export default DishForm;