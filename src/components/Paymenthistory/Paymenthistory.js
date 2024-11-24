import React from 'react'
import { useSelector } from 'react-redux';
import Tablehead from './Tablehead'

const Paymenthistory = () => {

  const duedetails = useSelector(state => state.customerReducer);

console.log([duedetails.data])







  return (
    <>
    <div className="container">
  <form className='form'>

<table>
  <thead>
    <Tablehead/>
  </thead>
  <tbody>
             

            </tbody>
</table>
</form>
</div>
        </>
  )
}

export default Paymenthistory