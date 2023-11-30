import { BiSolidUser } from "react-icons/bi";
import { BsFillCartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/Auth/authSlice";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../Images/Shophub.png";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector(selectLoggedInUser);

  return (
    <div className="h-[80px] border-b-[1px] border-[rgba(0,0,0,0.1)]">
      <nav className="flex mx-4 lg:mx-14  justify-between items-center h-full">
        {/* ShopHub Logo */}
        <div className="Cinzel">
          <NavLink to="/">
          <img src={logo} alt="ShopHub" className="w-[110px]" />
          </NavLink>
        </div>
        {/* Nav Items */}
        <div className="flex gap-[80px]">
          <div
            className={`fixed h-full lg:h-auto lg:static bg-white z-[30] flex top-[80px] w-full lg:w-auto flex-col lg:flex-row gap-5 pt-7 lg:pt-0 pb-6 lg:pb-0 Cinzel lg:gap-[30px] transition-all duration-500 ease-in ${
              open
                ? "left-0 opacity-100"
                : "left-[-490px] opacity-0 md:opacity-100"
            }`}
          >
            <li className="nav-items">
              <NavLink to="/products/all"> All </NavLink>
            </li>
            <li className="nav-items">
              <NavLink to="/products/men"> Men </NavLink>
            </li>
            <li className="nav-items">
              <NavLink to="/products/women"> Women </NavLink>
            </li>
            <li className="nav-items">
              <NavLink to="/products/kids"> Kids </NavLink>
            </li>
          </div>
          <div className="">
            <div className="flex gap-6 items-center">
              <li className="lg:text-[18px]">
                {user ? (
                  <div className="Cinzel text-[14px] flex flex-col items-center">
                    <BiSolidUser />
                    <NavLink to="/account" className="text-[12px]">
                      {" "}
                      Profile{" "}
                    </NavLink>
                  </div>
                ) : (
                  <div className="Cinzel text-[14px] flex flex-col items-center">
                    <BiSolidUser />
                    <NavLink to="/login" className="text-[12px]">
                      {" "}
                      Login{" "}
                    </NavLink>
                  </div>
                )}
              </li>
              <li className="Cinzel text-[14px] flex flex-col items-center">
                <BsFillCartFill />
                <NavLink to="/mycart" className="text-[12px]">
                  {" "}
                  Cart{" "}
                </NavLink>
              </li>
            </div>
            <div
              className="text-2xl duration-500 block lg:hidden "
              onClick={() => setOpen(!open)}
            >
              {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
