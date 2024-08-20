
import './App.css';
import Auth from './components/auth/Login';

import io from "socket.io-client"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from'react-redux';
import { setSocket } from './redux/socketSlice';
import { setOnlineUser } from './redux/userSlice';
import Message from './components/message/Message';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from 'react';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth/>
  },
 
 
 
  {
    path: "/message",
    element: <Message></Message>,
  }
]);
function App() {

    
  const dispatch=useDispatch()
  const authUser = useSelector(state=>state.user.authUser);
  const socket = useSelector(state=>state.socket.socket);
useEffect(()=>{
    if(authUser){
      const socket= io("http://localhost:9000",{
        query:{
          userId:authUser._id
        }
      })
      dispatch(setSocket(socket));
      socket.on("getOnlineUser",(o)=>{
      dispatch(setOnlineUser(o));
      })
    }

    return () => {
      if (socket) {
        
        socket.close();
      }
    };
   
  
 
  },[authUser])  
  return (
  //<>
  <>

  {/* <Profile/> */}
 
  <RouterProvider router={router} >
 
    </RouterProvider>
 
 
 
  
  </>
  );
}

export default App;
