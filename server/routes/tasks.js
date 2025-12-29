import express from 'express'
import Task from '../models/Task.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Get all tasks for authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create a new task
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, status } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Task title is required' })
    }

    const task = new Task({
      title,
      description: description || '',
      status: status || 'pending',
      user: req.user._id
    })

    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update a task
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, description, status } = req.body
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    if (title) task.title = title
    if (description !== undefined) task.description = description
    if (status) task.status = status

    await task.save()
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Toggle task status
router.patch('/:id/toggle', authenticate, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    task.status = task.status === 'pending' ? 'completed' : 'pending'
    await task.save()
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete a task
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

