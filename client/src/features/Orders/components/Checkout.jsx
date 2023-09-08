import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  addAddressAsync,
  fetchAddressAsync,
  selectAddress,
} from "../../Address/addressSlice";
import {
  deleteItemFromCartAsync,
  selectCartStatus,
  selectItems,
  selectError,
  updateCartAsync,
  fetchItemsByUserIdAsync,
} from "../../Cart/cartSlice";
import { createOrderAsync, selectcurrentorder } from "../orderSlice";
import Modal from "../../../components/Modal";
import { Link, Navigate,useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const address = useSelector(selectAddress);
  const currentOrder = useSelector(selectcurrentorder);
  const error = useSelector(selectError)
  const [addressData, setAddressData] = useState({
    name: "",
    phoneNo: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternateNo: "",
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    dispatch(fetchAddressAsync());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const reset = () => {
    setAddressData({
      name: "",
      phoneNo: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      landmark: "",
      alternateNo: "",
    });
  };

  const addAddress = (address) => {
    dispatch(addAddressAsync(address));
    reset();
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(address[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const [openModal, setOpenModal] = useState(null);

  const totalAmount = items.reduce(
    (amount, item) => item.productId.price * item.quantity + amount,
    0
  );

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync());
  }, [dispatch]);

  useEffect(()=>{
     if(error){
        toast.error(error);
        navigate("/");
     }
  },[error,navigate])

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    const update = {
      id: item._id,
      quantity: +e.target.value,
    };
    dispatch(updateCartAsync(update));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalItems,
        paymentMethod,
        selectedAddress,
        status: "pending",
      };
      dispatch(createOrderAsync(order));
    } else {
      alert("Enter Address and Payment method");
    }
  };

  return (
    <>
       {}
       {currentOrder && (
        <Navigate
          to={`/ordersuccess/${currentOrder._id}`}
          replace={true}
        ></Navigate>
      )}
    <div className="flex mx-8 gap-4">
      {/* <p>Personal Information</p> */}
      <div className="w-[50%] ">
        {/* Heading: Start */}
        <div className="w-full">
          <p className="Cinzel">Personal Information</p>
        </div>
        {/* Heading: End */}
        {/* New Address: Start */}
        <div className="w-full">
          <div className="mt-4 Merriweather flex gap-5">
            <input
              type="text"
              onChange={handleInputChange}
              id="name"
              name="name"
              value={addressData.name}
              placeholder="Name"
              className="ps-1 h-8 text-xs outline-none w-[48%] border-b-[1px] border-b-black"
            />
            <input
              type="text"
              onChange={handleInputChange}
              id="phoneNo"
              name="phoneNo"
              value={addressData.phoneNo}
              placeholder="Phone No"
              className="ps-1 Cinzel h-8 text-xs outline-none w-[48%] border-b-[1px] border-b-black"
            />
          </div>
          <div className="mt-4 Merriweather flex gap-5">
            <input
              type="text"
              onChange={handleInputChange}
              id="pincode"
              name="pincode"
              value={addressData.pincode}
              placeholder="pincode"
              className="Cinzel ps-1 h-8 text-xs outline-none w-[48%] border-b-[1px] border-b-black"
            />
            <input
              type="text"
              onChange={handleInputChange}
              id="locality"
              name="locality"
              value={addressData.locality}
              placeholder="locality"
              className="ps-1 h-8 text-xs outline-none w-[48%] border-b-[1px] border-b-black"
            />
          </div>
          <div className="mt-4 Merriweather flex gap-5">
            <textarea
              onChange={handleInputChange}
              type="text"
              id="address"
              name="address"
              value={addressData.address}
              placeholder="Address"
              className="ps-4 h-20 text-xs outline-none w-[100%]  border-[1px] py-4  border-black "
            />
          </div>
          <div className="mt-4 Merriweather flex gap-5">
            <input
              type="text"
              onChange={handleInputChange}
              id="city"
              name="city"
              value={addressData.city}
              placeholder="City/District/Town"
              className="ps-1 h-8 text-xs outline-none w-[48%] border-b-[1px] border-b-black"
            />
            <input
              type="text"
              onChange={handleInputChange}
              id="state"
              name="state"
              value={addressData.state}
              placeholder="State"
              className="ps-1 h-8 text-xs outline-none w-[48%] border-b-[1px] border-b-black"
            />
          </div>
          <div className="mt-4 Merriweather flex gap-5">
            <input
              type="text"
              onChange={handleInputChange}
              id="landMark"
              value={addressData.landmark}
              name="landMark"
              placeholder="landmark (optional)"
              className="ps-1 h-8 text-xs outline-none w-[48%] border-b-[1px] border-b-black"
            />
            <input
              type="text"
              onChange={handleInputChange}
              id="alternateNo"
              value={addressData.alternateNo}
              name="alternateNo"
              placeholder="Alternate Phone (optional)"
              className="ps-1 h-8 Cinzel text-xs outline-none w-[48%] border-b-[1px] border-b-black"
            />
          </div>
          <div className="w-full flex gap-2 justify-end mt-4 Merriweather text-sm ">
            <div
              className="cursor-pointer text-green-800"
              onClick={() => {
                addAddress(addressData);
              }}
            >
              Save
            </div>
            <div
              className="cursor-pointer text-red-500"
              onClick={() => {
                reset();
              }}
            >
              Reset
            </div>
          </div>
        </div>
        {/* New Address: End */}
        {/* Existing Address: Start  */}
        <div className="w-full mt-4">
          <p className="Cinzel ">Choose From Existing Address</p>
        </div>
        <div className="w-full flex flex-col gap-4 mt-4">
          {address &&
            address.map((address, index) => {
              return (
                <div
                  key={address._id}
                  className="flex gap-4 Merriweather text-xs"
                >
                  <div className=" flex items-center">
                    <input
                      onChange={handleAddress}
                      name="address"
                      type="radio"
                      value={index}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="">
                    <div className="flex gap-8 ">
                      <p>{address.name}</p>
                      <p className="Cinzel">{address.phoneNo}</p>
                    </div>
                    <div className="mt-2">
                      {address.address +
                        ", " +
                        address.locality +
                        ", " +
                        address.city +
                        ", " +
                        address.state +
                        " - "}
                      <span className="Cinzel">{address.pincode}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* Existing Address: End  */}
        {/* Payment Method: Start */}
        <div className="my-[50px] Merriweather">
          <fieldset>
            <legend className="Cinzel  text-lg">Payment Methods</legend>
            <p className="mt-1 text-sm  text-gray-500">Choose One</p>
            <div className="mt-2 ">
              <div className="flex items-center gap-x-3">
                <input
                  id="cash"
                  name="payments"
                  onChange={handlePayment}
                  value="cash"
                  type="radio"
                  checked={paymentMethod === "cash"}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="cash" className="block text-sm  text-gray-900">
                  Cash On Delivery
                </label>
              </div>
              <div className="flex mt-2 items-center gap-x-3">
                <input
                  id="card"
                  onChange={handlePayment}
                  name="payments"
                  checked={paymentMethod === "card"}
                  value="card"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="card"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pay Now
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        {/* Payment Method: End*/}
      </div>
      {/* Cart Item  */}
      <div className="w-[50%]">
        <div>
          <div className="mx-auto   bg-white max-w-6xl ">
            <div className="px-4  sm:px-6">
              <div className="flow-root">
                {status === "loading" ? <div>Loading..</div> : null}
                <div className="mx-auto">
                  <div className="Cinzel text-lg">Order Items</div>
                  {items.map((item) => (
                    <div key={item._id} className="flex py-6">
                      <div className="h-[100px] w-[100px] flex-shrink-0 overflow-hidden  border border-gray-200">
                        <img
                          src={
                            item.productId.images && item.productId.images[0]
                          }
                          alt={item.productId.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3 className="Cinzel text-sm">
                              <a href={item.productId._id}>
                                {item.productId.title}
                              </a>
                            </h3>
                            <p className="ml-4 Cinzel">
                              ${item.productId.price}
                            </p>
                          </div>
                          <p className="Merriweather mt-1 text-sm text-gray-500">
                            {item.productId.brand}
                          </p>
                        </div>
                        <div className="Merriweather flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500 ">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty
                            </label>
                            <select
                              onChange={(e) => handleQuantity(e, item)}
                              value={item.quantity}
                              className="outline-none"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>

                          {/* Modal */}
                          <div className="flex">
                            <Modal
                              title={`Delete ${item.productId.title}`}
                              message="Are you sure you want to delete this Cart item ?"
                              dangerOption="Delete"
                              cancelOption="Cancel"
                              dangerAction={(e) => handleRemove(e, item._id)}
                              cancelAction={() => setOpenModal(null)}
                              showModal={openModal === item._id}
                            ></Modal>
                            <button
                              onClick={(e) => {
                                setOpenModal(item._id);
                              }}
                              type="button"
                              className="font-medium text-red-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="Merriweather border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p className="Cinzel">$ {totalAmount}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p className="Cinzel">{totalItems} items</p>
              </div>
              <div className="mt-6 flex justify-end">
                <div
                  className="px-[14px] py-[12px] w-[80%] border-[1px] cursor-pointer border-[#007bff]  mt-4 text-center Merriweather btn btn1"
                  onClick={() => {
                    handleOrder();
                  }}
                >
                  Order Now
                </div>
              </div>
              <div className="mt-6 flex  justify-end text-center text-sm text-gray-500">
                <p className="flex flex-col w-[80%]">
                  <span>or</span>
                  <Link to="/products/all">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500 pt-2"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Checkout;
