import React, { useContext, useEffect } from 'react';
import Post from './Post';
import postContext from '../context/postContext';


export default function TablePost() {
    const context = useContext(postContext);
    const {posts, getPost } = context;
    useEffect(()=>{
        getPost()
    })
    return (
        <div className='overflow-auto mx-auto mt-20 flex sm:justify-center items-center sm:ml-1'>
            <table className="shadow-md divide-y divide-gray-200 table-auto text-left mx-3"> 
                <thead className="table-auto border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <tr>
                        <th className="pl-6 lg:pr-28 md:pr-4 py-4 text-sm whitespace-nowrap">Title</th>
                        <th className="pl-6 lg:pr-28 md:pr-4 py-4 text-sm whitespace-nowrap">Tag</th>
                        <th className="pl-6 lg:pr-28 md:pr-4 py-4 text-sm whitespace-nowrap">Date Created</th>
                        <th className="pl-6 lg:pr-28 md:pr-4 py-4 text-sm whitespace-nowrap"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {posts?.map((post) => {
                       return <Post key={post.id} post={post} />
                    })}
                </tbody>
            </table>
        </div>
    )
}
