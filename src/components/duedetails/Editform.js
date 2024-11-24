import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { customerdetails } from "../../actions/customer";
// import Alert from "../Alert";
import "./Editform.css";

// const getLocalitems = () => {
//   let list = localStorage.getItem("info");
//   if (list) {
//     return JSON.parse(localStorage.getItem("info"));
//   } else {
//     return [];
//   }
// };

const Editform = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(true);
  const [customer, setcustomer] = useState("");
  var inputs = document.getElementsByClassName("textfield");
  const User = JSON.parse(localStorage.getItem("Profile"));

  const Message = useSelector((state) => state.customerReducer);

  const userId = User?.result?._id;
  // const userId=user.toString();
  console.log(userId)
  var newcustomer;
  const [addFormData, setaddFormData] = useState({
    Name: "",
    undertakenby: "",
    price: "",
    // price:"",//This is made intentionally to send the actual price to data base go check the backend file :/models/customer.js  ,actualprice atfirst will be equaltoprice and the price in here represents the due price
    purchasingdate: "",
    nextpaymentdate:"",
    duedate: "",
    paidamount: "",
    volume: "",
    pages: "",
    userId: "",

    paymentHistory:[{
      price: "",
      paidamount:"",
      due:'0',
      lastPaidDate:'',
  }]
  });

  const handleclear = (event) => {
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
    inputs[3].value = "";
    inputs[4].value = "";
    inputs[5].value = "";
    inputs[6].value = "";
    inputs[7].value = "";
    inputs[8].value = "";

    setaddFormData("");
    setcustomer("");
  };

  const isDisabled = () => {
    const { Name, undertakenby, price, purchasingdate, duedate, paidamount, volume, pages ,nextpaymentdate} = addFormData;
    if (Name && undertakenby && price && purchasingdate && duedate && paidamount && volume && pages &&nextpaymentdate)
      setDisable(false);
    else setDisable(true);
  };
  useEffect(() => {
    isDisabled();
  }, [isDisabled, disable]);

  const handlechange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldvalue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldvalue;
    newFormData["userId"] = userId;
    setaddFormData(newFormData);
  };

  const handlesubmit = (event) => {
    event.preventDefault();

    // const newcustomer = {
    //   // id: nanoid(),
    //   Name: addFormData.Name,
    //   undertakenby: addFormData.undertakenby,
    //   price: addFormData.price,
    //   purchasingdate: addFormData.purchasingdate,
    //   duedate: addFormData.duedate,
    //   paidamount:addFormData.paidamount
    //   // userId: userId,
    // };

    // console.log(newcustomer);

    //     const newcustomers = [...customer, newcustomer];
    //     setcustomer(newcustomers);
    //     // console.log("this is customers");
    console.log("This is add form");
    //     console.log(customer);
    console.log(addFormData);
    dispatch(customerdetails(addFormData, navigate));
    handleclear();
  };

  return (
    <>
      <h2>Add new customer</h2>
      <form className="Editform" id="myForm" onSubmit={handlesubmit}>
        <label htmlFor="username">
          <h5>Name</h5>
          <input
            required
            type="text"
            name="Name"
            placeholder="Name"
            id="username"
            className="textfield textfield - 1"
            onChange={handlechange}
          />
        </label>
        <label htmlFor="undertakenby">
          <h5>UnderTaken-By</h5>
          <input
            type="text"
            name="undertakenby"
            placeholder="Undertaken by"
            id="undertakenby"
            className="textfield textfield - 2"
            onChange={handlechange}
          />
        </label>

        <label htmlFor="billamount">
          <h5>Billamount</h5>
          <input
            type="number"
            name="price"
            placeholder="Bill amount"
            id="billamount"
            className="textfield textfield - 3"
            onChange={handlechange}
          />

        </label>
        <label htmlFor="purchasingdate">
          <h5>PURCHASE-DATE</h5>
          <input
            type="date"
            name="purchasingdate"
            placeholder="purchasingdate"
            id="purchasingdate"
            className="textfield textfield - 4"
            onChange={handlechange}
          />
        </label>
        <label htmlFor="billpaymentdate">
          <h5>PAYMENT-DATE</h5>
          <input
            type="date"
            name="duedate"
            placeholder="billpaymentdate"
            id="billpaymentdate"
            className="textfield textfield - 5"
            onChange={handlechange}
          />
        </label>
        <label htmlFor="nextpaymentdate">
          <h5>Next PAYMENT-DATE</h5>
          <input
            type="date"
            name="nextpaymentdate"
            placeholder="nextpaymentdate"
            id="nextpaymentdate"
            className="textfield textfield - 5"
            onChange={handlechange}
          />
        </label>
        <label htmlFor="paidamount">
          <h5>PAID-AMOUNT</h5>
          <input
            type="number"
            name="paidamount"
            placeholder="paidamount"
            id="paidamount"
            className="textfield textfield - 6"
            onChange={handlechange}
          />
        </label>
        <label htmlFor="volume">
          <h5>volume</h5>
          <input
            type="number"
            name="volume"
            placeholder="volume"
            id="volume"
            className="textfield textfield - 6"
            onChange={handlechange}
          />
        </label>
        <label htmlFor="pages">
          <h5>Pages</h5>
          <input
            type="number"
            name="pages"
            placeholder="pages"
            id="pages"
            className="textfield textfield - 6"
            onChange={handlechange}
          />
        </label>
        
        <button
          id="btn"
          type="submit"
          disabled={disable}
          onClick={handlesubmit}
        >
          Submit
        </button>
       
        {/* {message
        
        
        } */}
      </form>
    </>
  );
};
export default Editform;
