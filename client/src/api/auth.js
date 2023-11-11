import axios from "axios";
import { storeRefreshToken, getRefreshToken, storeAccessToken, storeUser } from "../storageUtils";

const url = axios.create({
  baseURL: "http://localhost:4000"
});

export async function login(userPass) {
  const {username, password} = userPass;
  
  try {
    const response = await url.post('/login', {
      username: username,
      password: password
    });

    storeAccessToken(response.data.accessToken);
    storeRefreshToken(response.data.refreshToken);
    storeUser(response.data.user);

    return response.data;
  }
  catch(e) {
    console.log("error status: ", e.response.status);
    console.log("Login error message: ", e.response.data);
    console.error("System error message", e.message);
    return e.response;
  }
}

export async function signup(user) {
  console.log(user);
  const {username, password, email, first_name, last_name, dob} = user;

  // check it
  const filteredUser = {
    username: username,
    password: password,
    email: email,
    first_name: first_name,
    last_name: last_name,
    dob: dob
  }
  try{
    const response = await url.post('/', filteredUser);
    return response.data;
  }
  catch(e){
    console.log("error status: ", e.response.status);
    console.log("Signup error message: ", e.response.data);
    console.error("System error message", e.message);
    return e.response;
  }
}


export async function refreshAccessToken() {
  console.log('refreshing access token');
  const refreshToken = getRefreshToken();
  // if refresh token doesn't exists, redirect user to login page 
  if(!refreshToken){
    return null;
  }

  try {
    const response = await url.post('/refresh', {
      refreshToken: refreshToken
    });

    console.log("refreshaccessToken response: ", response);

    const newAccessToken = response.data.accessToken;
    storeAccessToken(newAccessToken);

    return newAccessToken;
  }
  catch(e) {
    console.log("error status: ", e.response.status);
    console.log("refresh access token error message: ", e.response.data);
    console.error("System error message", e.message);
    return null;
  }
}

export async function logout () {

}


  

