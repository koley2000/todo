import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = 'http://localhost:5000'


// Get User Details
export const getDetails = createAsyncThunk("getDetails", async (args, { rejectWithValue }) => {
    const response = await fetch(`${host}/api/auth/getuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authToken': sessionStorage.getItem('token')
        },
    })
    const json = await response.json();
    return json;
})


//Get all Notes
export const getPost = createAsyncThunk("getPost", async (args, { rejectWithValue }) => {
    const response = await fetch(`${host}/api/post/fetchallposts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authToken': sessionStorage.getItem('token')
        },
    })
    const res = await response.json();
    return res;
})

//Add Notes
export const addPost = createAsyncThunk("addPost", async ({title, description, tag}, { rejectWithValue }) => {
    const response = await fetch(`${host}/api/post/addpost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authToken': sessionStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
    })
    const res = await response.json();
    return res;
})

//Delete Notes
export const deletePost = createAsyncThunk("deletePost", async (id, { rejectWithValue }) => {
    const response = await fetch(`${host}/api/post/deletepost/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authToken': sessionStorage.getItem('token')
        },
    })
    const res = await response.json();
    return res;
})

//Edit Notes
export const editPost = createAsyncThunk("editPost", async ({id, title, description, tag}, { rejectWithValue }) => {
    const response = await fetch(`${host}/api/post/updatepost/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
    });
    const res = await response.json();

    return res;
})

export const getSlice = createSlice({
    name: "getSlice",
    initialState: {
        user: [],
        posts: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(getDetails.pending, state => {
            state.loading = true;
        })
        builder.addCase(getDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = '';
        })
        builder.addCase(getDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(getPost.pending, state => {
            state.loading = true;
        })
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            state.error = '';
        })
        builder.addCase(getPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(addPost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts.push(action.payload);
        })

        builder.addCase(deletePost.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if (id) {
                state.posts = state.posts.filter((post) => post._id !== id);
            }
        })
        builder.addCase(deletePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(editPost.pending, state => {
            state.loading = true;
        })
        builder.addCase(editPost.fulfilled, (state, action) => {
            console.log("updated list fulfilled", action.payload);
            state.loading = false;
            state.posts = state.posts.map((ele) =>
                ele._id === action.payload.id ? action.payload : ele
            );
        })
        builder.addCase(editPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
})


export default getSlice.reducer;
