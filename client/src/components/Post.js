import React from 'react'
import ViewPost from './ViewPost'
import EditPost from './EditPost'
import DeletePost from './DeletePost'

function Post(props) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm whitespace-nowrap">{props.post.title}</td>
      <td className="px-6 py-4 text-sm whitespace-nowrap">{props.post.tag}</td>
      <td className="px-6 py-4 text-sm whitespace-nowrap">{props.post.date.slice(0,10)}</td>
      <td className='flex flex-row'>
        <ViewPost post={props.post}/>
        <EditPost post={props.post}/>
        <DeletePost id={props.post._id}/>
      </td>
    </tr>
  )
}

export default Post
