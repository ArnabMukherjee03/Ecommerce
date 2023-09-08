import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserInfo,
  updateUserAsync,
  fetchLoggedInUserAsync,
} from "../userSlice";

export default function User() {
  const [edit, setEdit] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    email: "",
    phoneno: "",
  });

  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    dispatch(fetchLoggedInUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        gender: user.gender,
        email: user.email,
        phoneno: user.phoneno,
      });
    }
  }, [user]);

  const updateUser = (update) => {
    dispatch(updateUserAsync(update));
    setEdit(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="w-[78%] bg-[#fff] py-6 px-10 mt-4 mb-[40px] shadow">
      <div className="flex gap-4">
        <p className="Cinzel">Personal Information</p>
        {!edit ? (
          <button
            className="Merriweather text-sm ps-4 text-red-500"
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              className="Merriweather text-sm ps-4 text-green-700"
              onClick={() => {
                updateUser(userData);
              }}
            >
              Save
            </button>
            <button
              className="Merriweather text-sm  text-red-500"
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {/* Name: Start */}
      <div className="mt-4 Merriweather">
        {edit ? (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userData.name}
            className="ps-1 h-8 text-xs outline-none w-[300px] border-b-[1px] border-b-black"
            onChange={handleInputChange}
          />
        ) : (
          <p className="ps-1 h-8 flex items-center text-xs outline-none w-[300px] border-b-[1px] border-b-gray-300 text-gray-500 cursor-not-allowed">
            {user && user.name}
          </p>
        )}
      </div>
      {/* Name: End */}
      {/* Gender: Start */}
      <div className="mt-4 Merriweather">
        <p className="Cinzel text-sm">Your Gender</p>
        {edit ? (
          <div className="mt-2 flex ">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Male"
                name="gender"
                checked={userData.gender === "Male"}
                onChange={handleInputChange}
              />
              <span className="text-xs">Male</span>
            </label>
            <label className="ps-4 flex gap-2 items-center">
              <input
                type="radio"
                value="Female"
                name="gender"
                checked={userData.gender === "Female"}
                onChange={handleInputChange}
              />
              <span className="text-xs">Female</span>
            </label>
          </div>
        ) : (
          <div className="mt-2 flex ">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Male"
                name="gender"
                disabled
                checked={userData.gender === "Male"}
                onChange={handleInputChange}
              />
              <span className="text-xs">Male</span>
            </label>
            <label className="ps-4 flex gap-2 items-center">
              <input
                type="radio"
                value="Female"
                name="gender"
                disabled
                checked={userData.gender === "Female"}
                onChange={handleInputChange}
              />
              <span className="text-xs">Female</span>
            </label>
          </div>
        )}
      </div>
      {/* Gender: End */}
      {/* Email: Start  */}
      <div className="mt-5 Merriweather">
        <p className="Cinzel text-sm">Email Address</p>
        {edit ? (
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userData.email}
            className="ps-1  h-8 text-xs outline-none w-[300px] border-b-[1px] border-b-black"
            onChange={handleInputChange}
          />
        ) : (
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            disabled
            value={userData.email}
            className="ps-1  h-8 text-xs outline-none w-[300px] border-b-[1px] border-b-gray-300 cursor-not-allowed"
            onChange={handleInputChange}
          />
        )}
      </div>
      {/* Email: End */}
      {/* Mobile No: Start */}
      <div className="mt-5 Merriweather">
        <p className="Cinzel text-sm">Mobile No</p>
        {edit ? (
          <input
            type="text"
            name="phoneno"
            placeholder="Mobile No"
            value={userData.phoneno}
            className="ps-1 Cinzel  h-8 text-xs outline-none w-[300px] border-b-[1px] border-b-black"
            onChange={handleInputChange}
          />
        ) : (
          <input
            type="text"
            name="phoneno"
            placeholder="Mobile No"
            disabled
            value={userData.phoneno}
            className="ps-1 Cinzel  h-8 text-xs outline-none w-[300px] border-b-[1px] border-b-gray-300 cursor-not-allowed"
            onChange={handleInputChange}
          />
        )}
      </div>
      {/* Mobile No: End */}
      {/* Deactivate Account */}
      <div className="w-full flex justify-end mt-4">
        <button className="Merriweather text-red-500 text-xs">
          Deactivate Account
        </button>
      </div>
    </div>
  );
}
