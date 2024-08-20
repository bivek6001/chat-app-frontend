import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import {useSelector,useDispatch} from "react-redux"
import { authUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
 axios.defaults.withCredentials= true;
const Auth = () => {
  const [page,setPage]= useState(true);
  const [credentials,setCredentials]= useState({
   
  });
  const dispatch=useDispatch();
  const navigate=useNavigate();

    async function handleSubmit(e){
      e.preventDefault();
      
      if(page){
       try {
        const res= await axios.post("http://localhost:9000/user/signin",credentials,{
          withCredentials:true,
        })
        if(!res.data.success){
          
          toast.error(res.data.message)
        
        }
        else{
          toast.success(res.data.message)
          console.log(res.data.user)
          dispatch(authUser(res.data.user));
          navigate("/message")
        }
     

       } catch (error) {
        toast.error(error.response.data.message)
        console.log(error.response.data.message)
        
       }
        
      }
      else{
        try {
          const res= await axios.post("http://localhost:9000/user/signup",credentials,{
            withCredentials:true,
          })
        console.log(res.data)
        toast.success(res.data.message)
        if(res.data.success){
          navigate("/");
          setPage(true);
        } }catch (error) {
          toast.error(error.response.data.message)
        }
      }
      

    }
    async function handleChange(e){
console.log('Change')
        setCredentials({...credentials,[e.target.name]:e.target.value})


    }




  return (
  
    <div className="wrapper w-screen h-screen flex justify-center items-center bg-[#F2F4F7]  ">
       
        <div className="left  h-[100%] w-[50%] flex justify-center items-center" > 

        <img src="https://images-platform.99static.com//bABwyPaSlYVZW-E95OkdmD00XZY=/221x221:780x781/fit-in/500x500/99designs-contests-attachments/129/129933/attachment_129933858" alt="logo"  className='w-[400px] h-[100px] object-contain'/>
        <p className='text-xl font-bold'>Social media helps you connect and share with the people in your life.</p>



        </div>
        <div className="right  h-[100%] w-[50%] flex justify-center items-center border-none">

                <div className="input bg-white shadow-md rounded-md border border-blue-100 flex justify-center items-center flex-col w-[400px] h-[400px]">
                    <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col gap-3'>
                  { !page &&   <div className='p-1  rounded-md  border'>
                       <input type="text" onChange={handleChange} placeholder='Username' className='  w-[364px] h-[48px] font-semibold  rounded-md outline-none' name='username' required/>
                       </div> }
                       <div className='p-1  rounded-md  border'>
                       <input type="text" onChange={handleChange} placeholder='Email address' className='  w-[364px] h-[48px] font-semibold  rounded-md outline-none' name='email' required/>
                       </div>
                       <div className='p-1  rounded-md  border'>
                       <input type="text" onChange={handleChange} placeholder='Password' className='  w-[364px] h-[48px] font-semibold  rounded-md outline-none border-none' name='password' required/>
                       </div>
                     <div>
                    
                     </div>
                        <button className='bg-[#1877F2] w-[364px] h-[48px] font-semibold text-white rounded-md' >{page ? "Login" : "Signup" }</button>


                    </form>
                    or
                    <hr/>
                    <button className='bg-[#42B72A] w-[250px] h-[45px] text-white font-white rounded-md font-medium' onClick={()=>{
                      setPage(!page)
                    }}>{page ? "Create new account" : "Existing user" }</button>
                </div>
        </div>

    </div>
  )
}

export default Auth