import axios from "./axios";

const login = (body) => {

const url = "/auth/login";
const form= {
  "schoolCode": body.code,
  "username": body.email,
  "password": body.password
}

axios.get(`/schools?schoolCode=${body.code}`)
  .then((response) => {
    localStorage.setItem("school", JSON.stringify(response.data[0]));
    //console.log(localStorage.getItem("school"));

    //return response;
  })
  .catch((error) => {
    //console.log(error);
  });

//console.log(form)
  return axios.post(url,form)
  .then((response) => {
    const test = response?.data ? true : false;
    //console.log(response.data);
    //console.log("test=" + test);
    if (test) {
      localStorage.setItem("user", JSON.stringify(response.data));
      //const currentUser = AuthService.getCurrentUser();
      //console.log("currentUser=" + currentUser);
      //localStorage.setItem("school", JSON.stringify(response));
    }

   // console.log("get user");
    //console.log(JSON.parse(localStorage.getItem("user")));
    return test;
  });
};

const signup = (body) => {
  const url = "/auth/signup";
  return axios.post(url, body).then((response) => response.data);
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => JSON.parse(localStorage.getItem("user"));
const getCurrentSchool = () => JSON.parse(localStorage.getItem("school"));

const AuthService = {
  login,
  signup,
  logout,
  getCurrentUser,
  getCurrentSchool,
};

export default AuthService;
