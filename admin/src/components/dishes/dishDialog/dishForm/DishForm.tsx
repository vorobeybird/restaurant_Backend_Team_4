import {useState} from 'react';
import { Grid, Container, TextField, Button, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { useTheme } from '@mui/styles';
import IngSelector from '../../ingredients/selector/IngSelector';
import CatSelector from '../../categories/selector/CatSelector';
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
  price: number;
  weight: number;
  photo: Array<IPhoto>
  category: Array<Number>;
  ingredient: Array<Object>;
  calories: number;
}
interface IDishFormProps{
dish: IDish;
handleClose: Function;
fetchDishes: Function;
}

const DishForm = ({dish, handleClose, fetchDishes}: IDishFormProps ) => {
  const [ingredients, setIngredients]: [any, (items: Object[]) => void] = useState<any[]>(dish.ingredient);
  const [categories, setCategories]: [any, (items: Object[]) => void] = useState<any[]>(dish.category);
  const initialImages = dish.photo || [];
  const [newImages, setNewImages] = useState<IPhoto[]>(initialImages);
  
  const theme = useTheme();

        const formik = useFormik({
          initialValues: {
            title: dish.title,
            price: dish.price,
            weight: dish.weight,
            photo: dish.photo,
            category: dish.category,
            ingredient: dish.ingredient,
            calories: dish.calories,
          },
          onSubmit: values => {
            values.photo = newImages;
            values.ingredient = ingredients.map((ingredient: any) => ({id: ingredient.id, is_default: ingredient.DishIngredient.is_default}));
            values.category = categories.map((category: any)=>({id: category.id}))
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
										label="Название блюда"
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
										label="Цена"
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
										label="Вес (граммы)"
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
										label="Калории"
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
                <Grid container item xs={12} spacing={0}>
                   <IngSelector ingredients={ingredients} setIngredients={setIngredients}/>
                   </Grid>
                   <Grid container item xs={12} spacing={0} sx={{mt: theme.spacing(3)}}>
                  <CatSelector categories={categories} setCategories={setCategories}/>
                  </Grid>
								</Grid>
                <Grid item  md={12} xs={12}>
                  <PhotoUploader dishId={dish.id} newImages={newImages} setNewImages={setNewImages} />
                  </Grid>

							</Grid>
        <Container sx={{mt: theme.spacing(3), textAlign: 'center'}}>
        <Button variant="contained" type="submit">{dish.id ? 'Редактировать блюдо' : 'Добавить блюдо'}</Button>
        </Container>
        </form>

          </Container>
        );
      

};

export default DishForm;