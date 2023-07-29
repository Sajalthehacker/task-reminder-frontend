import React, { useState } from 'react'
import './Verify.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setEmailStore, setIsEmailVerifiedStore, setIsLoggedInStore, setNameStore } from '../../Redux/Actions/Action'

const Verify = () => {
    const myStore = useSelector((store) => store.userReducer)

    const dispatch = useDispatch()
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()
    const email = myStore.Email

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!otp) {
            return alert('please enter the otp')
        }

        try {
            const { data } = await axios.post('http://localhost:5000/api/user/verifyEmail', {
                email: email,
                otp: otp
            })

            if (data.status === "EMAIL_ALREADY_VERIFIED") {
                alert(data.message)
                navigate('/')
            }

            else if (data.status === "OTP_EXPIRED" || data.status === "INVALID_OTP" || data.status === "ERROR_OCCURED" || data.status === "EMPTY_CREDENTIALS") {
                alert(data.message)
            }

            else if (data.status === "VERIFICATION_SUCCESSFULL") {
                alert(data.message)
                dispatch(setNameStore(data.data.name))
                dispatch(setEmailStore(data.data.email))
                dispatch(setIsEmailVerifiedStore(data.data.isEmailVerified))
                dispatch(setIsLoggedInStore(data.data.isLoggedIn))
                navigate('/home')
            }

        }
        catch (error) {
            alert(error.message)
        }
    }

    const resendHandler = async(e) => {
        e.preventDefault()
        
        try {
            const {data} = await axios.post('http://localhost:5000/api/user/verifyEmail', {
                email: email
            })

            if(data.status === "EMPTY_CREDENTIALS" || data.status === "ERROR_OCCURED" || data.status === "RESENT_SUCCESSFULL"){
                alert(data.message)
            }
        } 
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className='parent-container'>
            <div className="verify-container">
                <h1>
                    <span>Please verify Your</span>
                    <span>Email Address</span>
                </h1>

                <div className="input-field">
                    <input type="text" placeholder="Enter OTP Received On Email Address" className="input" value={otp} onChange={(e) => {
                        setOtp(e.target.value)
                    }} required />
                </div>

                <div className="button">
                    <button onClick={submitHandler}>Verify Email</button>
                </div>

                <div className="resend-link">
                    <span onClick={resendHandler}>Resend Otp</span>
                </div>
            </div>
        </div>
    )
}

export default Verify
