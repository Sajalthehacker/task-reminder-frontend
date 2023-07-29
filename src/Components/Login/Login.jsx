import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [iconState, setIconState] = useState('bx-show')
    const [showPassword, setShowPassword] = useState(true)

    const eyeIconHandler = (e) => {
        e.preventDefault()
        setIconState(iconState === 'bx-show' ? 'bx-hide' : 'bx-show')
        setShowPassword(!showPassword)
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('http://localhost:5000/api/user/login', {
                email: email,
                password: password
            })

            if (data.status === "EMPTY_CREDENTIALS") {
                alert(data.message)
            }

            if (data.status === "NO_ACCOUNT_EXISTS") {
                alert(data.message)
            }

            if (data.status === "PASSWORD_NOT_MATCHED") {
                alert(data.message)
            }

            if (data.status === "LOGIN_SUCCESSFULL") {
                alert('login success')
                navigate('/home');
            }

        }
        catch (error) {
            alert(error.message)
        }
    }

    const forgotHandler = (e) => {
        e.preventDefault()
        navigate('/reset-link')
    }

    return (
        <div className='login-container'>
            <div className="form login">
                <div className="form-content">
                    <header>Login</header>
                    <form action="#">
                        <div className="field input-field">
                            <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} required />
                        </div>
                        <div className="field input-field">
                            <input type={(showPassword) ? "password" : "text"} placeholder="Password" className="password" value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }} required />
                            <i className={`bx ${iconState} eye-icon`} onClick={eyeIconHandler}></i>
                        </div>
                        <div className="form-link">
                            <span onClick={forgotHandler} id="forgot-password">Forgot password?</span>
                        </div>
                        <div className="field button-field">
                            <button onClick={submitHandler}>Login</button>
                        </div>
                    </form>
                    <div className="form-link">
                        <span>Don't have an account? <a href="/register" className="link signup-link">Signup</a></span>
                    </div>
                </div>
                <div className="line"></div>
                <div className="media-options">
                    <a href="home" className="field facebook">
                        <i className='bx bxl-facebook facebook-icon'></i>
                        <span>Login with Facebook</span>
                    </a>
                </div>
                <div className="media-options">
                    <a href="home" className="field google">
                        <img src="#" alt="" className="google-img" />
                        <span>Login with Google</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Login
