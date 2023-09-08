import axios from "axios";
  
  export function fetchLoggedInUser() {
    return new Promise(async (resolve,reject) =>{
      try {
        const response = await axios.get('/user/getuser'); 
        const data = await response.data
        resolve({data})
      } catch (error) {
        reject({error});
      }
    }
    );
  }
  
  export function updateUser(update) {
    return new Promise(async (resolve,reject) => {
      try {
        const response = await axios.patch(`/user/update`,update);
        const data = await response.data;
        resolve({ data });
      } catch (error) {
        reject({error});
      }
    });
  }
  
  