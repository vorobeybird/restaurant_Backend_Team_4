import { Grid, Container, TextField, Button, InputAdornment, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useTheme } from '@mui/styles';
import {Method}  from 'axios';
import apiFetch from '../../../common/apifetch/apifetch';



interface IDish {
  id?: number;
  title: string;
  default_ingredients: Array<Number>;
  price: number;
  weight: number;
  photos: Array<Object>
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
            dish.id ? fillDish( 'PUT', `${process.env.REACT_APP_API}/dish`, values, dish.id) : fillDish('POST', `${process.env.REACT_APP_API}/dish`, values);
          },
        });
        const fillDish = ( type: Method, url: string, data: IDish, id?: number) => {

          const queryUrl = id ? `${url}/${id}`: url;
          apiFetch(type, queryUrl, data)
          .then(response => {
              handleClose();
              fetchDishes();
          })
          .catch(err=>{
              const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
              console.error(error);
          })
      }
        return (<Container maxWidth="lg" sx={{marginTop: theme.spacing(5)}}>
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
                 {/*  <IngSelector ingredients={dish.ingredients}/> */}
								</Grid>
                <Grid item md={12} xs={12} sx={{my: theme.spacing(3),  textAlign: 'center'}}><Typography variant="h4">Photo uploader here</Typography></Grid>
							</Grid>
        <Container sx={{mt: theme.spacing(3), textAlign: 'center'}}>
        <Button variant="contained" type="submit">{dish.id ? 'Edit a dish' : 'Add a new dish'}</Button>
        </Container>
        </form>

          </Container>
        );
      

};

export default DishForm;