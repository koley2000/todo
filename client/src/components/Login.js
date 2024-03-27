import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import logo from '../images/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [passOpen, setPassOpen] = useState(false);

    const passwordToggle = () => {  //Handle password toggle
        setPassOpen(!passOpen)
    }
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: credentials.username, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            //Save the auth token and redirect
            sessionStorage.setItem('token', json.authToken);
            navigate("/");
            toast.success("Login Successful")
        }
        else {
            toast.error("Wrong Credentials")
        }
    }

    return (
        <>
        <ToastContainer/>
        <div className='mt-20 flex justify-center'>
            <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col max-w-fit shadow-2xl">
                <img className='mb-5 ml-6' src={logo} alt="" width='300' />
                <h2 className="text-gray-900 text-3xl font-medium title-font mb-3">Log In</h2>

                <form onSubmit={loginSubmit}>
                    <div className="relative mb-4">
                        <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
                        <input type="text" id="username" name="username" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            onChange={onChange} required />
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="passowrd" className="leading-7 text-sm text-gray-600">Password</label>
                        <div className="relative">
                            <input type={(passOpen === false) ? 'password' : 'text'} id="passowrd" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={onChange} required />
                            <div className='text-2xl absolute top-0 end-0 p-2.5'>
                                {
                                    (passOpen === false) ? <AiFillEye style={{ color: 'rgb(209 213 219)' }} onClick={passwordToggle} /> :
                                        <AiFillEyeInvisible style={{ color: 'rgb(209 213 219)' }} onClick={passwordToggle} />

                                }
                            </div>
                        </div>
                    </div>

                    <button type='submit' className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Log In</button>
                    <Link to="/signup" className="text-sky-600 pl-2 hover:underline">Sign up</Link>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login
