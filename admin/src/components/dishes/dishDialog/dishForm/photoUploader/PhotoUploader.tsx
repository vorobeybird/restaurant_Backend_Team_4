import {useState} from 'react';
import { useTheme } from '@mui/styles';
import { PhotoCamera, Delete } from '@mui/icons-material';
import { Button, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import axios, {AxiosResponse, Method}  from 'axios';


const Input = styled('input')({
    display: 'none',
  });

interface IPhoto {
  photo_url: string,
  public_id: string,
  ordinal_num: number,
  width: number,
  height: number,
}

  interface IPhotoUploaderProps {
    newImages: IPhoto[],
    setNewImages: Function,
    dishId?: string,
  }

const PhotoUploader = ({newImages, setNewImages, dishId}: IPhotoUploaderProps) => {
    const theme = useTheme();
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'zalart'
    }
  });
  const dishImage = (publicId: string )=> cld.image(publicId).resize(thumbnail().width(250).height(200));

  const fileChange = async (e: React.BaseSyntheticEvent) => {
    const file = e.target.files[0];
    if (file) {
    const result = await postImage(file, dishId);
    console.log(result)
    setNewImages([
      ...newImages,
      result
    ]);
  }}

  const postImage = async (image: string | Blob, dishId: string | undefined) => {
    const formData = new FormData();
    formData.append("image", image);
    dishId && formData.append("dishId",  dishId);
    const result = await axios.post<AxiosResponse<any, any>, any>(`${process.env.REACT_APP_API}/image`, formData, { headers: {'Content-Type': 'multipart/form-data'}});
    return result.data;
  }

  const deleteClick = async (publicId: string) => {
    console.log(publicId)
    const result = await deleteImage(publicId);
    console.log(result)
    const filteredImages = newImages.filter((i: IPhoto)=> i.public_id !== result.data.public_id);
    setNewImages(filteredImages);
  }

  const deleteImage = async (publicId: string) => {
    const result = await axios.delete<AxiosResponse<any, any>, any>(`${process.env.REACT_APP_API}/image/${publicId}`, { headers: {"Content-type": "application/json"}})
    return result;
  }

  const renderImages = newImages && newImages.map((image: IPhoto) => <Grid  item md={3} sm={6} xs={12} sx={{mt: theme.spacing(2), position: "relative"}} key={image.public_id}>
  <IconButton onClick={()=> deleteClick(image.public_id)} aria-label="delete" size="large" color="error" id={image.public_id} sx={{position: "absolute", top: 2, right: 20, backgroundColor: "rgba(255, 255, 255, .8)", zIndex: 1}}>
<Delete /></IconButton><AdvancedImage cldImg={dishImage(image.public_id)} /></Grid>);

    return(<Grid container item md={12} xs={12} sx={{mt: theme.spacing(1), textAlign: 'center', backgroundColor: '#F6F6F6', display:'flex', justifyContent:'center'}}>
    {renderImages}
    <Grid item md={12} xs={12} sx={{ my: theme.spacing(3), textAlign: 'center'}}>
  <label htmlFor="contained-button-file">
     <Input onChange={fileChange} accept="image/*" id="contained-button-file" type="file" />
<Button variant="contained" component="span" startIcon={<PhotoCamera/>} >
Upload a photo
</Button>
</label></Grid>
</Grid>
)
}

export default PhotoUploader;