import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartStatus,
  selectItems,
  selectError,
  updateCartAsync,
  fetchItemsByUserIdAsync,
  selectUpdateStatus,
} from "../cartSlice";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal";
import { MutatingDots } from "react-loader-spinner";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const updateStatus = useSelector(selectUpdateStatus);
  const error = useSelector(selectError);
  const [openModal, setOpenModal] = useState(null);
  const [updateid, setUpdateid] = useState(null);

  const totalAmount = items.reduce(
    (amount, item) => item.productId.price * item.quantity + amount,
    0
  );

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync());
  }, [dispatch]);

  //& Showing Image on the basis Choosed Color

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleSize = (e, item) => {
    setUpdateid(item._id);
    const update = {
      id: item._id,
      size: e.target.value,
    };
    console.log(update);
    dispatch(updateCartAsync(update));
  };

  const handleColor = (e, item) => {
    setUpdateid(item._id);
    const update = {
      id: item._id,
      color: e.target.value,
    };
    console.log(update);
    dispatch(updateCartAsync(update));
  };

  const handleQuantity = (e, item) => {
    setUpdateid(item._id);
    const update = {
      id: item._id,
      quantity: +e.target.value,
    };
    console.log(update);
    dispatch(updateCartAsync(update));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      <div>
        <div className="mx-auto   bg-white max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="py-[40px] lg:py-[80px] flex flex-col items-center">
            <h1 className="Cinzel text-3xl ">Cart</h1>
            <p className="Merriweather text-sm mt-2 capitalize">
              home &gt; Cart
            </p>
          </div>

          <div className="px-4 py-6 sm:px-6">
            <div className="flow-root">
              {status === "loading" ? (
                <div className="h-auto w-full flex items-center justify-center">
                  <MutatingDots
                    height="100"
                    width="100"
                    color="#007bff"
                    secondaryColor="#007bff"
                    radius="10"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : error ? (
                <div className="w-full h-full flex justify-center items-center">
                  <p className="text-center Cinzel text-xl text-red-600">
                    {error}
                  </p>
                </div>
              ) : (
                <div className="-my-6 pt-8 divide-y divide-gray-200 max-w-4xl mx-auto">
                  {!items.length ? (
                    <div className="text-center Cinzel text-xl text-red-600">
                      Cart is Empty
                    </div>
                  ) : (
                    items &&
                    items.map((item) => {
                      const img =
                        item.productId.images &&
                        item.productId.images.find(
                          (image) =>
                            image.color.toUpperCase() ===
                            item.color.toUpperCase()
                        );
                      return (
                        <>
                          {updateid === item._id &&
                          updateStatus === "loading" ? (
                            <div className="h-auto w-full flex items-center justify-center">
                              <MutatingDots
                                height="100"
                                width="100"
                                color="#007bff"
                                secondaryColor="#007bff"
                                radius="10"
                                ariaLabel="mutating-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                              />
                            </div>
                          ) : (
                            <div key={item._id} className="flex py-6">
                              <div className="h-[120px] w-[120px] flex-shrink-0 overflow-hidden  border border-gray-200">
                                <img
                                  src={img && img.images[0]}
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
                                    {item.productId.brand &&
                                      item.productId.brand.label}
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
                                    >
                                      <option className="Cinzel" value="1">1</option>
                                      <option className="Cinzel" value="2">2</option>
                                      <option className="Cinzel" value="3">3</option>
                                      <option className="Cinzel" value="4">4</option>
                                      <option className="Cinzel" value="5">5</option>
                                    </select>
                                  </div>
                                  {/* Color */}
                                  <div className="text-gray-500 ">
                                    <label
                                      htmlFor="color"
                                      className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Color
                                    </label>
                                    <select
                                      onChange={(e) => handleColor(e, item)}
                                      value={item.color}
                                    >
                                      {item.productId.colors &&
                                        item.productId.colors.map((color) => {
                                          return (
                                            <option value={color.name}>
                                              {color.name}
                                            </option>
                                          );
                                        })}
                                    </select>
                                  </div>
                                  {/* Size */}
                                  <div className="text-gray-500 ">
                                    <label
                                      htmlFor="Sizes"
                                      className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                    >
                                      size
                                    </label>
                                    <select
                                      onChange={(e) => handleSize(e, item)}
                                      value={item.size}
                                    >
                                      {item.productId.sizes &&
                                        item.productId.sizes.map((size) => {
                                          return (
                                            <option value={size}>{size}</option>
                                          );
                                        })}
                                    </select>
                                  </div>

                                  {/* Modal */}
                                  <div className="flex">
                                    <Modal
                                      title={`Delete ${item.productId.title}`}
                                      message="Are you sure you want to delete this Cart item ?"
                                      dangerOption="Delete"
                                      cancelOption="Cancel"
                                      dangerAction={(e) =>
                                        handleRemove(e, item._id)
                                      }
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
                          )}
                        </>
                      );
                    })
                  )}
                </div>
              )}
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
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6 flex justify-end">
              <Link
                to="/checkout"
                className="px-[14px] py-[12px] w-[30%] border-[1px] cursor-pointer border-[#007bff]  mt-4 text-center Merriweather btn btn1"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex  justify-end text-center text-sm text-gray-500">
              <p className="flex flex-col w-[30%]">
                <span>or</span>
                <Link to="/">
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
    </>
  );
}
