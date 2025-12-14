import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

export const checkAuth = createAsyncThunk(
    'auth/check',
    async (_,{rejectWithValue}) => {
        try {
            const res = await axiosInstance.get("/auth/check")
            return res.data
        } catch (error) {
            return rejectWithValue()
        }

    }
)

export const logIn = createAsyncThunk(
    'auth/login',
    async (data) => {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
  }
)
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            await axiosInstance.post("/auth/logout")
            
        } catch (error) {
            console.log(error)
        }
    }
)