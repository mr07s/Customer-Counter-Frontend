import React from "react";

// import './App.css';
import data from "./mock-data.json";
import { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
// import Navbar from './components/Navbar'
import "./DueditailsMain.css";
import Searchbar from "./Searchbar";
import Tablehead from "./Tablehead";
import Readonlyrow from "./Readonlyrow";
import Editform from "./Editform";
import Editablerow from "./Editablerow";
import {
  customerdetails,
  deletecustomerdetails,
  getdetails,
  updatecustomer,
} from "../../actions/customer";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { initializeUseSelector } from 'react-redux/es/hooks/useSelector';
// import { resourceLimits } from 'worker_threads';
// to get data from local storage

import Galaxymarblelogo from "../galaxymarblelogo";

const DueditailsMain = () => {
  const duedetails = useSelector((state) => state.customerReducer);
  console.log("duedetails");
  console.log(duedetails);

  const User = JSON.parse(localStorage.getItem("Profile"));
  // const userId= User.result.id;
  const userId = User?.result?._id;

  // console.log(userId);

  const dispatch = useDispatch();
  // const navigate =useNavigate();

  //search filter
  const [search, setSearch] = useState("");
  const searching = (e) => {
    const data = e.target.value;
    setSearch(data);
    // console.log(search);
  };

  //Searching mechanism
  const searchResult = (search, data) => {
    if (search.toLowerCase() === "") {
      return data;
    }

    if (search.toLowerCase() !== "") {
      if (data.Name.toLowerCase().includes(search)) {
        return data.Name.toLowerCase().includes(search);
      } else if (data?.undertakenby?.toLowerCase().includes(search)) {
        return data.undertakenby.toLowerCase().includes(search);
      }

      // else if (data?.Name?.toLowerCase().includes(search)) {
      //   return data.Name.toLowerCase().includes(search);
      // }

      // else if(data.purchasingdate.includes(search)){
      //   return data.purchasingdate.includes(search);
      // }
      else if (data?.nextpaymentdate?.includes(search)) {
        return data.nextpaymentdate.includes(search);
      }
    }
  };

  //Edit form show
  const [editform, setEditform] = useState(false);

  const add = () => {
    if (editform) {
      setEditform(false);
    } else {
      setEditform(true);
    }
  };

  const [editcustomerId, seteditcustomerId] = useState(null);

  const handleEditclick = (event, customer) => {
    event.preventDefault();
    // console.log(customer);
    seteditcustomerId(customer._id);
  };

  const handleCancleclick = () => {
    seteditcustomerId(null);
  };

  const handleDeleteclick = (customerId) => {
    dispatch(deletecustomerdetails(customerId));
  };

  const totaldue = () => {
    try {
      let total = 0;
      duedetails?.data
        ?.filter((Data) => Data.userId === userId)
        .map((data) => {
          total = total + +data.price;
          console.log(total);
        });

      return total;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bodybox">
      <Searchbar searching={searching} />
      {/* <Galaxymarblelogo/> */}

      <div className="flex flex-col m-3 p-3 w-362 justify-center items-center mt-0 pt-0">
        {/* <div>
          {totalDue}
        </div> */}
        {/* <button onClick={add} className='formaddbtn' >{editform ? 'Close' : 'Add'}</button>
        {editform &&
          <Editform />} */}
        <div className="min-w-44 border-1 border-black-600 ">
          <h2>TotalDue :&nbsp;{totaldue()} &nbsp;Ruppes</h2>
        </div>
        <form className="form ">
          <table className="table-fixed border-2 border-black">
            <thead>
              <Tablehead />
            </thead>
            <tbody className="">
              {duedetails?.data
                ?.filter((Data) => {
                  return searchResult(search, Data);
                })
                .filter((Data) => Data.userId === userId)
                .map((data, index) => (
                  <Fragment key={index}>
                    {/* {totalDue = totalDue + parseInt(data?.price) - parseInt(data?.paidamount)} */}
                    {editcustomerId === data._id ? (
                      <Editablerow
                        data={data}
                        handleCancleclick={handleCancleclick}
                        index={index}
                      />
                    ) : (
                      <Readonlyrow
                        data={data}
                        handleEditclick={handleEditclick}
                        handleDeleteclick={handleDeleteclick}
                        index={index}
                      />
                    )}
                  </Fragment>
                ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};
export default DueditailsMain;
