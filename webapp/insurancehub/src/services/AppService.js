import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const USER_API_BASE_URL = "http://localhost:8080/InsuranceHub/";

class AppService {
  signIn(details) {
    return axios.post(USER_API_BASE_URL + "/signin", details);
  }
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ firstName, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${USER_API_BASE_URL}/user/create`,
        { firstName, email, password },
        config
      );
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
