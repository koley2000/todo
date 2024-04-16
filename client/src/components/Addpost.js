import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa";
// import postContext from "../context/postContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch} from 'react-redux';
import {addPost} from '../features/getSlice'

function Addpost() {
    const [open, setOpen] = useState(false);
     
    const handleOpen = () => setOpen(!open);
    const dispatch = useDispatch();

    const [post, setPost] = useState({ title: "", description: "", tag: "" })
    

    const postClick = (e) => {
        e.preventDefault();
        dispatch(addPost({title:post.title, description:post.description, tag:post.tag}))
        setPost({ title: "", description: "", tag: "" })
        toast.success("Added Successfully")
        console.log("successfully added")
        setOpen(!open);
    }
    const onChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer />
            <button className="mr-6 inline-flex items-center rounded border-0 text-white bg-green-400 px-3 py-2 mx-3 text-base hover:bg-green-600 focus:outline-none md:mt-0" onClick={handleOpen}>
                <FaPlus className='mr-1' />Add Post
            </button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Add Post</DialogHeader>
                <DialogBody>
                    <div className="relative mb-4">
                        <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                        <input type="text" id="title" name="title" value={post.title} onChange={onChange} className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="tag" className="leading-7 text-sm text-gray-600">Tag</label>
                        <input type="text" id="tag" name="tag" value={post.username} onChange={onChange} className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                        <textarea type="text" id="description" name="description" value={post.description} onChange={onChange} className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={postClick}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default Addpost
