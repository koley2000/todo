import React, { useEffect } from 'react'
import Navbar from './Navbar'
import TablePost from './TablePost'
import { useNavigate } from 'react-router-dom';

function Home() {
  let navigate =  useNavigate();
  useEffect(()=>{
    if(sessionStorage.getItem('token')){ //Login Access Logic
        console.log("Success")
    }
    else{
        navigate("/login");
    }
    // eslint-disable-next-line
},[])
  return (
    <>
    <Navbar/> 
    <TablePost/>
    </>
  )
}

export default Home
