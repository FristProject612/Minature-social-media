import axios from "axios";
import { getAccessToken } from "../storageUtils";
import { refreshAccessToken } from "./auth";

const url = axios.create({
  baseURL: "http://localhost:4000/comment"
})

export async function getComments(postId) {
  try{
    const response = await url.get('/all', { params: { postId: postId } });
    return response.data
  }
  catch(e){
    console.log("error status: ", e.response.status);
    console.error("Error in getAllComments: ", e.response);
    console.error("System error message: ", e.message)
  }
}

export async function uploadComment(comment){
  try{
    const accessToken = getAccessToken();

    const headers = {
      Authorization: `Bearer ${accessToken}`
    }

    const response = await url.post('/upload', comment, { headers });
    return response.data;
  }
  catch(e){
    console.log("error status: ", e.response.status);
    console.error("Error in uploadComment: ", e.response.message);
    console.error("System error message: ", e.message);
    if(e.response.status === 403) {
      const accessToken = refreshAccessToken();
      if(!accessToken){
        return null;
      }
      return await uploadComment(comment);
    }
  }

}