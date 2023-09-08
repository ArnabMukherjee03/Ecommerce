import axios from "axios";

export function createOrder(order) {
    return new Promise(async (resolve,reject) => {
        try {
            const response = await axios.post("/order/neworder",order)
            const data = await response.data;
            console.log(data)
            resolve({ data });
        } catch (error) {
            reject({error});
        }
    });
  }
  
  export function cancelOrder() {
    return new Promise(async (resolve,reject) => {
      try {
        const response = axios.patch("")
        const data = await response.data;
        resolve({ data });
      } catch (error) {
        reject({error});
      }
    });
  }
  
  export function fetchOrderbyUser() {
    return new Promise(async (resolve,reject) => {
        try {
            const response = axios.get("")
            const data = await response.data;
            resolve({ data });
        } catch (error) {
            reject({error})
        }
    });
  }
  
  
 