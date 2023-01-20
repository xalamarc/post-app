import React from 'react'
import moment from 'moment'
import { CardActions, Button } from '@material-ui/core/'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useDispatch } from 'react-redux'
import { likePost, deletePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch()
  return (
    <div className='h-auto max-h-[800px] w-[300px]  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-5'>
      <img
        className='w-full max-h-[200px] rounded-t-lg object-cover'
        src={
          post.selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        alt=''
      />
      <Button
        style={{ color: 'white' }}
        className='float-right absolute bottom-10'
        size='small'
        onClick={() => setCurrentId(post._id)}
      >
        <MoreHorizIcon fontSize='medium' />
      </Button>

      <div className='p-5'>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {post.tags.map((tag) => `#${tag} `)}
        </p>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {post.title}
        </h5>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {post.creator}
        </p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {post.message}
        </p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {moment(post.createdAt).fromNow()}
        </p>
        <CardActions className='relative flex items-center'>
          <div className=' absolute left-0 '>
            <Button
              size='small'
              style={{ color: 'white' }}
              onClick={() => dispatch(likePost(post._id))}
            >
              <ThumbUpAltIcon fontSize='small' /> Like {post.likeCount}{' '}
            </Button>
          </div>
          <div className=' absolute right-1'>
            <Button
              size='small'
              style={{ color: 'white' }}
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize='small' /> Delete
            </Button>
          </div>
        </CardActions>
      </div>
    </div>
  )
}

export default Post
