// import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../../utills/axiosInstance"
import { setAlert } from "./alert.slice"

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
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/sub-categories/list-subcategories');
            if (response.data?.success) {
                return response.data?.data
            }
        } catch (error) {
            console.error(error)
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)

export const getSubCategoryByCategory = createAsyncThunk(
    'subCategory/getSubCategoryByCategory',
    async (category, { rejectWithValue }) => {
        try {
            if (!category) return;
            const response = await axiosInstance.get("sub-categories/get-subcategories/" + category);
            if (response.data?.success) {
                return response.data?.data
            }
        } catch (error) {
            console.error(error);
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)

export const addSubCategories = createAsyncThunk(
    'subCategory/addSubCategories',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('sub-categories/add-subcategory', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response?.data?.success) {
                dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));
                return response.data?.data
            }
        } catch (error) {
            console.error(error)
            dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)
export const deleteCategories = createAsyncThunk(
    "subCategory/deleteCategories",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete('sub-categories/delete-subcategory/' + id)
            if (response.data?.success) {
                dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));
                return response.data?.data;
            }
        } catch (error) {
            console.error(error)
            dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));
            return rejectWithValue(error?.response?.data?.message);
        }
    }

)
export const updateCategories = createAsyncThunk(
    "subCategory/updateCategories",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const { name, category, description, sub_cat_img } = data
            const response = await axiosInstance.put(`sub-categories/update-subcategory/${data?._id}`, { name, category, description, sub_cat_img }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data?.success) {
                dispatch(setAlert({ varriant: 'success', message: response?.data?.message }));
                return response.data?.data
            }
        } catch (error) {
            console.error(error)
            dispatch(setAlert({ varriant: 'error', message: error?.response?.data?.message }));
            return rejectWithValue(error?.response?.data?.message)
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
        builder.addCase(getSubCategories.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(addSubCategories.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(updateCategories.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(deleteCategories.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(getSubCategoryByCategory.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export default subCategorySlice.reducer