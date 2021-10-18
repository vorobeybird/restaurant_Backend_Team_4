import { useState, useEffect } from "react";
import axios from 'axios';

interface IDish {
    id: number;
    title: string;
    default_ingredients: string;
    price: number;
    weight: number;
    photos: Array<Object>
    categories: Array<Number>;
    ingredients: Array<Number>;
  }
  interface IResponse {
    status: number;
    data: IDish[];
    message?: string;
  }
  const allDishes:IDish[] = [];

const Dishes = ()=>{

    const [dishes, setDishes]: [IDish[], (dishes: IDish[])=> void] = useState(allDishes);

    const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);

    const [error, setError]: [string, (error: string) => void] = useState("");

    const [currentDish, setCurrentDish] = useState(null);
    
    const apiUrl = "http://ec2-18-185-80-4.eu-central-1.compute.amazonaws.com:5000/api/dish";
  

    useEffect(() => {
      axios.get<IResponse>(apiUrl, {
          headers: {
              "Content-type": "application/json"
          },
      })
      .then(response=> {
          console.log(response)
          setDishes(response.data.data);
          setLoading(false);
      })
      .catch(err=>{
          const error = err.response.status === 404 ? "Resource Not found" : "An unexpected error ocurred";
          setError(error);
          setLoading(false);
      })
    }, []);

return (

    <div>
       { dishes.map(dish=><li key={dish.id}>{dish.title}</li>)}
    </div>
)
}

export default Dishes;

