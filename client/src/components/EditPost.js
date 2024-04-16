import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { MdOutlineEdit } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch} from 'react-redux';
import {editPost} from '../features/getSlice'


function EditPost(props) {
    const [open, setOpen] = useState(false);
    const { post } = props;

    const handleOpen = () => setOpen(!open);
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({ title: "", description: "", tag: "" })

    const onChange = (e) => {
        setPostData({ ...post, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editPost({id:post._id, title:postData.title, description:postData.description, tag:postData.tag}))
        toast.success("update successful");
        setOpen(!open);
    }

    return (
        <>
            <ToastContainer autoClose={1000}/>
            <button type="button" onClick={handleOpen} className="rmr-6 inline-flex items-center rounded border-2 border-gray-800 text-black bg-yellow-500 hover:bg-yellow-300 px-3 py-2 mx-3 text-base focus:outline-none mt-2.5" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <MdOutlineEdit />
            </button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Edit Post</DialogHeader>
                <DialogBody>
                    <div className="relative mb-4">
                        <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                        <input type="text" id="title" name="title" value={postData.title} onChange={onChange} className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="tag" className="leading-7 text-sm text-gray-600">Tag</label>
                        <input type="text" id="tag" name="tag" value={postData.tag} onChange={onChange} className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                        <textarea type="text" id="description" name="description" value={postData.description} onChange={onChange} className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
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
                    <Button variant="gradient" color="green" onClick={handleSubmit}>
                        <span>Edit</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default EditPost
