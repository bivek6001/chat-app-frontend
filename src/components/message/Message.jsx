import React from 'react'
import Right from './Right'
import Left from './Left'
import { fetchUser, selectUser } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const Message = () => {
    const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchUser())
    return()=>{
      dispatch(selectUser(null))}
  },[])
  return (
    <div className="wrapper h-screen w-screen bg-red-500 flex">

      <Right/>
      <Left/>

    </div>
  )
}

export default Message