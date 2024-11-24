import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import ProductReadOnlyRow from "./ProductReadOnlyRow";
import Tablehead from "./Tablehead";
import "./ShowProduct.css";
import Editablerow from "./Editablerow";
import Searchbar from "../duedetails/Searchbar";

const ShowProduct = () => {
  const User = JSON.parse(localStorage.getItem("Profile"));
  const userId = User?.result?._id;

  const [search, setSearch] = useState("");
  const searching = (e) => {
    const data = e.target.value;
    setSearch(data);
    console.log(search);
  };

  const getpdetails = useSelector((state) => state.productreducer);

  console.log(getpdetails);

  const [productId, setProductId] = useState(null);
  const handleEditchange = (product) => {
    setProductId(product._id);
    // console.log(productId);
  };
  const handleCancleclick = () => {
    setProductId("");
  };

  const editFormData = () => {};

  const searchResult = (search, data) => {
    if (search.toLowerCase() === "") {
      return data;
    }

    if (search.toLowerCase() !== "") {
      // if(data.Name.toLowerCase().includes(search)){
      //   return data.Name.toLowerCase().includes(search);
      // }

      if (data?.companyname?.toLowerCase().includes(search)) {
        return data.companyname.toLowerCase().includes(search);
      } else if (data?.productname?.toLowerCase().includes(search)) {
        return data.productname.toLowerCase().includes(search);
      }

      // else if(data.purchasingdate.includes(search))
      // {
      //   return data.purchasingdate.includes(search);
      // }
      else if (data?.productdate?.includes(search)) {
        return data.productdate.includes(search);
      }
    }
  };

  return (
    <>
      <Searchbar searching={searching} />
      <div className="outerbox">
        <div className="outertable">
          <table>
            <thead>
              <Tablehead />
            </thead>
            <tbody>
              {getpdetails?.data
                ?.filter((Data) => {
                  return searchResult(search, Data);
                })
                .filter((Data) => Data.userId === userId)
                .map((data, index) => (
                  <Fragment key={index}>
                    {productId === data._id ? (
                      <Editablerow
                        data={data}
                        index={index}
                        handleCancleclick={handleCancleclick}
                      />
                    ) : (
                      <ProductReadOnlyRow
                        data={data}
                        index={index}
                        handleEditchange={handleEditchange}
                      />
                    )}
                  </Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ShowProduct;
