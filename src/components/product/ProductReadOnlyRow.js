import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteproduct, fetchpdetail, updateproduct } from '../../actions/product';
import PhotoUploader from '../../helpers/uploder';
import './ProductReadonlyRow.css'
const ProductReadOnlyRow = ({data,index,handleEditchange})=>{
  // console.log(data.imageurl+"AVBCKDKDK");
  const dispatch=useDispatch();

const handledelete=(e)=>
{

e.preventDefault();
dispatch(deleteproduct(data?._id));

}

const [editformdata, setEditformdata] = useState(data);
const [img, setImg] = useState(true);
const [imgurl, setImgurl] = useState(null);
console.log(imgurl);
const handleeditphoto =()=>{

setImg(false);

}
// const handlechange=()=>{
//   // event.preventDefault();

// const newFormData ={...editformdata};
// newFormData["imageurl"]=imgurl;
//  setEditformdata(newFormData);
//  console.log("editformdata");
//  console.log(editformdata);

// }

// const handlesubmit=(e)=>
// {
// e.preventDefault();

//   // const newFormData ={...editformdata};
 
//   //  newFormData["imageurl"]=imgurl;
//   // setEditformdata(newFormData);
//   // // console.log(newFormData);
//   // // console.log(data._id);
//   // console.log("editformdata");
//   // console.log(editformdata);
//   handlechange();
//   dispatch (updateproduct(data._id,editformdata));
//   dispatch(fetchpdetail());

// }



return (
<tr key={data._id}>
<td>{index+1}</td>

<td className='imgholder'>
 <img   className='img' src={data.imageurl} /></td>

 {/*{
img?(<td className='imgholder'>
<img   className='img' src={data.imageurl} /><button onClick={handleeditphoto} >Edit</button></td>):
 <Fragment>
<PhotoUploader imgUrl={imgurl}  setImgUrl={setImgurl}/>
<button onClick={handlesubmit} >save</button>
</Fragment>
}*/}
<td>{data.companyname}</td>
<td>{data.productname}</td>
<td>{data.productquantity}</td>
<td>{data.productSellingquantity}</td>
<td>{data.productdate}</td>
{/* <td>{data.duedate}</td> */}
<td>
<button type='button' onClick={()=>handleEditchange(data)}>Edit</button>
<button type='button' onClick={handledelete}  >Delete</button>
</td>
</tr>
)
}

export default ProductReadOnlyRow