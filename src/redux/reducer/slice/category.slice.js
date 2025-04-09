import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_BASE_URL } from "../../../utills/baseURL"
import axiosInstance from "../../../utills/axiosInstance"

const initialState = {
    isLoading: false,
    categories: [],
    error: null
}

export const createCategory = createAsyncThunk(
    'Category/createCategory',
    async (data) => {
        try {
            const response = await axiosInstance.post('categories/add-category', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })            
            return response.data.data;
        } catch (error) {
            console.error(error)
        }
    }
)

export const getCategories = createAsyncThunk(
    'Category/getCategories', async () => {
        try {
            const response = await axiosInstance.get('categories/list-categories');
            return response.data?.data;
        } catch (error) {
            console.error(error);
        }
    }
)

export const deleteCategories = createAsyncThunk(
    'Category/deleteCategories', async (id) => {
        try {
            const response = await axiosInstance.delete('categories/delete-category/' + id);
            return response.data?.data?._id
        } catch (error) {
            console.error(error);
        }
    }
)

export const updateCategory = createAsyncThunk(
    'Category/updateCategory', async (data) => {
        try {
            const response = await axiosInstance.put('categories/update-category/'+ data?._id, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data?.data;
        } catch (error) {
            console.error(error)
        }
    }
)

const categorySlice = createSlice({
    name: 'Category',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.categories.push(action.payload);
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        })
        builder.addCase(deleteCategories.fulfilled, (state, action) => {
            state.categories = state.categories.filter((v) => v._id !== action.payload);
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.categories = state.categories.map((v) => v._id === action.payload._id ? action.payload : v);
        })

    }
})

export default categorySlice.reducer;