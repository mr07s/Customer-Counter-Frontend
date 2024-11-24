import axios from "axios";

// const API = axios.create({baseURL:'http://localhost:5000'})
const API = axios.create({
  baseURL: "http://localhost:5000",
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const login = (authdata) => API.post("/user/login", authdata);
export const signup = (authdata) => API.post("/user/signup", authdata);

export const customer = (customerdata) =>
  API.post("/duedetails/customer", customerdata);

export const customerdetails = () => API.get("/duedetails/getdetails");
export const deleteCustomer = (customerId) =>
  API.delete(`/duedetails/deleteCustomer/${customerId}`);
export const editcustomer = (customerId, editcustomerdata) =>
  API.patch(`/duedetails/editCustomer/${customerId}`, editcustomerdata);

export const pdetails = (productdata) =>
  API.post("/addproduct/pdetails", productdata);
export const fetchproducts = () => API.get("/addproduct/getpdetails");
export const deleteproduct = (productId) =>
  API.delete(`/addproduct/deleteproduct/${productId}`);
export const updateproduct = (productId, editdetail) =>
  API.patch(`/addproduct/updateproduct/${productId}`, editdetail);
