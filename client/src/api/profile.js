import axios from "axios";
import { getAccessToken } from "../storageUtils";
import { refreshAccessToken } from "./auth";

const url = axios.create({
  baseURL: "http://localhost:4000"
});

export async function updateImage(imageFile) {
  const fileType = imageFile?.type.split('/')[1];
  console.log('filetype: ', fileType);
  if(!fileType || fileType !== 'png' && fileType !== 'jpg' && fileType !== 'jpeg'){
    return null;
  }

  try{
    const formData = new FormData();
    formData.append('avtar', imageFile);

    const accessToken = getAccessToken();

    const headers = {
      Authorization: `Bearer ${accessToken}`, // Replace 'accessToken' with the actual token variable
      'Content-Type': 'multipart/form-data',
    }

    const response = await url.post('/avtar', formData, { headers });
    console.log("response: ", response);
    return response.data;
  }
  catch(e) {
    console.log("error status: ", e.response.status);
    console.error("Error in updateAvtar: ", e.response.message);
    console.error("System error message: ", e.message);
    if(e.response.status === 403) {
      const accessToken = refreshAccessToken();
      if(!accessToken){
        return null;
      }
      return await updateImage(imageFile);
    }
  }
}  

export async function updateAbout(about) {
  try{
    const accessToken = getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }

    await url.post('/about', {
      about: about
    }, {headers});
  }
  catch(e) {
    console.log("error status: ", e.response.status);
    console.error("Error in updateAbout: ", e.response.message);
    console.error("System error message: ", e.message);
    if(e.response.status === 403) {
      const accessToken = refreshAccessToken();
      if(!accessToken){
        return;
      }
      await updateAbout(about);
    }
  }
}