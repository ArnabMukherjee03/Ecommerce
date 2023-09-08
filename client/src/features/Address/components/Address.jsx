import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAddress,
  fetchAddressAsync,
  addAddressAsync,
  updateAddressByIdAsync,
  selectLoading,
  deleteAddressByIdAsync,
} from "../addressSlice";
import Modal from "../../../components/Modal";

const Address = () => {
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

  const [addressUpdate, setAddressUpdate] = useState({
    id: "",
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

  const [edit, setEdit] = useState(false);
  const [fromEdit, setFromedit] = useState(false);
  const [openModal, setOpenModal] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setAddressUpdate({ ...addressUpdate, [name]: value });
  };

  const dispatch = useDispatch();
  const address = useSelector(selectAddress);
  const status = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchAddressAsync());
  }, [dispatch]);

  const addAddress = (address) => {
    dispatch(addAddressAsync(address));
    setEdit(false);
  };

  const updateEdit = (id) => {
    const updateAddress = address.find((address) => address._id === id);

    if (updateAddress) {
      setAddressUpdate({
        id: updateAddress._id,
        name: updateAddress.name,
        phoneNo: updateAddress.phoneNo,
        pincode: updateAddress.pincode,
        locality: updateAddress.locality,
        address: updateAddress.address,
        city: updateAddress.city,
        state: updateAddress.state,
        landmark: updateAddress.landmark,
        alternateNo: updateAddress.alternateNo,
      });
      console.log(updateAddress, addressUpdate);
      setFromedit(true);
    }
  };

  const updateAddress = (update) => {
    dispatch(updateAddressByIdAsync(update));
    setFromedit(false);
  };

  const handleRemove = (e, id) => {
    dispatch(deleteAddressByIdAsync(id));
  };

  return (
    <div className="w-[78%] h-auto bg-[#fff] py-6 px-10 mt-4 mb-[40px] shadow">
      <p className="Cinzel">Manage Addresses</p>
      {address && address.length === 0 && !edit ? (
        <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
          <p className="Cinzel">No Addresses found in your account!</p>
          <p className="Merriweather text-sm">Add a delivery address.</p>
          <button
            className="px-[14px] py-[12px] w-[20%] border-[1px] cursor-pointer border-[#007bff]  mt-4 text-center text-xs Merriweather btn btn1"
            onClick={() => setEdit(true)}
          >
            Add Addresses
          </button>
        </div>
      ) : edit ? (
        <div className="">
          <p className="Cinzel">Add New Address</p>
          <div className="mt-4 Merriweather flex gap-5">
            <input
              type="text"
              onChange={handleInputChange}
              id="name"
              name="name"
              placeholder="Name"
              className="ps-1 h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
            />
            <input
              type="text"
              onChange={handleInputChange}
              id="phoneNo"
              name="phoneNo"
              placeholder="Phone No"
              className="ps-1 Cinzel h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
            />
          </div>
          <div className="mt-4 Merriweather flex gap-5">
            <input
              type="text"
              onChange={handleInputChange}
              id="pincode"
              name="pincode"
              placeholder="pincode"
              className="Cinzel ps-1 h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
            />
            <input
              type="text"
              onChange={handleInputChange}
              id="locality"
              name="locality"
              placeholder="locality"
              className="ps-1 h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
            />
          </div>
          <div className="mt-4 Merriweather flex gap-5">
            <textarea
              onChange={handleInputChange}
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              className="ps-4 h-20 text-xs outline-none w-[80%]  border-[1px] py-4  border-black "
            />
          </div>
          <div className="mt-4 Merriweather flex gap-5">
            <input
              type="text"
              onChange={handleInputChange}
              id="city"
              name="city"
              placeholder="City/District/Town"
              className="ps-1 h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
            />
            <input
              type="text"
              onChange={handleInputChange}
              id="state"
              name="state"
              placeholder="State"
              className="ps-1 h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
            />
          </div>
          <div className="mt-4 Merriweather flex gap-5">
            <input
              type="text"
              onChange={handleInputChange}
              id="landMark"
              name="landMark"
              placeholder="landmark (optional)"
              className="ps-1 h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
            />
            <input
              type="text"
              onChange={handleInputChange}
              id="alternateNo"
              name="alternateNo"
              placeholder="Alternate Phone (optional)"
              className="ps-1 h-8 Cinzel text-xs outline-none w-[38%] border-b-[1px] border-b-black"
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
              onClick={() => setEdit(false)}
            >
              Cancel
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <button
            className="Cinzel text-xs flex items-center"
            onClick={() => setEdit(true)}
          >
            <span className="text-2xl pr-4">+</span> Add New Address
          </button>
          <div className="flex flex-col gap-4 mt-4">
            {status === "loading" ? (
              <div>Loading..</div>
            ) : (
              address &&
              address.map((address) => {
                return fromEdit && address._id === addressUpdate.id ? (
                  <div className="">
                    <p className="Cinzel">Edit Address</p>
                    <div className="mt-4 Merriweather flex gap-5">
                      <input
                        type="text"
                        onChange={handleUpdateChange}
                        value={addressUpdate.name}
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="ps-1 h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
                      />
                      <input
                        type="text"
                        onChange={handleUpdateChange}
                        value={addressUpdate.phoneNo}
                        id="phoneNo"
                        name="phoneNo"
                        placeholder="Phone No"
                        className="ps-1 Cinzel h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
                      />
                    </div>
                    <div className="mt-4 Merriweather flex gap-5">
                      <input
                        type="text"
                        onChange={handleUpdateChange}
                        value={addressUpdate.pincode}
                        id="pincode"
                        name="pincode"
                        placeholder="pincode"
                        className="Cinzel ps-1 h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
                      />
                      <input
                        type="text"
                        onChange={handleUpdateChange}
                        value={addressUpdate.locality}
                        id="locality"
                        name="locality"
                        placeholder="locality"
                        className="ps-1 h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
                      />
                    </div>
                    <div className="mt-4 Merriweather flex gap-5">
                      <textarea
                        onChange={handleUpdateChange}
                        value={addressUpdate.address}
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Address"
                        className="ps-4 h-20 text-xs outline-none w-[80%]  border-[1px] py-4  border-black "
                      />
                    </div>
                    <div className="mt-4 Merriweather flex gap-5">
                      <input
                        type="text"
                        onChange={handleUpdateChange}
                        value={addressUpdate.city}
                        id="city"
                        name="city"
                        placeholder="City/District/Town"
                        className="ps-1 h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
                      />
                      <input
                        type="text"
                        onChange={handleUpdateChange}
                        value={addressUpdate.state}
                        id="state"
                        name="state"
                        placeholder="State"
                        className="ps-1 h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
                      />
                    </div>
                    <div className="mt-4 Merriweather flex gap-5">
                      <input
                        type="text"
                        onChange={handleUpdateChange}
                        value={addressUpdate.landmark}
                        id="landMark"
                        name="landMark"
                        placeholder="landmark (optional)"
                        className="ps-1 h-8 text-xs outline-none w-[38%] border-b-[1px] border-b-black"
                      />
                      <input
                        type="text"
                        onChange={handleUpdateChange}
                        value={addressUpdate.alternateNo}
                        id="alternateNo"
                        name="alternateNo"
                        placeholder="Alternate Phone (optional)"
                        className="ps-1 h-8 Cinzel text-xs outline-none w-[38%] border-b-[1px] border-b-black"
                      />
                    </div>
                    <div className="w-full flex gap-2 justify-end mt-4 Merriweather text-sm ">
                      <div
                        className="cursor-pointer text-green-800"
                        onClick={() => {
                          updateAddress(addressUpdate);
                        }}
                      >
                        Update
                      </div>
                      <div
                        className="cursor-pointer text-red-500"
                        onClick={() => setFromedit(false)}
                      >
                        Cancel
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="Merriweather relative  text-xs p-5 border-[1px] border-gray-300">
                    <div className=" flex gap-4 absolute right-4">
                      <Modal
                        title={`Delete ${address.name}`}
                        message="Are you sure you want to delete this Address ?"
                        dangerOption="Delete"
                        cancelOption="Cancel"
                        dangerAction={(e) => handleRemove(e, address._id)}
                        cancelAction={() => setOpenModal(null)}
                        showModal={openModal === address._id}
                      ></Modal>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          updateEdit(address._id);
                        }}
                      >
                        Edit
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setOpenModal(address._id);
                        }}
                      >
                        Delete
                      </div>
                    </div>
                    <div className="flex gap-8 ">
                      <p>{address.name}</p>
                      <p className="Cinzel">{address.phoneNo}</p>
                    </div>
                    <div className="mt-4">
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
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
