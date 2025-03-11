import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function signup(values: object) {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}
export async function signin(values: object) {
  try {
    const response = await axios.post(`${BASE_URL}/users/signin`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}
