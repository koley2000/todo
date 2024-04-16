import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup(props) {
  const navigate = useNavigate();
  const [passOpen, setPassOpen] = useState(false);
  const [comPass, setComPass] = useState(false);

  const [input, setInput] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const passwordToggle = () => {  //Handle password toggle
    setPassOpen(!passOpen)
  }

  const comPasswordToggle = () => {  //Handle comfirm password toggle
    setComPass(!comPass)
  }

  const onInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  };


  const signupSubmit = async (e) => { //Singup Authentication
    e.preventDefault();
    const { name, username, email, password } = input;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, username, email, password })
    })
    const json = await response.json()
    console.log("Signup Successfully")
    if (json.success) {
      //Save the auth token and redirect
      sessionStorage.setItem('token', json.authToken)
      navigate('/');
      toast.success("Account Created Successfully")
    }
    else {
      toast.error(json.error)
    }
  }

  return (
    <>
     <ToastContainer/>
      <div className='mt-20 flex justify-center'>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col max-w-fit shadow-2xl">
          <img className='mb-5 ml-6' src={logo} alt="" width='300' />
          <h2 className="text-gray-900 text-3xl font-medium title-font mb-3">Sign Up</h2>

          <form onSubmit={signupSubmit}>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={input.name}
                onChange={onInputChange}
                required />
            </div>

            <div className="relative mb-4">
              <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
              <input type="text" id="username" name="username" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={input.username}
                onChange={onInputChange}
                required />
            </div>

            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={input.email}
                onChange={onInputChange}
                required />
            </div>

            <div className="relative mb-4">
              <label htmlFor="passowrd" className="leading-7 text-sm text-gray-600">Password</label>
              <div className="relative">
                <input type={(passOpen === false) ? 'password' : 'text'} id="passowrd" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={input.password}
                  onChange={onInputChange}
                  required />
                <div className='text-2xl absolute top-0 end-0 p-2.5'>
                  {
                    (passOpen === false) ? <AiFillEye style={{ color: 'rgb(209 213 219)' }} onClick={passwordToggle} /> :
                      <AiFillEyeInvisible style={{ color: 'rgb(209 213 219)' }} onClick={passwordToggle} />

                  }
                </div>
              </div>
            </div>

            <div className="relative mb-4">
              <label htmlFor="passowrd" className="leading-7 text-sm text-gray-600">Confirm Password</label>
              <div className="relative">
                <input type={(comPass === false) ? 'password' : 'text'} id="passowrd" name="confirmPassword" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={input.confirmPassword}
                  onChange={onInputChange}
                  required />
                <div className='text-2xl absolute top-0 end-0 p-2.5'>
                  {
                    (comPass === false) ? <AiFillEye style={{ color: 'rgb(209 213 219)' }} onClick={comPasswordToggle} /> :
                      <AiFillEyeInvisible style={{ color: 'rgb(209 213 219)' }} onClick={comPasswordToggle} />

                  }
                </div>
              </div>
            </div>
            <div className="flex mb-2">
              <input type="checkbox" className="border-sky-400 " value="" required />
              <div className="leading-7 text-sm px-3 text-gray-600">
                I accept terms & conditions
              </div>
            </div>

            <button type='submit' className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Sign up</button>
          </form>
          <div className="flex justify-center mt-3">
            <p className="text-gray-600">Already have an acount? </p>
            <Link to="/login" className="text-sky-600 pl-2 hover:underline">Log In</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
