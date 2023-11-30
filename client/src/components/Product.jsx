import {  useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux";
import { selectAllProducts,fetchAllProductsasync } from "../features/Product/productSlice";
// import Star from "../../Rate/Star";
import { NavLink } from "react-router-dom";

const Product = ()=>{
    const dispatch = useDispatch();
    const [type,setType] = useState("New");
    const [filter,serFilter] = useState([]);
    const product = useSelector(selectAllProducts);
     
      useEffect(()=>{
        const filterProduct = product.filter((item)=>{return item.type.toUpperCase() === type.toUpperCase()})
        serFilter(filterProduct)
      },[product,type])

      useEffect(()=>{
        dispatch(fetchAllProductsasync());
      },[dispatch])
      
    return(
        <>
           <div className="">
               <div className="mx-14 mb-10">
                    <div className="flex gap-14 justify-center py-[50px] mb-4">
                        <h3 className={`Merriweather  font-medium text-1xl ${type.toUpperCase() === "NEW" ? "underline" : ""} cursor-pointer`} onClick={()=>setType("New")}>New arrivals</h3>
                        <h3 className={`Merriweather  font-medium text-1xl ${type.toUpperCase() === "BEST" ? "underline" : ""} cursor-pointer`} onClick={()=>setType("Best")}>Best seller</h3>
                    </div>
                    <div className="flex flex-wrap justify-evenly ">
                        {
                             filter && filter.slice(0,8).map(products =>{
                                return(
                                <div key={products._id} className="w-[100%] lg:w-[22%] mb-5 product cursor-pointer">
                                    <div className="relative outer cursor-pointer">
                                    <div className={`Cinzel text-sm ${type.toUpperCase() === "BEST"?"bg-[#0fb78d]":"bg-[#007bff]"} p-1 w-[24%] text-center text-white absolute top-0 left-0 z-10`}>{products.type}</div>
                                    <img src={products.images[0].images[0]} className="w-100" alt="" />
                                    <div className="inner absolute top-0 left-0 hidden">
                                    <img src={products.images[0].images[1]} className="w-100" alt="" />
                                    </div>
                                    </div>
                                    <div className="mt-3 flex justify-center items-center flex-col  text-center ">
                                        {/* <Star rate={products.rating.rate}/> */}
                                        <NavLink to={`/product/${products._id}`}><h3 className="text-lg Cinzel">{products.title}</h3></NavLink>
                                        <p className="text-sm Cinzel text-[#a86e3b]">Rs. {products.price}.00</p>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex items-center justify-center">
                    <NavLink to="/products/all" className="px-[14px] py-[12px] w-[100%] lg:w-[20%] border-[1px] cursor-pointer border-[#007bff]  mt-4 text-center Merriweather btn btn1">Load More</NavLink>
                    </div>
               </div>
           </div>
        </>
    )
}

export default Product;