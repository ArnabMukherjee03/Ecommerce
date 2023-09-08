import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { selectUserInfo, fetchLoggedInUserAsync } from "../userSlice";
import { signOutAsync } from "../../Auth/authSlice";

import { useSelector, useDispatch } from "react-redux";

const UserSideBar = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoggedInUserAsync());
  }, [dispatch]);

  const user = useSelector(selectUserInfo);

  const handleLogout = () => {
    dispatch(signOutAsync());
    navigate("/");
  };

  return (
    <div className="w-[22%] py-6 mt-4  flex flex-col mb-[40px] bg-[#fff] shadow ">
      {/* User Image: Start */}
      <div className="flex items-center px-4">
        <img
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
          alt=""
        />
        <div className="flex flex-col ps-4 ">
          <p className="Cinzel">Hello,</p>
          <p className="Cinzel">{user && user.name}</p>
        </div>
      </div>
      {/* User Image: End */}
      {/* My Orders: Start */}
      <div className="flex gap-4 items-center Cinzel mt-8 hover:text-[#007bff] cursor-pointer border-b-[1px] border-gray-200 px-4 pb-4">
        <img
          className="ps-3 w-8"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDI0IDE4Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04LjY5NCAtMTEpIj48ZWxsaXBzZSBjeD0iMjAuNTU3IiBjeT0iMjAiIHJ4PSIyMC41NTciIHJ5PSIyMCIvPjxwYXRoIGZpbGw9IiMyODc0RjEiIGQ9Ik05IDExdjE3LjEwOGMwIC40OTMuNDEuODkyLjkxOC44OTJoNC45M3YtNS4yNTdoLTMuMDMzbDQuOTEyLTQuNzcgNC45NzIgNC44M2gtMy4wMzVWMjloMTIuNDE3Yy41MDcgMCAuOTE4LS40LjkxOC0uODkyVjExSDl6Ii8+PC9nPjwvc3ZnPg=="
          alt=""
          srcset=""
        />
        <p>My Orders</p>
      </div>
      {/* My Orders: End */}
      {/* Account Settings: Start */}
      <div className="flex gap-4 items-center Cinzel mt-4 px-4 pb-4">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMSIgdmlld0JveD0iMCAwIDIyIDIxIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05LjY5NCAtMTApIj48cGF0aCBmaWxsPSIjMjg3NEYwIiBkPSJNMTQuMjc1IDIyLjcwNGMyLjI3Mi0uNDEyIDQuMzQ3LS42MTggNi4yMjUtLjYxOCAxLjg3OCAwIDMuOTUzLjIwNiA2LjIyNS42MThhNS4xNSA1LjE1IDAgMCAxIDQuMjMgNS4wNjhWMzFoLTIwLjkxdi0zLjIyOGE1LjE1IDUuMTUgMCAwIDEgNC4yMy01LjA2OHptMS4yNzQtNy43MjRjMC0yLjU4IDIuMTYzLTQuNjczIDQuODMyLTQuNjczIDIuNjY3IDAgNC44MyAyLjA5MiA0LjgzIDQuNjczIDAgMi41OC0yLjE2MyA0LjY3My00LjgzIDQuNjczLTIuNjcgMC00LjgzMy0yLjA5Mi00LjgzMy00LjY3M3oiLz48ZWxsaXBzZSBjeD0iMjAuNTU3IiBjeT0iMjAiIHJ4PSIyMC41NTciIHJ5PSIyMCIvPjwvZz48L3N2Zz4="
          alt=""
          className="w-5"
          srcset=""
        />
        <p>Account Settings</p>
      </div>
      <div className="flex text-sm px-4 flex-col gap-3 mt-3 items-center Merriweather">
        <NavLink to="/account">
          <p className="cursor-pointer">Profile Information</p>
        </NavLink>
        <NavLink to="/account/addresses">
          <p className="cursor-pointer">Manage Addresss</p>
        </NavLink>
      </div>
      <div className="px-4 flex mt-8 items-center Cinzel text-red-500 gap-4 border-t-[1px] py-4 border-gray-200 cursor-pointer ">
        <svg
          width="24"
          height="24"
          class=""
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#2874F0"
            stroke-width="0.3"
            stroke="#2874F0"
            d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"
          ></path>
        </svg>
        <div onClick={handleLogout}>Log Out</div>
      </div>
    </div>
  );
};

export default UserSideBar;
