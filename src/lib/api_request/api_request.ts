import axios from "axios";



const fetch = async <T>(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE" = "GET", body?: any): Promise<T> => {
  try {
    const response = await axios({
      url: `/api${endpoint}`,  // API Endpoint
      method: method,  // Dynamically set the HTTP method
      data: body,  // If method is POST or PUT, send the body
      headers: {
        "Content-Type": "application/json",
      },
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
const getData = () => fetch<YourDataType>("/data", "GET");  // GET request
const postData = (data: YourDataType) => fetch<YourDataType>("/data", "POST", data);  // POST request with body
