import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";




export const fetchUser= createAsyncThunk("suggested/fetch",async()=>{
    const response= await axios.get("https://chat-app-backend-qf9p.onrender.com/user/suggested")
    return response.data.suggestedUsers
    
})

const initialState={
  authUser:null,
  selectedUser:null,
  onlineUser:null,
  otherUsers:null
 
}
const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        authUser:(state,action)=>{
            state.authUser=action.payload
        },
       logout:(state,action)=>{
        state.authUser= null;

       },
       selectUser:(state,action)=>{
        state.selectedUser=action.payload
        // console.log("working")
       },
       setOnlineUser:(state,action)=>{
        state.onlineUser=action.payload;
        // console.log("working")
       }

    
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.otherUsers=action.payload;
        })
    }
})

export const {authUser,logout,selectUser,setOnlineUser}= userSlice.actions;
export default userSlice.reducer;