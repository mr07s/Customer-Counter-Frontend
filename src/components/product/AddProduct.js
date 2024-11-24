import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { pdetails } from '../../actions/product';
import { storage } from '../../firebase.config/firebase'
import './Addproduct.css'
import { v4 } from 'uuid';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
// import e from 'cors';
import PhotoUploader from '../../helpers/uploder';

const AddProduct = () => {

  const User = JSON.parse(localStorage.getItem('Profile'));
  // console.log(User)
  const userId = User?.result?._id;

  const [companyname, setcompanyname] = useState('')
  const [productname, setProductname] = useState('')
  const [productquantity, setProductquantity] = useState('')
  const [productSellingquantity, setProductSellingquantity] = useState('')
  const [productdate, setProductdate] = useState('')
  const [disable, setDisable] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(productname,productquantity,productSellingquantity,productdate)
  //  val = 0;

  const productmessage = useSelector(state => state.productreducer)

  // const [productdata,setProductdata] =useState({

  //   productname:productname,
  //   productquantity:productquantity,
  //   productSellingquantity:productSellingquantity,
  //   productdate:productdate,


  // })

  const [imageupload, setImageupload] = useState('')
  const [imageurl, setImageurl] = useState(null)


  // const uploadImage = async ()=>{ 
  //   // e.preventDefault();
  //   if(imageupload===null){
  //     console.log("returned");
  //     return;
  //   }

  //   const imageRef =ref(storage,`images/${imageupload.name+v4()}`)
  //   await uploadBytes(imageRef,imageupload).then((snapshot)=>{
  //     getDownloadURL(snapshot.ref).then((url)=>{
  //       setImageurl(url);
  //       console.log(imageurl);
  //       // console.log(url+'hi');

  // })

  // })


  // };


  const clearinputs = () => {
    setProductname('');
    setcompanyname('');
    setProductquantity('');
    setProductSellingquantity('');
    setProductdate('');
    setImageurl(null)
  }



  const isDisabled = () => {
    if (imageurl && productname && productquantity  && productdate && companyname)
      setDisable(false);
    else setDisable(true);
  };

  useEffect(() => {
    isDisabled();
    // console.log(disable);
  }, [isDisabled, disable]);




  const handleaddproduct = (event) => {
    event.preventDefault();
    // uploadImage();
    // console.log(imageurl+"Hi");
    (dispatch(pdetails({ imageurl, companyname, productname, productquantity, productSellingquantity, productdate, userId }, navigate)))
    clearinputs();

    // productreducer
    // val=1;

  }

  return (
    <div className='outerbox'>
      <div className='formholder'>
        <form action="" className='Productform' onSubmit={handleaddproduct}>
          <label htmlFor="productname" >
            <h6>Products Name</h6>
            <input type="text" placeholder='Type Products Name' id='productname' value={productname} onChange={(e) => setProductname(e.target.value)} />
          </label>

          <label htmlFor="companyname" >
            <h6>Company Name</h6>
            <input type="text" placeholder='Type Companies Name' id='companyname' value={companyname} onChange={(e) => setcompanyname(e.target.value)} />
          </label>

          <label htmlFor="productsquantity">
            <h6>Products Quantity</h6>
            <input type="number" placeholder='Type Products Quantity' id='productsquantity' value={productquantity} onChange={(e) => setProductquantity(e.target.value)} />
          </label>

          <label htmlFor="productSellingquantity">
            <h6>Products Selling quantity</h6>
            <input type="number" placeholder='Type Products Selling quantity' id='productSellingquantity' value={productSellingquantity} onChange={(e) => setProductSellingquantity(e.target.value)} />
          </label>

          <label htmlFor="enterdate">
            <h6>Purchase Date</h6>
            <input type="Date" placeholder='Type Products Selling quantity' id='enterdate' value={productdate} onChange={(e) => setProductdate(e.target.value)} />
          </label>



          {/* <label htmlFor="photo">
  <h6>Upload Picture</h6>
<input type="file" name='file' id='photo' onChange={(event)=>{setImageupload(event.target.files[0])}}/>
</label> */}
          <PhotoUploader imgUrl={imageurl} setImgUrl={setImageurl} />

          <div id='buttondiv'>

            <button className='submit' disabled={disable}>Add Products</button>

          </div>

        </form>

      </div>


    </div>
  )
}

export default AddProduct