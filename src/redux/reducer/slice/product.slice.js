import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API_BASE_URL } from "../../../utills/baseURL"

const initialState = {
    isLoading: false,
    products: [],
    error: null
}


export const getProducts = createAsyncThunk(
    'product/getProducts',
    async () => {
        try {
            const response = await axios.get(API_BASE_URL + 'products/list-products');
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
            const response = await axios.post(API_BASE_URL + 'products/add-product', data, {
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
            const response = await axios.delete(API_BASE_URL + 'products/delete-product/' + id);      
            return response.data?.data;
        } catch (error) {
            console.error(error)
        }
    }

)
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (data) => {
        try {
            const response = await axios.put(`${API_BASE_URL}products/update-product/${data?._id}`, data, {
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