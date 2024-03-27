import React, { useState } from 'react'
import postContext from './postContext'

function PostState(props) {

    const host = 'https://wordpost-server-six.vercel.app'
    const [posts, setPosts] = useState([]);
    const [details, setDetails] = useState([]);

    // Get User Details
    const getDetails = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': sessionStorage.getItem('token')
            },
        })
        const json = await response.json();
        setDetails(json);
    }

    //Get all Notes
    const getPost = async () => {
        //API Call
        const response = await fetch(`${host}/api/post/fetchallposts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authToken": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setPosts(json);
    }

    // Add Post
    const addPost = async (title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/post/addpost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const post = await response.json();
        setPosts(posts.concat(post));
    }

    // Delete Post
    const deletePost = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/post/deletepost/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            }
        });
        // const json = response.json();
        //Delete a note
        const newPosts = posts.filter((post) => { return post._id !== id });
        setPosts(newPosts);
    }

    //Edit a Post
    const editPost = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/post/updatepost/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        // const json = await response.json();

        let newPosts = JSON.parse(JSON.stringify(posts));
        //Logic to edit note
        for (let index = 0; index < newPosts.length; index++) {
            const element = newPosts[index];
            if (element._id === id) {
                newPosts[index].title = title;
                newPosts[index].description = description;
                newPosts[index].tag = tag;
                break;
            }
        }
        setPosts(newPosts);
    };

    return (
        <postContext.Provider value={{ posts, details, getDetails, addPost, deletePost, editPost, getPost }}>
            {props.children}
        </postContext.Provider>
    )
}

export default PostState
