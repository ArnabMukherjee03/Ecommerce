const Footer = ()=>{
    return(
       <footer className=" bg-[#faf5f0]">
          <div className="mx-2 lg:mx-14">
             <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row py-[50px] lg:py-[100px]">
                 <div className="w-[100%] lg:w-[30%] lg:pl-6">
                 <div className="Cinzel text-center lg:text-left">
                      <h1 className="text-[25px]">SHOPHUB</h1>
                      <p className="text-[14px]  text-gray-400">
                       Clothing store
                      </p>
                 </div>
                 </div>
                 <div className="w-[100%] gap-4 lg:gap-0 lg:w-[70%] flex flex-col lg:flex-row text-center lg:justify-evenly">
                    <div className="">
                        <h1 className="Cinzel mb-6 text-2xl" >ABOUT US</h1>
                        <div className="flex flex-col gap-2 text-[14px] Merriweather">
                            <li className="">Home</li>
                            <li className="">About</li>
                            <li className="">Contact</li>
                            <li className="">FAQ</li>
                        </div>
                    </div>
                    <div className="">
                        <h1 className="Cinzel mb-6 text-2xl" >Shop</h1>
                        <div className="flex flex-col gap-2 text-[14px] Merriweather">
                            <li className="">Men</li>
                            <li className="">Female</li>
                            <li className="">Children</li>
                            <li className="">All</li>
                        </div>
                    </div>
                    <div className="">
                        <h1 className="Cinzel mb-6 text-2xl" >Address</h1>
                        <div className="flex flex-col gap-2 text-[14px] Merriweather">
                            <li>Bidhannagar, Durgapur</li>
                            <li>shophub@gmail.com</li>
                            <li>+91 1234567891</li>
                        </div>
                    </div>
                 </div>
             </div>
          </div>
       </footer>
    )
}

export default Footer;