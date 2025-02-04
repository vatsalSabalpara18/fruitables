// import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API_BASE_URL } from "../../../utills/baseURL"

// const initialState = {
//     isLoading: false,
//     subcategories: [],
//     error: null,
// };

// const subcategorySlice = createSlice({
//     name: "subcategory",
//     initialState,
//     reducers: {
//         getSubCategories: (state, action) => { },
//         addSubCategories: (state, action) => {
//             state.subcategories.push(action.payload);
//         },
//         deleteCategories: (state, action) => {
//             state.subcategories = state.subcategories.filter(
//                 (v) => v.id !== action.payload
//             );
//         },
//         updateCategories: (state, action) => {
//             state.subcategories = state.subcategories.map((v) =>
//                 v.id === action.payload.id ? action.payload : v
//             );
//         },
//     },
// });

// export const {
//     addSubCategories,
//     getSubCategories,
//     deleteCategories,
//     updateCategories,
// } = subcategorySlice.actions;
// export default subcategorySlice.reducer;

const initialState = {
    isLoading: false,
    subCategoryData: [],
    subCatByCat: [],
    error: null
}


export const getSubCategories = createAsyncThunk(
    'subCategory/getSubCategories',
    async () => {
        try {
            const response = await axios.get(API_BASE_URL + '/sub-categories/list-subcategories');
            return response.data?.data
        } catch (error) {
            console.error(error)
        }
    }
)

export const getSubCategoryByCategory = createAsyncThunk(
    'subCategory/getSubCategoryByCategory',
    async (category) => {
        try {
            if(!category) return;
            const response = await axios.get(API_BASE_URL + "sub-categories/get-subcategories/" + category);
            return response.data?.data
        } catch (error) {
            console.error(error);
        }
    }
)

export const addSubCategories = createAsyncThunk(
    'subCategory/addSubCategories',
    async (data) => {
        try {            
            const response = await axios.post(API_BASE_URL + 'sub-categories/add-subcategory', data, {
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
export const deleteCategories = createAsyncThunk(
    "subCategory/deleteCategories",
    async (id) => {
        try {
            const response = await axios.delete(API_BASE_URL + 'sub-categories/delete-subcategory/' + id)            
            return response.data?.data;
        } catch (error) {
            console.error(error)
        }
    }

)
export const updateCategories = createAsyncThunk(
    "subCategory/updateCategories",
    async (data) => {
        try {             
            const response = await axios.put(`${API_BASE_URL}sub-categories/update-subcategory/${data?._id}`, data, {
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


const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getSubCategories.fulfilled, (state, action) => {
            state.subCategoryData = action.payload
        })
        builder.addCase(addSubCategories.fulfilled, (state, action) => {
            state.subCategoryData.push(action.payload)
        })
        builder.addCase(updateCategories.fulfilled, (state, action) => {
            state.subCategoryData = state.subCategoryData.map((v) => v._id === action.payload._id ? action.payload : v);
        })
        builder.addCase(deleteCategories.fulfilled, (state, action) => {
            state.subCategoryData = state.subCategoryData.filter((v) => v._id !== action.payload._id);
        }) 
        builder.addCase(getSubCategoryByCategory.fulfilled, (state, action) => {
            state.subCatByCat = action.payload;
        })
    }
})

export default subCategorySlice.reducer