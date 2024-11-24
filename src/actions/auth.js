import * as api from "../api";

export const signup = (authdata, navigate) => async (dispatch) => {
  try {
    dispatch({type:"USER_LOGIN_REQUEST"})
    const { data } = await api.signup(authdata);
    console.log(data);
    dispatch({ type: "AUTH", payload: data });
    // alert("Loading")
    // alert("sign in sucessfull");
    navigate("/");
  } catch (error) {
    // console.log(error);
    dispatch({type:"USER_LOGIN_FAIL",payload:error.response && 
    error.response.data.message})
  }
};
export const login = (authdata, navigate) => async (dispatch) => {
  try {
    dispatch({type:"USER_LOGIN_REQUEST"})
    const { data } = await api.login(authdata);
    // console.log("Hii");
    dispatch({ type: "AUTH", payload: data });
 
    navigate("/");
  } catch (error) {
    // console.log(error);
    dispatch({type:"USER_LOGIN_FAIL",payload:error.response && 
    error.response.data.message})



  }
};



export const logout =()=>async(dispatch)=>{

try {
 dispatch({type:"LOG_OUT"})
  
}catch (error){
console.log(error);
  
}




}

