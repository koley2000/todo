import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPost} from '../features/getSlice'
import Post from './Post';


export default function TablePost() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPost()) 
    })
    const posts = useSelector(state => state.req.posts)
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
                    {Array.from(posts)?.map((post) => {
                       return <Post key={post.id} post={post} />
                    })}
                </tbody>
            </table>
        </div>
    )
}
