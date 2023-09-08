import React from 'react'
import Checkout from '../features/Orders/components/Checkout';

const CheckoutPage = () => {
  return (
    <div className="">
       <div className="">
             <div className="py-[40px] lg:py-[80px] flex flex-col items-center">
                  <h1 className="Cinzel text-3xl ">My Account</h1>
                  <p className="Merriweather text-sm mt-2 capitalize">home  &gt; Checkout</p>
             </div>
       </div>
       <Checkout/>
    </div>
  )
}

export default CheckoutPage;
