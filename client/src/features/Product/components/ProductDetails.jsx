import { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { FiTruck } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync, selectProductById,selectloading} from "../productSlice";
import { MutatingDots } from 'react-loader-spinner';
import { addToCartAsync, selectItems } from "../../Cart/cartSlice";

const ProductDetails = () => {
  window.scroll(0,0);
  const [imgNo, setImgNo] = useState(0);
  const [size, setSize] = useState("L");
  const [images,setImages] = useState([]);
  const [color,setColor] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, id]);

  const productdetail = useSelector(selectProductById);
  const items = useSelector(selectItems);
  const status = useSelector(selectloading);
  useEffect(()=>{
    if(productdetail && productdetail.colors){
      setColor(productdetail.colors[0].name.toUpperCase())
    }
  },[productdetail])

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor); // Update the selected color in state
  };

  useEffect(()=>{
  
      if (productdetail && productdetail.images) {
        const img = productdetail.images.find(image => image.color.toUpperCase() === color);  
        setImages(img && img.images);
       }
  
  },[productdetail,color])
 
  const handleCart = (e) => {
    e.preventDefault();
    if (
      items.findIndex((item) => item.productId._id === productdetail._id) < 0
    ) {
      console.log({ items, productdetail });
      const newItem = {
        productId: productdetail._id,
        quantity: 1,
        size: "L",
        color: productdetail.colors[0].name
      };
      dispatch(addToCartAsync(newItem));
    } else {
      alert("Item Already added");
    }
  };

  // Date
  const date = new Date();
  const current = new Date();
  const time = new Date();
  current.setDate(current.getDate() + 7);
  date.setDate(current.getDate() + 11);

  return (
    <>
     {
      status === "loading"?
      <div className="h-[50vh] w-full flex items-center justify-center">
      <MutatingDots 
        height="100"
        width="100"
        color="#007bff"
        secondaryColor= '#007bff'
        radius='10'
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
       />
       </div>
      :
      <div className="">
      <div className="">
        <p className="py-[30px] ps-4 lg:ps-10 Merriweather text-xs lg:text-xs text-gray-400">
          Home &gt; AllProducts &gt;{" "}
          <span className="text-black text-xs">
            {productdetail && productdetail.title}
          </span>
        </p>
      </div>
      <div className="mb-14">
        <div className="mx-4 lg:mx-8">
          <div className="flex flex-col lg:flex-row">
            {/* Images */}
            <div className="w-[100%] lg:w-[58%]">
              <div className="flex flex-col-reverse lg:flex-row gap-2 justify-evenly">
                <div className="flex w-[100%] lg:w-[18%] flex-row lg:flex-col gap-3">
                  {images &&
                    images.map((imgsrc, index) => {
                      return (
                        <div key={index} className="w-full transition-all  duration-100 hover:border-[1px]">
                          <img
                            src={imgsrc}
                            className="w-full transition-all  duration-100 hover:p-[10px]"
                            onClick={() => setImgNo(index)}
                            alt=""
                          />
                        </div>
                      );
                    })}
                </div>
                <div className="w-full lg:w-[80%]">
                  <img
                    src={images && images[imgNo]}
                    alt=""
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            {/* Details */}
            <div className="lg:w-[50%] w-[100%] ps-2 mt-2 lg:mt-0 lg:ps-10">
              {/* <Star rate={rating && rating.rate}/> */}
              <div className="flex flex-col gap-1 pb-2 border-b-[1px] w-[90%]">
                <h1 className="Cinzel text-xl mt-1">
                  {productdetail && productdetail.title}
                </h1>
                <p className="text-lg text-red-600 Cinzel">
                  Rs. {productdetail && productdetail.price}.00
                </p>
                <p className="Cinzel">
                  by{" "}
                  <span className="text-black text-[16px] ps-2">
                    {productdetail && productdetail.brand.label}
                  </span>
                </p>
                <p className="mt-2 Merriweather text-sm">
                  {productdetail && productdetail.description}
                </p>
              </div>
              <div className="mt-2  Merriweather">
                <p className="text-xl Merriweather text-green-500 flex gap-2 items-center">
                  {" "}
                  <AiFillCheckCircle className="" />
                  In stock
                </p>
                <p className="mt-4 text-sm">Size : {size}</p>
                <div className="flex gap-2 mt-3">
                  {productdetail &&
                    productdetail.sizes.map((sizes,index) => {
                      return (
                        <p key={index}
                          className={`p-[5] border-[1px] border-black w-[40px] cursor-pointer text-center ${
                            size === sizes ? "bg-black text-white" : ""
                          }`}
                          onClick={() => {
                            setSize(sizes);
                          }}
                        >
                          {sizes}
                        </p>
                      );
                    })}
                </div>
                <div className="mt-4 Merriweather">
                  <p className="text-sm">Color: {color}</p>
                  <div className="mt-4 flex gap-3">
                    {productdetail &&
                      productdetail.colors.map((color) => {
                        return (
                            <div key={color._id}
                              className={`h-[20px] w-[20px] cursor-pointer ${color.name === "White"?'border-[1px] border-black':''}`}
                              style={{ backgroundColor: `${color.code}` }}
                              onClick={()=>{handleColorChange(color.name.toUpperCase())}}
                            ></div>
                        );
                      })}
                  </div>
                </div>

                <div
                  className="mt-10 px-[14px] py-[12px] w-[100%] border-[1px]  cursor-pointer border-[#000]  text-white  text-center Merriweather transition-all duration-300 hover:bg-[#007bff] hover:border-[#007bff] bg-black"
                  onClick={handleCart}
                >
                  Add To Cart
                </div>
                <div className="mt-4 px-[14px] py-[12px] w-[100%] border-[1px] cursor-pointer border-[#000] hover:border-[#007bff]  text-center Merriweather btn btn1">
                  Buy it Now
                </div>
              </div>
              <div className="flex mt-6 py-5 border-y-[1px] border-gray-300">
                <div className="w-[10%] flex items-center justify-center text-2xl">
                  <FiTruck />
                </div>
                <div className="w-[90%] border-s-[1px] border-gray-300">
                  <p className="px-6 Merriweather text-sm text-[#d3d3d3]">
                    Order in the next{" "}
                    <span className="text-black">
                      {24 - time.getHours()} hours underline
                    </span>{" "}
                    <span className="text-black">
                      {60 - time.getMinutes()} minutes
                    </span>{" "}
                    to get it between{" "}
                    <span className="text-black underline">
                      {current.toDateString()}
                    </span>{" "}
                    and{" "}
                    <span className="text-black underline">
                      {date.toDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      }
    </>
  );
};

export default ProductDetails;
