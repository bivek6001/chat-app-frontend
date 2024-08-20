import React, { useEffect, useRef, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, setMessages } from '../../redux/messageSlice';
import axios from 'axios';
import { selectUser } from '../../redux/userSlice';
import { fetchUser } from '../../redux/userSlice';
import { BiSolidMessageRounded } from "react-icons/bi";
axios.defaults.withCredentials=true
const Left = () => {
  
   
    const scroll= useRef();
    const otherUsers =useSelector(state=>state.user.otherUsers);
    const messages= useSelector((state)=>state.message.messages)
    const selectedUser= useSelector((state)=>state.user.selectedUser)
    const onlineUser= useSelector((state)=>state.user.onlineUser)
    const status= onlineUser?.includes(selectedUser?._id)
    // console.log(selectedUser)
    const socket= useSelector((state)=>state.socket.socket)
    const dispatch=useDispatch()
    // console.log(status)
//    console.log(selectedUser)
    const [body,setBody]=useState("");
 
   
    useEffect(() => {
        if (socket) {
            const handleNewMessage = (data) => {
                console.log(messages);
                console.log(data);
                dispatch(setMessages([...messages, data]));
            };
    
            socket.on("newMessage", handleNewMessage);
    
            // Cleanup function to remove the listener
            return () => {
                socket.off("newMessage", handleNewMessage);
            };
        }
    }, [ socket,messages, dispatch]);
    
    useEffect(() => {
        if (selectedUser?._id) {
            dispatch(fetchMessages(selectedUser._id));
        }
    }, [selectedUser?._id, dispatch]);
    useEffect(()=>{
      
       
        dispatch(fetchMessages(selectedUser?._id))
        return()=>{
            dispatch(setMessages(null));
            
        }

    
    },[selectedUser,dispatch,setMessages])
    useEffect(()=>{
        scroll.current?.scrollIntoView({
           
            behavior: 'smooth'
        });
    },[messages])
   


    async function sendMessage(e){
        e.preventDefault();
        const response=await axios.post(`https://chat-app-backend-qf9p.onrender.com/${selectedUser._id}`,{message:body})
        // console.log(response);
        setBody("");
        dispatch(setMessages([...messages,response.data.newMessage]));
    }
  return (
    <div className='w-[60%] bg-[#0B141A] relative '>
       
      {selectedUser ?  <>
        <div className="person user-info relative bg-[#202C33] w-[100%] h-[70px] flex justify-start items-center gap-3 px-4">
            <div className="img relative">
                <img src={selectedUser?.image} className='w-[50px] h-[50px] rounded-full object-cover' alt="user-chat-dp" />
              
               
            </div>
           
            <span className='flex p-2 items-center justify-center text-white font-medium gap-1'> <div className={`h-[10px] w-[10px] ${status ? " bg-green-500" : "bg-red-600" } rounded-full`}></div>  {status ? "online": "offline"} </span> 
            <div className="username absolute right-0 p-3 font-medium text-white flex justify-between items-center ">@{selectedUser.username} </div>

        </div>

        {/* messages */}

        <div  className="message px-2 flex flex-col justify-start items-center  gap-3 overflow-y-scroll h-[75%] p-2 no-scrollbar" >
        
 
       {messages && messages?.map((message, i) =>{
                return(
                   <div ref={scroll} className={`message-bubble bg-[#202C33] ${selectedUser._id ===message.sender ? "self-start" : "self-end"} text-white rounded-md max-w-[200px] text-wrap p-2 `}>{message.message}</div>
                )
            })}
        </div>


        {/* input */}

        <div className="input absolute bottom-0 bg-[#202C33] w-[100%] h-[12%] flex justify-center items-center">
            <form method="post" className='w-[100%] p-2 flex justify-center items-center' onSubmit={sendMessage}>
                <input type="text" placeholder='Type a message' className='bg-[#2A3942] text-white outline-none w-[90%] p-2 rounded-md' value={body} onChange={(e)=>{
                    setBody(e.target.value);
                }} />
                <button  className='w-[10%] flex items-center  justify-center ' ><IoSend className='text-[#838E96]' size={"30px"} /></button>
            </form>
        </div>
      </> : (
       <div className=' text-white h-[100%] w-[100%] flex justify-center items-center flex-col'>
        <BiSolidMessageRounded size={"50px"} />
        <h1 className='font-bold text-3xl'>Lets start a Conversation</h1>
        <p className='font-medium text-xl'>Send a message</p>
       </div>

      )}
     
        
    </div>

  )
}

export default Left