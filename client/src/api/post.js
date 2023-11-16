import axios from "axios";
import { getAccessToken } from "../storageUtils";
import { refreshAccessToken } from "./auth";

const url = axios.create({
  baseURL: "http://localhost:4000/post"
});

export async function likePost(postId) {
    try{
      const accessToken = getAccessToken();
      if(!accessToken){
        return null;
      }
      const headers = {
        "Authorization": `Bearer ${accessToken}`
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
    const accessToken = getAccessToken();
    if(!accessToken){
      return null;
    }
    const headers = {
      "Authorization": `Bearer ${accessToken}`
    }
    const response = await url.get('/feeds', { headers });
    return response.data;
  }
  catch(e) {
    console.log("error status: ", e.response.status);
    console.error("Error in getFeeds: ", e.response.message);
    console.error("System error message: ", e.message);
      if(e.response.status === 403) {
        const accessToken = refreshAccessToken();
        if(!accessToken){
          return null;
        }
        return await  getFeeds();

  }
}}

export async function getMyPosts(username) {
  try{
    const response = await url.get(`/username/${username}`);
    return response.data;
  }
  catch(e){
    console.log("Error in getMyPosts");
    console.log("Error response: ", e.response);
    console.log("Error message: ", e.response.message);
  }
}

export async function addPost(post){
  try{
    const formData = new FormData();
    if(post.image) formData.append('post', post.image);
    formData.append('postTitle', post.title);
    formData.append('postContent', post.content);

    const accessToken = getAccessToken();

    const headers = {
      Authorization: `Bearer ${accessToken}`, // Replace 'accessToken' with the actual token variable
      'Content-Type': 'multipart/form-data',
    }

    const response = await url.post('/upload', formData, { headers });
    return response.data;
  }

  catch(e){
    console.log("error status: ", e.response.status);
    console.error("Error in updateAvtar: ", e.response.message);
    console.error("System error message: ", e.message);
    if(e.response.status === 403) {
      const accessToken = refreshAccessToken();
      if(!accessToken){
        return null;
      }
      return await addPost(post);
    }
  }
}
