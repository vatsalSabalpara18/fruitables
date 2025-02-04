import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    user: [],
    error: null
}

export const getUsers = createAsyncThunk('User/getUsers',
    async () => {
        try {
            const response = await axios.get("http://localhost:5000/users");                
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)

export const addUser = createAsyncThunk('User/addUser',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/users", data);            
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)

export const deleteUser = createAsyncThunk('User/deleteUser', 
    async (id) => {
        try {
            await axios.delete("http://localhost:5000/users/" + id);
            return id
        } catch (error) {
            console.error(error)
        }
    }
)

export const updateUser = createAsyncThunk('User/updateUser',
    async (data) => {
        try {
            const response = await axios.put("http://localhost:5000/users/" + data.id, data);
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)

const userSlice = createSlice({
    name: 'User',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.user.push(action.payload);
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.user =state.user.filter((v) => v.id !== action.payload);
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.user = state.user.map((v) => v.id === action.payload.id ? action.payload : v);
        })
    }
})

export default userSlice.reducer