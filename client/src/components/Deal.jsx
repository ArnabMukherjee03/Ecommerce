const Deal = ()=>{
    return(
        <div className="mx-2 lg:mx-14 mb-14">
        <div className="deal-hero">
           <div className="w-[90%] lg:w-[50%] p-[10px] lg:p-[30px] bg-white absolute left-1 lg:left-5 top-1/2 translate-y-[-50%]">
           <span className="text-xs mb-2 Merriweather">Limited Offers 20% OFF</span>
           <h2 className="mb-1 Cinzel text-2xl text-[#a86e3b]">Week Deal</h2>
           <p className="mb-2 text-xs lg:text-sm Merriweather">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla earum.</p>
           <div className="px-[14px] py-[12px] w-full lg:w-[40%] border-[1px] cursor-pointer border-[#a86e3b] before:bg-[#a86e3b] text-center Merriweather btn btn1">Shop Now</div>
           </div>
        </div>
      </div>
    )
}

export default Deal;