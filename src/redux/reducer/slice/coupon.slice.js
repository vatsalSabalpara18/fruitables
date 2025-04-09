import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { API_BASE_URL } from "../../../utills/baseURL";

const initialState = {
    isLoading: false,
    couponCode: [],
    error: null
}

export const getCoupons = createAsyncThunk(
    "Coupon/getCoupons", async () => {
        try {
            const res = await axios.get(API_BASE_URL + "coupon-code/list-coupon-code");
            return res.data?.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const addCoupons = createAsyncThunk(
    "Coupon/addCoupons", async (data) => {
        try {
            const res = await axios.post(API_BASE_URL + "coupon-code/add-coupon-code", data);
            return res.data?.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteCoupon = createAsyncThunk(
    'Coupon/deleteCoupon', async (id) => {
        try {
            await axios.delete(API_BASE_URL + `coupon-code/delete-coupon-code/${id}`);
            return id;
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateCoupon = createAsyncThunk(
    'Coupon/updateCoupon', async(data) => {
        try {
            const res = await axios.put(API_BASE_URL + `coupon-code/update-coupon-code/${data?._id}`, data);
            return res.data?.data;
        } catch (error) {
            console.error(error)
        }
    }
)

const couponCodeSlice = createSlice({
    name: 'Coupon',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCoupons.fulfilled, (state, action) => {
            state.couponCode = action.payload;
        })
        builder.addCase(addCoupons.fulfilled, (state, action) => {
            state.couponCode.push(action.payload);
        })
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            state.couponCode = state.couponCode.filter((item) => item?._id !== action.payload);
        })
        builder.addCase(updateCoupon.fulfilled, (state, action) => {
            state.couponCode = state.couponCode.map((item) => item?._id === action.payload._id ? action.payload : item);
        })
    }
})

export default couponCodeSlice.reducer;