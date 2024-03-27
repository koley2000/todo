import React, { useContext, useEffect } from "react";
import personIcon from '../images/person-icon.jpg'
import { useNavigate } from "react-router-dom";
import postContext from "../context/postContext";


export default function Profile() {
  const context = useContext(postContext);
  const { details, getDetails } = context;

  useEffect(() => {
    getDetails();
  })


  let navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('token')
    navigate("/signup");
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="max-w-xs">
          <div className="box">
            <div className="photo-wrapper p-2">
              <img className="w-32 h-32 rounded-full mx-auto" src={personIcon} alt="" />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{details.name}</h3>
              <table className="text-xs my-3">
                <tbody><tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">Username</td>
                  <td className="px-2 py-2">{details.username}</td>
                </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td className="px-2 py-2">{details.email}</td>
                  </tr>
                </tbody></table>

              <div className="text-center my-3">
                <button className="bg-red-400 rounded border-0 px-3 py-2 text-xs text-white hover:bg-red-600 font-medium" onClick={handleLogout}>Log Out</button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}