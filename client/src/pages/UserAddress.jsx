import React from 'react'
import UserSideBar from '../features/User/Components/UserSideBar';
import Address from '../features/Address/components/Address'

const UserAddress = () => {
  return (
    <div>
      <div className=''>
       <div className="">
             <div className="py-[40px] lg:py-[80px] flex flex-col items-center">
                  <h1 className="Cinzel text-3xl ">My Account</h1>
                  <p className="Merriweather text-sm mt-2 capitalize">home  &gt; My Account &gt; Addresses</p>
             </div>
       </div>
        <div className=" bg-[#f5f7fa]">
        <div className="flex  h-full mx-16 gap-5">
        <UserSideBar/>
        <Address/>
        </div>
        </div>
    </div>
    </div>
  )
}

export default UserAddress
