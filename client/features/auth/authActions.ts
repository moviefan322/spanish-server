import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import RegistrationData from "../../types/RegistrationData";
import User from "../../types/User";
import LoginData from "../../types/LoginData";
import LoginRes from "../../types/LoginRes";
import UpdateScoreData from "../../types/UpdateScoreData";
import PostScoreData from "../../types/PostScoreData";
import PostFlashcard from "../../types/PostFlashcard";

let backendUrl: string;
backendUrl = "https://spanish-app322-ef32a65d357f.herokuapp.com";

const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
};
if (typeof window !== "undefined") {
  var token = localStorage.getItem("spanishtoken");
}

export const registerUser = createAsyncThunk<User, RegistrationData>(
  "auth/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${backendUrl}/auth/signup`,
        { username, email, password },
        config
      );

      if (res.status === 201 && email && password) {
        const data = await loginReq(email, password);
        console.log("data", data);
        return data;
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk<LoginRes, LoginData>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/auth/signin`,
        { email, password },
        config
      );

      const { data } = response;
      localStorage.setItem("spanishtoken", data.access_token);

      console.log(data);

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateScore = createAsyncThunk(
  "auth/updateScore",
  async (updateScoreData: UpdateScoreData, { rejectWithValue }) => {
    try {
      const { id, score, lessonId, outOf, userId } = updateScoreData;
      const res = await axios.put(
        `${backendUrl}/stats/${id}`,
        { id, score, lessonId, outOf, userId },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = res;
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const postScore = createAsyncThunk(
  "auth/postScore",
  async (postScoreData: PostScoreData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendUrl}/stats`, postScoreData, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const { data } = res;
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createFlashcard = createAsyncThunk(
  "auth/createFlashcard",
  async (flashcard: PostFlashcard, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendUrl}/flashcards`, flashcard, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const { data } = res;
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const loginReq = async (email: string, password: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    `${backendUrl}/auth/login`,
    { email, password },
    config
  );

  const { data } = response;
  localStorage.setItem("spanishtoken", data.access_token);
  return data;
};
