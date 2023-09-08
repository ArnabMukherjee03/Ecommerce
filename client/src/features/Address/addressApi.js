import axios from "axios";
  
  export function fetchAddress() {
    return new Promise(async (resolve,reject) =>{
      try {
        const response = await axios.get('/address/getAddress'); 
        const data = await response.data
        resolve({data})
      } catch (error) {
        reject({error});
      }
    }
    );
  }
  
  export function addAddress(address) {
    return new Promise(async (resolve,reject) => {
      try {
        const response = await axios.post(`/address/addAddress`,address);
        const data = await response.data;
        resolve({ data });
      } catch (error) {
        reject({error});
      }
    });
  }

  export function updateAddressById(address) {
    return new Promise(async (resolve,reject) => {
      try {
        const response = await axios.patch(`/address/${address.id}`,address);
        const data = await response.data;
        resolve({ data });
      } catch (error) {
        reject({error});
      }
    });
  }

  export function deleteAddressById(id) {
    return new Promise(async (resolve,reject) => {
      try {
       
        const response = await axios.delete(`/address/${id}`);
        const data = await response.data;
        resolve({ data });
      } catch (error) {
        reject({error});
      }
    });
  }


  
  