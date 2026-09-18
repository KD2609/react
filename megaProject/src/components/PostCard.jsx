import React from 'react'
import appwriteService from '../appwrite/conf'
import {Link} from 'react-router-dom'

function PostCard({$id,title,featuredImage}) {
  return (
    <Link to = {`/post/${$id}`}>
        <div className='w-full bg-gray-400 p-4 rounded-xl'>
            <div className = 'w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(id)} alt = {title}
                className='rounded-xl'
                ></img>
            </div>
            <h2 className='text-gray-400 text-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard