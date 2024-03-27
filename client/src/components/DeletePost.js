import React, { useContext } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import postContext from '../context/postContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DeletePost(props) {
    const [open, setOpen] = React.useState(false);
    const { id } = props;

    const handleOpen = () => setOpen(!open);
    const context = useContext(postContext);
    const { deletePost } = context;

    const handleSubmit = () => {
        deletePost(id);
        toast.success("Deletion Successful")
        setOpen(!open)
    }

    return (
        <>
            <ToastContainer />
            <Button onClick={handleOpen} className="rmr-6 inline-flex items-center rounded border-2 border-gray-800 text-black bg-red-400 hover:bg-red-200 px-3 py-2 mx-3 text-base focus:outline-none mt-2.5" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <MdDeleteOutline />
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Delete Post</DialogHeader>
                <DialogBody>
                    Are you sure you want to delete this post
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="green"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="red" onClick={handleSubmit}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default DeletePost
