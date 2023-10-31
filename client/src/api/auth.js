import axios from "axios";

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

}

export async function logout () {

}

