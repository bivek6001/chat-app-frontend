import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    messages:null
}


export const fetchMessages= createAsyncThunk("fetch/messages",async(id)=>{
    const res= await axios.get(`http://localhost:9000/message/get/${id}`);
    console.log(res.data.messages);
 return res.data.messages;

    
})


const messageSlice= createSlice({
    name:"messages",
    initialState,
    reducers:{
        setMessages:(state,action)=>{
            state.messages=action.payload
        }
    },
    extraReducers:(builder)=>{
       builder.addCase(fetchMessages.fulfilled,(state,action)=>{
        state.messages=action.payload;
       })
    }
    
});

export const {setMessages}=messageSlice.actions;
export default messageSlice.reducer;