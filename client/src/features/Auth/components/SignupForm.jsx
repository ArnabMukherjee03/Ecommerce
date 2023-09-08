import { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { selectSucess,createUserAsync } from "../authSlice";
import {NavLink, useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";
import logo from "../../../Images/Shophub.png"


const SignupForm = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //*  New account Created  Or Not
    const isSucess = useSelector(selectSucess);

    //* All UseStates 
    const [confirmpassword , setConfirmpassword] = useState('');
    const [signupData,setSignupData] = useState({
        name:'',
        username:'',
        email: '',
        password: '',
      });

    //* if  SucessFull then Navigate to  Login Page
      useEffect(()=>{
         if(isSucess){
            navigate('/login');
         }
      },[navigate,isSucess])


    //! All Functions Here
    const handleInputChange = (event)=>{
        const { name, value } = event.target; 
        setSignupData({ ...signupData, [name]: value });
    }

    const handleconfirmpass = (event)=>{
        setConfirmpassword(event.target.value);
    }

    const SubmitForm = (e)=>{
        if(signupData.password === confirmpassword){
           dispatch(createUserAsync(signupData));
        }else{
          toast.error("Password Not Matching");
        }
    }

    return(
       <div className="">
           <div className="">
                <div className="p-[80px] flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center">
                        <img src={logo} alt="" className="w-[120px]" />
                        <p className="Cinzel text-xs pt-2 tracking-[.1rem]">LOG IN TO YOUR ACCOUNT</p>
                    </div>
                    <div className="flex flex-col gap-6  mt-10 Merriweather">
                        <input type="text" placeholder="Name"  className="text-xs ps-1 h-8 outline-none w-[350px] border-b-[1px] border-b-black" onChange={handleInputChange} name="name"  />
                        <input type="text" placeholder="UserName"  className="text-xs ps-1 h-8 outline-none w-[350px] border-b-[1px] border-b-black" onChange={handleInputChange} name="username"  />
                        <input type="email" placeholder="E-Mail"  className="text-xs ps-1 h-8 outline-none w-[350px] border-b-[1px] border-b-black" onChange={handleInputChange} name="email"  />
                        <input type="password" placeholder="Password" className="text-xs ps-1 h-8 outline-none w-[350px] border-b-[1px] border-b-black" onChange={handleInputChange} name="password"  />
                        <input type="password" placeholder="Confirm Password" className="ps-1 text-xs h-8 outline-none w-[350px] border-b-[1px] border-b-black" onChange={handleconfirmpass} name="confirmpassword"  />
                        <div className="px-[14px] py-[12px] w-[100%] border-[1px] cursor-pointer border-[#000]  text-white  mt-4 text-center bg-black Merriweather " onClick={SubmitForm}>Create Account</div>
                    </div>
                    <div className="text-center">
                    <p className="Cinzel text-xs mt-4 tracking-[.1rem]">Already Have An Account? <NavLink to="/login" className="underline">Login Here</NavLink></p>
                    </div>
                </div>
           </div>
       </div>
    )
}

export default SignupForm;