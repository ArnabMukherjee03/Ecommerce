import axios from "axios";

export function createUser(userData) {
    return new Promise(async (resolve,reject) => {
      try {
        const response = await axios.post('/auth/signup',userData);
        const data = await response.data;
        resolve({ data });
      } catch (error) {
        reject(error)
      }
    });
  }
  
  export function loginUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post('/auth/login',loginInfo)
          const data = await response.data;
          resolve({ data });
      } catch (error) {
        reject( error );
      }
  
    });
  }
  
  export function checkAuth() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get('/auth/isAuth');
          const data = await response.data;
          resolve({ data });
      } catch (error) {
        reject( error );
      }
  
    });
  }
  
  
  export function signOut() {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.get(`/auth/logout`);
        resolve({ data:'success' });
      } catch (error) {
        console.log(error)
        reject( error );
      }
    });
  }
  
  
  