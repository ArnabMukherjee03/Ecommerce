import { useState,useEffect } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { loginUserAsync,selectSucess,resetSuccess } from "../authSlice";
import { useDispatch,useSelector } from "react-redux";
import logo from "../../../Images/Shophub.png";


const LoginForm = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSucess = useSelector(selectSucess) ;

    const [loginData,setLoginData] = useState({
        email:'',
        password:''
    })

    useEffect(()=>{
        dispatch(resetSuccess())
    },[dispatch])

    useEffect(()=>{
        if(isSucess){
           navigate('/');
        }
     },[navigate,isSucess])

    

    const handleInputChange = (event)=>{
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
    }

    const submitForm = (e)=>{
        dispatch(loginUserAsync(loginData));
    }


    return(
       <div className="">    
           <div className="h-screen">
                <div className="p-[100px] flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center">
                        <img src={logo} alt="" className="w-[120px]" />
                        <p className="Cinzel text-xs pt-2 tracking-[.4rem]">LOG IN TO YOUR ACCOUNT</p>
                    </div>
                    <div className="flex flex-col gap-6  mt-10 Merriweather">
                        <input type="email" placeholder="E-Mail"  className="ps-1 h-8 text-xs outline-none w-[350px] border-b-[1px] border-b-black" name="email"  onChange={handleInputChange} />
                        <input type="password" placeholder="Password" className="ps-1 h-8 text-xs outline-none w-[350px] border-b-[1px] border-b-black" name="password" onChange={handleInputChange} id="" />
                        <div className="px-[14px] py-[12px] w-[100%] border-[1px] cursor-pointer border-[#000]  text-white  mt-4 text-center bg-black Merriweather " onClick={e => {e.preventDefault(); submitForm()}}>Log In</div>
                    </div>
                    <div className="text-center">
                    <p className="Cinzel text-xs mt-4 tracking-[.1rem]">Need An Account? <NavLink to="/signup" className="underline">Register Here</NavLink></p>
                    </div>
                </div>
           </div>
       </div>
    )
}

export default LoginForm;