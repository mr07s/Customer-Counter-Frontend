import "./App.css";
import Dueditails from "./components/duedetails/DueditailsMain";
import Showduedetail from "./components/duedetails/DueDetailsAddPage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import AddProduct from "./components/product/AddProduct";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getdetails } from "./actions/customer";
import { fetchpdetail } from "./actions/product";
import ShowProduct from "./components/product/ShowProduct";
import Home from "./components/Home";
import Paymenthistory from "./components/Paymenthistory/Paymenthistory";
import Inventory from "./components/product/Inventory";
import Status from "./components/Status";
function App() {
  const dispatch = useDispatch();

  const User = JSON.parse(localStorage.getItem("Profile"));
  // console.log(User)
  const userId = User?.result?._id;
  console.log(process.env.REACT_APP_FILE);
  console.log(process.env.REACT_APP_FIREBASE_API_KEY);

  useEffect(() => {
    // console.log('render');
    dispatch(getdetails());
    dispatch(fetchpdetail());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/duedetails" element={<Dueditails />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/addproduct" element={<AddProduct />}></Route>
        <Route path="/showproduct" element={<ShowProduct />}></Route>
        <Route path="/addduedetails" element={<Showduedetail />}></Route>
        <Route path="/inventory" element={<Inventory />}></Route>
        <Route path="/phonepay/status/:marchentId" element={<Status />}></Route>
        <Route path="/payment/success" element={<Status />}></Route>
        <Route path="/paymenthistory/:id" element={<Paymenthistory />}></Route>
      </Routes>
    </>
  );
}

export default App;
