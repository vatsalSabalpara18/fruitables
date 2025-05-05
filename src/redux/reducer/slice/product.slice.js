import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API_BASE_URL } from "../../../utills/baseURL"
import axiosInstance from "../../../utills/axiosInstance"

const initialState = {
    isLoading: false,
    products: [],
    error: null
}


export const getProducts = createAsyncThunk(
    'product/getProducts',
    async () => {
        try {
            const response = await axiosInstance.get('products/list-products');
            return response.data?.data
        } catch (error) {
            console.error(error)
        }
    }
)

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (data) => {
        try {
            const response = await axiosInstance.post('products/add-product', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })            
            return response.data?.data
        } catch (error) {
            console.error(error)
        }
    }
)
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id) => {
        try {
            const response = await axiosInstance.delete('products/delete-product/' + id);      
            return response.data?.data;
        } catch (error) {
            console.error(error)
        }
    }

)
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (data) => {
        const { name, category, sub_category, description, price, product_img } = data
        try {
            const response = await axiosInstance.put(`products/update-product/${data?._id}`, { name, category, sub_category, description, price, product_img }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data?.data
        } catch (error) {
            console.error(error)
        }
    }
)


const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.products.push(action.payload)
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.products = state.products.map((v) => v._id === action.payload._id ? action.payload : v);
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter((v) => v._id !== action.payload._id);
        })
    }
})

export default productSlice.reducer;