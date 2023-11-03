import axios from "axios";
import { getAccessToken } from "../storageUtils";
import { refreshAccessToken } from "./auth";

const url = axios.create({
  baseURL: "http://localhost:4000/post"
});

export async function likePost(postId) {
    try{
      const headers = {
        "Authorization": `Bearer ${getAccessToken()}`
      }
      const response = await url.post('/like', {
        postId: postId
      }, { headers });
      
      return response.data;
    }
    catch(e) {
      if(e.response.status === 403) {
        const accessToken = refreshAccessToken();
        if(!accessToken){
          return null;
        }
        return await  likePost();

      }
      
    console.log("error status: ", e.response.status);
    console.error("Error in likePost: ", e.response.message);
    console.error("System error message: ", e.message);
    }
}

// export async function getFeeds() {
//   const accessToken = getAccessToken();

//   if(!accessToken){
//     return null;
//   }

//   try{
//     const headers = { 'Authorization': `Bearer ${accessToken}`};
//     const response = await url.get('/feeds', {headers});

//     return response.data;
//   }
//   catch(e) {
//       if(e.response.status === 403){
//         console.log("at getFeeds(): ",e.data.message);
//         const accessToken = refreshAccessToken();
//         if(!accessToken){
//           return null;
//         }
//         const headers = { 'Authorization': `Bearer ${accessToken}`};
//         const response = await url.get('/feeds', {headers});
//         return response.data;
//       }
//       else{
//         console.error("Error at post.feeds: ", e.data.message);
//         return null;
//       }
//   }
// }

export async function getFeeds() {
  try{
    const response = await url.get('/feeds');
    return response.data;
  }
  catch(e) {
    console.log("error status: ", e.response.status);
    console.error("Error in getFeeds: ", e.response.message);
    console.error("System error message: ", e.message);
  }
}
