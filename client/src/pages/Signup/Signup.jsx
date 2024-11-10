import React, { useState } from 'react'
import Input from '../../components/Input/Input'


const Signup = () => {
    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    console.log(data)
    const handleChange = (e)=>{
        setData((prev)=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(data)
    }


  return (
    <div className='bg-white w-[500px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center'>
    <div className='text-2xl font-extrabold'>Sign Up Now</div>
    <form onSubmit={handleSubmit}></form>
    <Input type='text' label='Full Name' name='fullName' placeholder='Enter Your Name' onChange={handleChange}/>
    <Input type='email' label='Email' name='email' placeholder='Enter Your Email' onChange={handleChange}/>
    <Input type='password' label='Password' name='password' placeholder='Enter Your Password' onChange={handleChange}   />
 
    <button type='submit' className='p-2 bg-blue-700 text-white mt-3 rounded-md w-16'>Signup</button>
    <p>if already have an account go to <span className='underline text-blue-700'>Login</span></p>
</div>
  )
}

export default Signup