import React, { useEffect, useState } from 'react'
import Form from './components/Form/Form'
import Posts from './components/Post/Posts'
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts'

const App = () => {
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(0)
  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])

  const [width, setWidth] = useState(window.innerWidth)

  const breakpoint = 700
  useEffect(() => {
    const resize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  if (width > breakpoint) {
    return (
      <div className='relative bg-gray-800 min-h-screen h-auto w-full flex flex-row'>
        <div className='relative flex justify-center md:flex md:justify-start w-7/12 h-full '>
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className='h-full w-5/12 relative '>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    )
  } else {
    return (
      <div className='bg-gray-800 h-full'>
        <div className='relative flex justify-center p-20'>
          <Form />
        </div>
        <div className='relative flex justify-center md:flex md:justify-start'>
          <Posts />
        </div>
      </div>
    )
  }
}

export default App
