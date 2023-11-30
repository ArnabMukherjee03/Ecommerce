import axios from "axios";

export function fetchAllProducts(filter, sort){
    return new Promise(async (resolve,reject) => {
        let queryString = '';
        for (let key in filter) {
          const categoryValues = filter[key];
          if (categoryValues.length) {
            queryString += `${key}=${categoryValues}&`;
          }
        }
        for (let key in sort) {
          queryString += `${key}=${sort[key]}&`;
        }

        console.log(queryString);

        try {
            const response = await axios.get('/product/getproducts?'+ queryString);
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

export function fetchCategories(){
    return new Promise(async(resolve,reject)=>{
        try {
            const response = await axios.get(`/category`);
            const data = await response.data;
            resolve({data});
        } catch (error) {
            reject({error});
        }
    })
}

export function fetchBrand(){
    return new Promise(async(resolve,reject)=>{
        try {
            const response = await axios.get(`/brand`);
            const data = await response.data;
            resolve({data});
        } catch (error) {
            reject({error});
        }
    })
}