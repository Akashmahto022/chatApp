import React from 'react'
import Input from '../../components/Input/Input'

const Form = () => {
  return (
    <div className='bg-white w-[500px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center'>
        <div className='text-2xl font-extrabold'>Sign Up Now</div>
        <Input label='Full Name' name='name' placeholder='Enter Your Name'/>
        <Input label='Email' name='email' placeholder='Enter Your Email'/>
        <Input label='Password' name='password' placeholder='Enter Your Password'/>

        <button className='p-2 bg-blue-700 text-white mt-3 rounded-md w-16'>Signup</button>
        <p>if already have an account go to <span className='underline text-blue-700'>Sign in</span></p>
    </div>
  )
}

export default Form