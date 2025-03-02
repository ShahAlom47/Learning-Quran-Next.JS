import axios, { Axios } from "axios";

const fetch = async (endpoint, method = "GET", body) => {
  try {
    const response = await axios({
      url: `/api${endpoint}`, // API Endpoint
      method: method, // Dynamically set the HTTP method
      data: body, // If method is POST or PUT, send the body
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials:true,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      throw new Error(error.response.data || "An error occurred");
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error("No response from server");
    } else {
      // Something happened in setting up the request
      throw new Error(error.message || "An error occurred");
    }
  }
};

// Example usage
export const getData = () => fetch("/data", "GET"); // GET request
export const postData = (data) => fetch("/data", "POST", data); // POST request with body
// export const getCartData = (data) => fetch("/cartData", "GET"); // get cart all data 

export const getCartData = async (data) => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return res.data
}
export const getProduct = async () => {
  const res = await axios.get('https://dummyjson.com/products')
  return res.data
}
export const delateProduct = async (id) => {
  const res = await axios.delete('https://dummyjson.com/products/1')
  return res.data
}
export const updateProduct = async(id, data) => {
  const res = await axios.delete('https://dummyjson.com/products/1')
  return res.data
}
