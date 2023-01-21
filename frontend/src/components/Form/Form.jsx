import React, { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import { Typography } from '@material-ui/core'

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  )
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (currentId === 0) {
      dispatch(createPost(postData))
      clear()
    } else {
      dispatch(updatePost(currentId, postData))
      clear()
    }
  }

  const clear = () => {
    setCurrentId(0)
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const [width, setWidth] = useState(window.innerWidth)

  const breakpoint = 800
  useEffect(() => {
    const resize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])
  if (width > breakpoint) {
    return (
      <>
        <div className='w-full h-full'>
          <div className='md:grid md:grid-cols-2 md:gap-6 p-5'>
            <div className='mt-5 md:col-span-2 md:mt-0'>
              <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                <div className='shadow sm:overflow-hidden sm:rounded-md '>
                  <div className='space-y-2 bg-white px-4 py-2 sm:p-6 rounded-t-lg'>
                    <Typography variant='h6'>
                      {currentId
                        ? `Editing "${post.title}"`
                        : 'Creating a Memory'}
                    </Typography>
                    <div>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-dark'>
                        Creator
                      </label>
                      <input
                        type='text'
                        id='first_name'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        required
                        value={postData.creator}
                        onChange={(e) =>
                          setPostData({ ...postData, creator: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-dark'>
                        Title
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        required
                        value={postData.title}
                        onChange={(e) =>
                          setPostData({ ...postData, title: e.target.value })
                        }
                      />
                    </div>

                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-dark'>
                      Your message
                    </label>
                    <textarea
                      rows='4'
                      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Write your thoughts here...'
                      value={postData.message}
                      onChange={(e) =>
                        setPostData({ ...postData, message: e.target.value })
                      }
                    ></textarea>

                    <div>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-dark'>
                        Tags
                      </label>
                      <input
                        type='text'
                        id='first_name'
                        className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        required
                        value={postData.tags}
                        onChange={(e) =>
                          setPostData({ ...postData, tags: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <div className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                        <div className='space-y-1 text-center'>
                          <svg
                            className='mx-auto h-12 w-12 text-gray-400'
                            stroke='currentColor'
                            fill='none'
                            viewBox='0 0 48 48'
                            aria-hidden='true'
                          >
                            <path
                              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          <div className='ml-16 text-sm text-gray-600'>
                            <label
                              htmlFor='file-upload'
                              className='relative cursor-pointer rounded-md  font-medium text-indigo-600 hover:text-indigo-500'
                            >
                              <FileBase
                                type='file'
                                multiple={false}
                                onDone={({ base64 }) =>
                                  setPostData({
                                    ...postData,
                                    selectedFile: base64,
                                  })
                                }
                              />
                            </label>
                          </div>
                          <p className='text-xs text-gray-500'>
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                    <button
                      type='submit'
                      className='m-5 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          <div className='md:grid md:grid-cols-3 md:gap-6 w-2/3 sm:w-3/4 mx-auto'>
            <div className='md:col-span-1'></div>
            <div className='mt-5 md:col-span-2 md:mt-0'>
              <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                <div className='shadow sm:overflow-hidden sm:rounded-md '>
                  <div className='space-y-2 bg-white px-4 py-2 sm:p-6 rounded-t-lg'>
                    <div>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-dark'>
                        Creator
                      </label>
                      <input
                        type='text'
                        id='first_name'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        required
                        value={postData.creator}
                        onChange={(e) =>
                          setPostData({ ...postData, creator: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-dark'>
                        Title
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        required
                        value={postData.title}
                        onChange={(e) =>
                          setPostData({ ...postData, title: e.target.value })
                        }
                      />
                    </div>

                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-dark'>
                      Your message
                    </label>
                    <textarea
                      rows='4'
                      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Write your thoughts here...'
                      value={postData.message}
                      onChange={(e) =>
                        setPostData({ ...postData, message: e.target.value })
                      }
                    ></textarea>

                    <div>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-dark'>
                        Tags
                      </label>
                      <input
                        type='text'
                        id='first_name'
                        className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        required
                        value={postData.tags}
                        onChange={(e) =>
                          setPostData({ ...postData, tags: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <div className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                        <div className='space-y-1 text-center'>
                          <svg
                            className='mx-auto h-12 w-12 text-gray-400'
                            stroke='currentColor'
                            fill='none'
                            viewBox='0 0 48 48'
                            aria-hidden='true'
                          >
                            <path
                              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          <div className='ml-16 text-sm text-gray-600'>
                            <label
                              htmlFor='file-upload'
                              className='relative cursor-pointer rounded-md  font-medium text-indigo-600 hover:text-indigo-500'
                            >
                              <FileBase
                                multiple={false}
                                onDone={({ base64 }) =>
                                  setPostData({
                                    ...postData,
                                    selectedFile: base64,
                                  })
                                }
                                type='file'
                              />
                            </label>
                          </div>
                          <p className='text-xs text-gray-500'>
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                    <button
                      type='submit'
                      className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Form
