import { useDispatch, useSelector } from "react-redux";
import Searchbar from "../duedetails/Searchbar";
import React, { Fragment, useState } from "react";
import "./ShowProduct.css";
import "./Inventory.css";
import closecycle from "../../components/images/close-circle-line.svg";
import { fetchpdetail, updateproduct } from "../../actions/product";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

const Inventory = () => {
  const User = JSON.parse(localStorage.getItem("Profile"));
  const userId = User?.result?._id;
  const navigate = useNavigate();
  const [productName, setProductName] = useState();
  const [companyName, setCompanyName] = useState();
  const [productQuantity, setProductQuantity] = useState();
  //selling quantity means how much i want to sell
  const [sellingQuantity, setSellingQuantity] = useState();
  const [fromdata, setFromData] = useState();
  const [soldDate, setSodDate] = useState();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const handleModel = async (e, data) => {
    e.preventDefault();
    setOpen(true);
    console.log(data);
    const copy = { ...data };
    setFromData(copy);
    console.log(fromdata);
    setProductName(data?.productname);
    setCompanyName(data?.companyname);
    setProductQuantity(data?.productquantity);

    // console.log(productquantity);
  };

  const closeModel = () => {
    setOpen(false);
  };

  const handleSell = async (e) => {
    e.preventDefault();
    if (parseInt(sellingQuantity) > parseInt(productQuantity)) {
      alert("This much ammount is not in stock");
      return;
    }
    const res = await axios.post("http://localhost:5000/phonepay/pay");
    const marchentTransId = res.data.data.merchantTransactionId;
    console.log(marchentTransId);
    handlePhonepayPayment(res);
    const payment_res = await axios.post(
      `http://localhost:5000/phonepay/afterpay/${marchentTransId}`
    );
    console.log(payment_res);
    console.log(res);
    console.log("res");
    console.log(res);
    console.log("Hii");
    console.log(fromdata);
    if (payment_res.data == "PAYMENT_SUCCESS") {
      return;
    }
    let tempproductQuant = productQuantity;
    //new product quantity
    let newPQ = parseInt(tempproductQuant) - sellingQuantity;
    console.log(newPQ);
    let alreadySold = fromdata["productSellingquantity"];
    const totalProductSold = parseInt(alreadySold) + parseInt(sellingQuantity);

    console.log(totalProductSold);

    // let tempData = ;
    fromdata.productquantity = newPQ.toString();
    fromdata.productSellingquantity = totalProductSold.toString();
    fromdata.productdate = soldDate?.toString();
    console.log(fromdata);
    dispatch(updateproduct(fromdata._id, fromdata));
    dispatch(fetchpdetail());
    setOpen(false);
  };

  const handlePhonepayPayment = async (res) => {
    console.log(res.data.data.instrumentResponse.redirectInfo.url);
    const url = res.data.data.instrumentResponse.redirectInfo.url;
    window.location.href = url;
  };
  const getpdetails = useSelector((state) => state.productreducer);
  console.log(getpdetails);
  return (
    <>
      <div className="Inventory">
        {open ? (
          <div className="sellContainer">
            <div className="navsidebarselect " onClick={closeModel}>
              {open ? <img src={closecycle} className="closenav" /> : <></>}
            </div>
            <div class="sellModel">
              <div class="formholder">
                <form action="" className="Productform">
                  <label htmlFor="Product Name">
                    <h6>Product Name</h6>
                    <input
                      type="text"
                      placeholder=""
                      value={productName}
                      readOnly={true}
                    />
                  </label>
                  <label htmlFor="Company Name">
                    <h6>Company Name</h6>
                    <input
                      type="text"
                      placeholder=""
                      value={companyName}
                      readOnly={true}
                    />
                  </label>
                  <label htmlFor="Date">
                    <h6>Date</h6>
                    <input
                      type="Date"
                      placeholder=""
                      onChange={(e) => {
                        setSodDate(e.target.value);
                      }}
                    />
                  </label>
                  <label htmlFor="Available Quantity">
                    <h6>Available Quantity</h6>
                    <input
                      type="number"
                      value={productQuantity}
                      readOnly={true}
                    />
                  </label>
                  <label htmlFor="Sell Quantity">
                    <h6>Sell Quantity</h6>
                    <input
                      type="number"
                      placeholder=""
                      onChange={(e) => setSellingQuantity(e.target.value)}
                    />
                  </label>
                  <button className="sell_btn" onClick={(e) => handleSell(e)}>
                    Sell
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <table>
          <tr>
            <th>Product Name</th>
            <th>Product Company</th>
            <th>Available Quantity</th>
            <th>Sell</th>
          </tr>
          {getpdetails?.data
            ?.filter((Data) => Data.userId === userId)
            .map(
              (data, index) => (
                console.log(data.productquantity),
                (
                  <tr key={index}>
                    <td>{data.productname}</td>
                    <td>{data.companyname}</td>
                    <td>{data.productquantity}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          handleModel(e, data);
                        }}
                        className="sell_btn_model"
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
        </table>
      </div>
      <table>
        <tr>
          <th>Product Name</th>
          <th>Product Name</th>
          <th>Product Name</th>
          <th>Product Name</th>
        </tr>
      </table>
    </>
  );
};

export default Inventory;
