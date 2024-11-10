import React, {useState} from 'react'
import Input from '../../components/Input/Input'


const Login = () => {

    const [data, setData] = useState({
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
        <div className='text-2xl font-extrabold'>Login Now</div>
        <Input type='email' label='Email' name='email' placeholder='Enter Your Email' onChange={handleChange}/>
        <Input type='email' label='Password' name='password' placeholder='Enter Your Password' onChange={handleChange}/>

        <button className='p-2 bg-blue-700 text-white mt-3 rounded-md w-16'>Login</button>
        <p>if don't have an account go to <span className='underline text-blue-700'>Register</span></p>
    </div>
  )
}

export default Login