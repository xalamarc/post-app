import express from 'express'
import Post from '../models/PostModel.js'
import mongoose from 'mongoose'

export const getPosts = async (req, res) => {
  try {
    const post = await Post.find()
    console.log(Post)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findById(id)

    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body
  const newPost = new Post({ title, message, selectedFile, creator, tags })
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  const { title, message, creator, selectedFile, tags } = req.body

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id }

  await Post.findByIdAndUpdate(id, updatedPost, { new: true })

  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  await Post.findByIdAndRemove(id)

  res.json({ message: 'Post deleted successfully.' })
}

export const likePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  const post = await Post.findById(id)

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  )

  res.json(updatedPost)
}