// import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

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
    error: null
}


export const getSubCategories = createAsyncThunk(
    'subCategory/getSubCategories',
    async () => {
        try {
            const response = await axios.get('http://localhost:5000/subcategory')            
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)

export const addSubCategories = createAsyncThunk(
    'subCategory/addSubCategories',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/subcategory", data)
            console.log(response.data);
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)
export const deleteCategories = createAsyncThunk(
    "subCategory/deleteCategories",
    async (id) => {
        try {
            const response = await axios.delete('http://localhost:5000/subcategory/' + id)
            console.log(response.data)
            return id
        } catch (error) {
            console.error(error)
        }
    }

)
export const updateCategories = createAsyncThunk(
    "subCategory/updateCategories",
    async (data) => {
        try {       
            console.log("data", data)     
            const response = await axios.put(`http://localhost:5000/subcategory/${data?.id}`, data)
            console.log(response.data)
            return response.data
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
            state.subCategoryData = state.subCategoryData.map((v) => v.id === action.payload.id ? action.payload : v);
        })
        builder.addCase(deleteCategories.fulfilled, (state, action) => {
            state.subCategoryData = state.subCategoryData.filter((v) => v.id !== action.payload);
        }) 
    }
})

export default subCategorySlice.reducer