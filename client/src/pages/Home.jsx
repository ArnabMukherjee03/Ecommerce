import Banner from "../components/Banner";
import Cosection from "../components/Cosection";
import Deal from "../components/Deal";
import Product from "../components/Product";



const Home = ()=>{
    window.scroll(0,0)
    return(
        <>
        <Banner/>
        <Cosection/>
        <Product/>
        <Deal/>
        </>
    )
}

export default Home;