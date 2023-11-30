import ProductHead from "../features/Product/components/ProductHead";
import ProductList from "../features/Product/components/ProductList";
import { useParams } from "react-router-dom";

const Product = ()=>{
    const {type} =  useParams();
    return(
        <div className="relative">
          <ProductHead type={type}></ProductHead>
          <ProductList type={type}/>
        </div>
    )
}

export default Product;