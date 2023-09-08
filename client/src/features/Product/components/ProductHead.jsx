const ProductHead = (props)=>{
    return(
       <div className="">
             <div className="py-[40px] lg:py-[80px] flex flex-col items-center">
                  <h1 className="Cinzel text-3xl ">Products</h1>
                  <p className="Merriweather text-sm mt-2 capitalize">home  &gt; Products &gt; {props.type}</p>
             </div>
       </div>
    )
}

export default ProductHead;