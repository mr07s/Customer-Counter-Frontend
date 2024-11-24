import React from 'react'
import './Homerightbar.css'
const Homerightbar = () => {
  return (
    <div className='outercontainer'>
<div className="heading-1">

<h1>User Manual: </h1>
<h4>How to use this app</h4>
</div>

<div className="container-1">
<h3 className='miniheader'>**SignUp</h3>
<p>First you have to SignUp and create a account ,without this you can't use this app </p>
<h3 className='miniheader'>**LogIn</h3>
<p>After creating account you can use the email Id and password to log In and you have to store the Id and Password beacuse it is unrecoverable</p>
<h3>Duedetails</h3>
<p className='content-1'>In this page you can save  customer details like the customer name ,when the customer buy things ,what are the price of the things that  customer brought,and who is the incharge of the customer</p>
<h3 className='miniheader'>Searchbar</h3>
<p>In  duedetails searchbar you can search the name of the Incharged person ,search the due payment date and search by the price of the product </p>
<h3 className='miniheader'>AddProducts</h3>
<p>In this page you can add the product details of your store with the images of the product</p>
<p>In this page you have to fill all the details without this you can't submit the form ,and when you filling the form if you press <bd>Tab</bd>  you can go to the next input field</p>
<h3 className='miniheader'>ShowProducts</h3>
<p>In this page you can see the products available in your store and can edit the details,and you can search them by Company Name, Product Name and Purchase Date.</p>

</div>


    </div>
  )
}

export default Homerightbar