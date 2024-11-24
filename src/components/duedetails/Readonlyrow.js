import React from 'react'
import { Link } from 'react-router-dom'
import  {useActualPrice}  from '../context/Actualprice';

const Readonlyrow = ({ data, handleEditclick, handleDeleteclick, index }) => {
  // const [actualPrice,setActualPrice]=useActualPrice();

// setActualPrice( ((+data?.price)+(+data?.paidamount)));
// console.log(data.price)
// console.log(data?.paidamount)
// console.log("actualPrice")
// console.log(actualPrice)
  // console.log(data._id)
  const ActualPrice =((+data?.price)+(+data?.paidamount));
  return (
    <tr key={data?._id}>
      <td>{index + 1}</td>
      <td><Link to={`/paymenthistory/${data._id}`}>{data.Name}</Link></td>
      <td>{data.undertakenby}</td>
      <td>{ActualPrice}</td> {/*// This newprice indicate the actual price amount*/}
      <td>{data.price}</td>                 {/* this price idicates the due amaount */}
      <td>{data.purchasingdate}</td>
      <td>{data.duedate}</td>
      <td>{data.nextpaymentdate|| 0}</td>
      <td>{data.paidamount}</td>
      <td>{data?.volume || 0}</td>
      <td>{data?.pages || 0}</td>
      <td>
        <button type='button' onClick={(event) => handleEditclick(event, data)}>Edit</button>
        <button type='button' onClick={() => handleDeleteclick(data._id)}>Delete</button>
      </td>
    </tr>
  )
}

export default Readonlyrow
