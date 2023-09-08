import axios from "axios";

export function fetchAllProducts(){
    return new Promise(async (resolve,reject) => {
        try {
            const response = await axios.get('/product/getproducts');
            const data = await response.data;
            resolve({data});
        } catch (error) {
            reject({error});
        }
    })
}

export function fetchProductById(id){
    return new Promise(async(resolve,reject)=>{
        try {
            const response = await axios.get(`/product/getproducts/${id}`);
            const data = await response.data;
            resolve({data});
        } catch (error) {
            reject({error});
        }
    })
}