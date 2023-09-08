import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { selectAllProducts } from "../productSlice";
import { addToCartAsync, selectItems } from '../../Cart/cartSlice';

const ProductList = ({type}) => {
  // Small Screen Filter Funtionality
  const [isOpen, setIsOpen] = useState(false);
  const [filterProduct,setFilterProduct] = useState([]);
  const handleClose = () => {
    setIsOpen(false);
  };
  const dispatch = useDispatch();
  const product = useSelector(selectAllProducts);
  const items = useSelector(selectItems);


  const handleCart = (id) => {
    if (items.findIndex((item) => item.productId._id === id) < 0) {
      const newItem = {
        productId: id,
        quantity: 1,
      };
      dispatch(addToCartAsync(newItem));
    } else {
      alert('Item Already added');
    }
  };
  
  

  useEffect(()=>{
    if(type !== "all"){
    const filterProduct = product.filter(product =>{return product.gender === type})
    setFilterProduct(filterProduct)
    }else{
      setFilterProduct(product)
    }
  },[product,type])


  return (
    <>
      <div className="">
        <div className="flex mx-4">
          {/* start :: Filter Section  */}
          <div
            className={`${
              isOpen ? "left-0" : "left-[-100%]"
            } w-[90%] lg:w-[25%] fixed lg:static bg-white z-50 h-full left-0 top-0 transition-all duration-300`}
          >
            <div
              onClick={handleClose}
              className="lg:hidden w-full  flex justify-end py-[20px]  px-[30px] text-2xl"
            >
              x
            </div>
            <div className="flex w-full">
              <div className="mx-4 pb-5 border-b-[1px] w-full">
                <h1 className=" mb-3 Cinzel text-xl">Collections</h1>
                <div className="Merriweather text-xs flex flex-col gap-3">
                  {/* {categories &&
                    categories.map((collection) => {
                      return (
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            name={collection}
                            value={collection.value}
                          />
                          <label>{collection.label}</label>
                        </div>
                      );
                    })} */}
                </div>
              </div>
            </div>
            <div className="flex w-full mt-8">
              <div className="mx-4 pb-5 border-b-[1px] w-full">
                <h1 className=" mb-3 Cinzel text-xl">Brands</h1>
                <div className="Merriweather text-xs flex flex-col gap-3">
                  {/* {brands.map((collection) => {
                    return (
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          value={collection.value}
                          checked={collection.checked}
                          onChange={handleCheckboxChange}
                        />
                        <label>{collection.label}</label>
                      </div>
                    );
                  })} */}
                </div>
              </div>
            </div>
          </div>
          {/* End :: Filter Section */}
          {/* start :: Product Section  */}
          <div className="lg:w-[75%] w-full">
            <div
              className="px-[8px] py-[4px] w-[40%] lg:hidden lg:w-[20%] border-[1px] cursor-pointer border-[#000]  mt-4 text-center Merriweather btn btn1 mb-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              Filters
            </div>
            <div className="flex flex-wrap justify-evenly ">
              {filterProduct&&filterProduct.map((products) => {
                return (
                  <div key={products._id} className="w-[45%] lg:w-[32%] mb-5 product cursor-pointer">
                    <div className="relative outer cursor-pointer">
                      <div
                        className={`Cinzel text-sm
                            bg-[#0fb78d] p-1 w-[24%] text-center text-white absolute top-0 left-0 z-10`}
                      >
                        Best
                      </div>
                      <img
                        src={products && products.images[0]}
                        className="w-100"
                        alt=""
                      />
                      <div className="inner absolute top-0 left-0 hidden">
                        <img
                          src={products && products.images[1]}
                          className="w-100"
                          alt=""
                        />
                      </div>
                      <div className="px-[14px] py-[4px] w-[100%]  text-white text-sm cursor-pointer mt-4 text-center Merriweather btn btn1 cartBtn " onClick={(e)=>handleCart(products._id)}>
                        Add to Cart
                      </div>
                    </div>
                    <div className="mt-3 flex justify-center items-center flex-col  text-center ">
                      {/*TODO:  Add Star on basis of Rating */}
                      {/* <Star rate={products.rating.rate} /> */}
                      <h3 className="text-lg Cinzel">
                        <NavLink to={`/product/${products._id}`}>
                        {products.title}
                        </NavLink>
                      </h3>
                      <p className="text-sm Cinzel text-[#a86e3b]">
                        Rs. {products.price}.00
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* End :: Product Section */}
        </div>
      </div>
    </>
  );
};

export default ProductList;
