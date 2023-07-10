import axios from "./axios";

const login = (body) => {
  const params = new URLSearchParams();
  params.append("code", body.code);
  params.append("email", body.email);
  params.append("password", body.password);
  ////console.log(params);
  console.log("log test");

  const url = "/auth/login";

  return axios.post(url, params).then((response) => {
   
    const test= response?.data ? true: false;
    console.log(response.data)
    console.log("test="+test)
    if(test){ localStorage.setItem("user", JSON.stringify(response.data));}
   
    //console.log("get user");
    //console.log(localStorage.getItem("user"));
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
};

export default AuthService;
