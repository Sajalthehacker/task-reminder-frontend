import React, { useState } from 'react'
import './Forgot.css'
import axios from 'axios'

const Forgot = () => {
  const [email, setEmail] = useState('')

  const submitHandler = async(e) => {
    e.preventDefault()

    const {response} = await axios.post('http://localhost:5000/api/user/forgot-password', {
      email : email
    })

    alert(response.message)
  }

  return (
    <div className="m-container">
      <div className='forgot-container'>
        <h1>Enter email address that is linked with your account</h1>
        <input type="email" required placeholder='Enter email address' className='email-input' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <button className='reset-btn' onClick={submitHandler}>Reset Password</button>
      </div>
    </div>
  )
}

export default Forgot
