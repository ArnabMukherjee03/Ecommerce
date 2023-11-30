import React, { useEffect } from "react";
import { selectorders, fetchOrderByUserAsync } from "../orderSlice";
import { useDispatch, useSelector } from "react-redux";

const Order = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderByUserAsync());
  }, [dispatch]);

  const order = useSelector(selectorders);

  return (
    <div className="mx-14 py-10 flex flex-col gap-10">
      {order &&
        order.map((order) => {
          return (
            <div key={order._id} className="py-3 px-10   bg-white">
              {order.items &&
                order.items.map((item) => {
                  return (
                    <div key={item._id} className="flex py-1">
                      <div className="h-[120px] w-[120px] flex-shrink-0 overflow-hidden  border border-gray-200">
                        <img
                          src={item.productId.images && item.productId.images[0].images[0]}
                          alt={item.productId.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3 className="Cinzel text-sm">
                                {item.productId.title} <span className="ps-4">X</span> <span className="text-xl ps-4">{item.quantity}</span>
                            </h3>
                            <p className="ml-4 Cinzel">
                              ${item.productId.price * item.quantity}
                            </p>
                          </div>
                          <p className="Merriweather mt-1 text-sm text-gray-500">
                            {item.productId.brand && item.productId.brand.label}
                          </p>
                        </div>
                        <div className="Merriweather flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500 "></div>
                        </div>
                      </div>

                      <div className=""></div>
                    </div>
                  );
                })}
                <div className="w-full Merriweather flex justify-end gap-6">
                    {/* Total Items */}
                    <div className="text-xs">
                        <p className="text-red-500">Payment Status: {order.paymentStatus}</p>
                        <p>Payment Method: {order.paymentMethod}</p>
                        <p>Order Status: {order.status}</p>
                    </div>
                    {/* Total Quantity */}
                    <div className="text-xl flex items-center">
                        <p>Total Amount: <span className="Cinzel">${order.totalAmount}</span></p>
                    </div>
                </div>
            </div>
          );
        })}
    </div>
  );
};

export default Order;
