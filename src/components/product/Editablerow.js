import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchpdetail, updateproduct } from "../../actions/product";
// import  './Editablerow.css'

const Editablerow = ({ data, handleCancleclick, index }) => {
  const [disable, setDisable] = useState("");
  const dispatch = useDispatch();
  const [editFormData, seteditFormData] = useState(data);
  const [oldFormData, setoldFormData] = useState(data);

  const isDisabled = () => {
    const {
      companyname,
      productname,
      productquantity,
      productSellingquantity,
      productdate,
    } = editFormData;
    if (
      companyname &&
      productname &&
      productquantity &&
      productSellingquantity &&
      productdate
    )
      setDisable(false);
    else setDisable(true);
  };

  useEffect(() => {
    isDisabled();
    // console.log(disable);
  }, [isDisabled, disable]);

  // console.log(editFormData);
  var updateddata;
  const [updateData,setUpdateData]=useState(0)
  const handleEditchange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    console.log(fieldName);

    const newFormData = {...editFormData };


    if (fieldName === "productSellingquantity")
    {
      newFormData[fieldName] = event.target.value;
      seteditFormData(newFormData);
      setUpdateData( event.target.value);
    
    }
     else
     {
      const fieldvalue = event.target.value;
      newFormData[fieldName] = fieldvalue;
      seteditFormData(newFormData);
      // setaddFormData(null);
      // console.log(event.target._id);
      // console.log(editFormData)
    }
  };

  const handlesubmit = (e) =>{
    e.preventDefault();
    const oldPSQdata =oldFormData['productSellingquantity']
    const oldPQdata =oldFormData['productquantity'];
console.log(oldPSQdata)
console.log(oldPQdata)
    if(parseInt(oldPSQdata)!==parseInt(editFormData['productSellingquantity'])){
      console.log("Hiiibggd");
      if(parseInt(editFormData["productquantity"])-parseInt(editFormData['productSellingquantity'])>=0 &&editFormData['productSellingquantity']>0)
      {
        editFormData['productquantity']=parseInt(oldPQdata)-parseInt(editFormData['productSellingquantity']);
        editFormData['productSellingquantity']=parseInt(oldPSQdata)+parseInt(editFormData['productSellingquantity']);
      
    }

   
      else if( parseInt(editFormData['productSellingquantity'])<0)
      {
        alert("Not possible");
        editFormData['productSellingquantity']=oldPSQdata;

        // editFormData['productSellingquantity']=0;
        // editFormData['productquantity']=parseInt(oldPQdata)-parseInt(editFormData['productSellingquantity']);
      }
      else if(parseInt(editFormData['productSellingquantity'])>parseInt(oldPQdata)){
        alert("Action Not possible! Selling quantity is greater then product quantity ")
        editFormData['productSellingquantity']=oldPSQdata;
      }
      // else
      // {
      //   editFormData['productquantity']=0;
      // }
 
      else
      {
        editFormData['productSellingquantity']= parseInt(oldPSQdata)+parseInt(editFormData['productSellingquantity']);
      }

      // console.log(editFormData['productSellingquantity']);

    }
  
    dispatch(updateproduct(data._id, editFormData));
    dispatch(fetchpdetail());
    handleCancleclick();
  };

  return (
    <tr key={data._id}>
      <td>{index + 1}</td>
      <td className="imgholder">
        <img className="img" src={data.imageurl} />
      </td>
      <td>
        <input
          type="text"
          name="companyname"
          value={editFormData.companyname}
          onChange={handleEditchange}
        />
      </td>
      <td>
        <input
          type="text"
          name="productname"
          value={editFormData.productname}
          onChange={handleEditchange}
        />
      </td>
      <td>
        <input
          type="number"
          name="productquantity"
          value={editFormData.productquantity}
          onChange={handleEditchange}
        />
      </td>
      <td>
        <input
          type="number"
          name="productSellingquantity"
          value={editFormData.productSellingquantity}
          onChange={handleEditchange}
        />
      </td>
      <td>
        <input
          type="date"
          name="productdate"
          value={editFormData.productdate}
          onChange={handleEditchange}
        />
      </td>

      <td>
        <button type="submit" onClick={handlesubmit} disabled={disable}>
          save
        </button>
        <button onClick={handleCancleclick}>cancle</button>
      </td>
    </tr>
  );
};

export default Editablerow;
