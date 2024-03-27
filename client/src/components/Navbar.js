import React from 'react'
import logo from '../images/logo.png'
import personIcon from '../images/person-icon.jpg'
import Profile from './Profile'
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Addpost from './Addpost';


function Navbar() {


  return (
    <nav className="shadow-md bg-gray-100">
      <div className="mx-auto max-w-full px-2 sm:px-6 xl:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-8 w-auto" src={logo} alt="Your Company" />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            <div className="relative ml-4">
              <div className='flex flex-wrap justify-center'>
                <Addpost/>
                <Menu>
                  <MenuHandler>
                    <button type="button" className="relative flex rounded-full bg-gray-800 text-sm" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <img className="h-10 w-10 rounded-full" src={personIcon} alt="" />
                    </button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem ><Profile/></MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav >
  )
}

export default Navbar
