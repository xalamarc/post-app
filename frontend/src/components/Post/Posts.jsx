import React, { useEffect, useState } from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts)

  return !posts.length ? (
    <>
      <div className='flex justify-center  h-14 absolute w-full items-center'>
        <h1 className='text-white text-2xl'>Posts</h1>
      </div>
      <div className=' flex justify-center items-center mx-auto mt-[10%]'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-white'></div>
      </div>
    </>
  ) : (
    <>
      <div className='flex justify-center  h-14 absolute w-full items-center'>
        <h1 className='text-white text-2xl'>Posts</h1>
      </div>
      <div className='relative mt-12 w-full h-full flex items-center justify-center flex-wrap '>
        {posts.map((post) => (
          <div key={post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Posts
