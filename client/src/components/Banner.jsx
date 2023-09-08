import bannerImg from "../Images/banner1.webp";


const Banner = ()=>{
    return(
        <div className="">
               <div className="flex flex-col gap-6">
                   <img src={bannerImg} alt="" className="relative "/>
                   <div className="lg:absolute lg:h-[100%] lg:top-[80px] flex items-center ps-[10px] lg:ps-[100px]">
                    <div className="">
                    <p className="ps-2  mb-2 lg:mb-4 Merriweather text-sm"><span className="Cinzel">20%</span> Off All Items</p>
                    <h1 className="text-4xl lg:text-5xl Cinzel ">The Secret</h1>
                    <h1 className="text-4xl lg:text-5xl Cinzel">is in the Styling</h1>
                    <div className="px-[14px] py-[12px] w-[50%] border-[1px] cursor-pointer border-[#007bff]  mt-4 text-center Merriweather btn btn1">Shop Collection</div>
                    </div>
                   </div>
               </div>
        </div>
    )
    
}

export default Banner;