import axios from "axios";




// Custom Fetch Function with Error Handling
const fetch = async (endpoint, method, body = null) => {
  try {
    const response = await axios({
      url: endpoint,
      method,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials for auth
    });

    return { success: true, data: response.data };
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.request) {
      errorMessage = "No response from server";
    } else {
      errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
};

// ================== API Call Functions ==================

export const getAllUsers = () =>
  fetch("/api/moderator/users/get_all_user", "GET");

export const updateUserRole = async (userId, newRole) =>
  fetch("/api/moderator/users/updateUserRole", "PATCH", { userId, newRole });

// =======================

export const deleteProduct = (id) => fetch(`/products/${id}`, "DELETE");
export const updateProduct = (id, data) =>
  fetch(`/products/${id}`, "PUT", data);

// External API Calls (Without Using Custom Fetch)
export const getCartData = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
};

export const getProduct = async () => {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data;
};
