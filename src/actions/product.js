import * as api from "../api";
export const pdetails = (pdetailsdata, navigate) => async (dispatch) => {
  try {
    const { data } = await api.pdetails(pdetailsdata);
    dispatch({ type: "P_DETAILS", payload: data });
    alert("Product Sucessfully added");
    dispatch(fetchpdetail());
    // navigate("/showproduct");
  } catch (error) {
    console.log(error);
  }
};

export const fetchpdetail = () => async (dispatch) => {
  try {
    const { data } = await api.fetchproducts();
    dispatch({ type: "FETCH_PRODUCTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteproduct = (productId) => async (dispatch) => {
  try {
    await api.deleteproduct(productId);
    dispatch(fetchpdetail());
  } catch (error) {
    console.log(error);
  }
};
export const updateproduct = (productId, editdetail) => async (dispatch) => {
  try {
    await api.updateproduct(productId, editdetail);
    dispatch(fetchpdetail());
  } catch (error) {
    console.log(error);
  }
};
