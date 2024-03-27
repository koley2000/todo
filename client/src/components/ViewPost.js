import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { GoEye } from "react-icons/go";

function ViewPost(props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <button type="button" onClick={handleOpen} className="rmr-6 inline-flex items-center rounded border-2 border-gray-800 text-black bg-blue-400 hover:bg-blue-200 px-3 py-2 mx-3 text-base focus:outline-none mt-2.5" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <GoEye />
            </button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>View Post</DialogHeader>
                <DialogBody>
                    <div className="relative mb-4">
                        <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                        <input type="text" id="title" name="title" value={props.post.title} readOnly className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="tag" className="leading-7 text-sm text-gray-600">Tag</label>
                        <input type="text" id="tag" name="tag" value={props.post.tag} readOnly className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                        <textarea type="text" id="description" value={props.post.description} readOnly name="description" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
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
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default ViewPost
