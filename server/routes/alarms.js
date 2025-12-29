import express from 'express'
import Alarm from '../models/Alarm.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Get all alarms for authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const alarms = await Alarm.find({ user: req.user._id }).sort({ time: 1 })
    res.json(alarms)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create a new alarm
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, time } = req.body

    if (!title || !time) {
      return res.status(400).json({ message: 'Title and time are required' })
    }

    const alarmTime = new Date(time)
    if (alarmTime < new Date()) {
      return res.status(400).json({ message: 'Alarm time must be in the future' })
    }

    const alarm = new Alarm({
      title,
      time: alarmTime,
      user: req.user._id
    })

    await alarm.save()
    res.status(201).json(alarm)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update an alarm
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, time, isActive } = req.body
    const alarm = await Alarm.findOne({ _id: req.params.id, user: req.user._id })

    if (!alarm) {
      return res.status(404).json({ message: 'Alarm not found' })
    }

    if (title) alarm.title = title
    if (time) {
      const alarmTime = new Date(time)
      if (alarmTime < new Date()) {
        return res.status(400).json({ message: 'Alarm time must be in the future' })
      }
      alarm.time = alarmTime
    }
    if (isActive !== undefined) alarm.isActive = isActive

    await alarm.save()
    res.json(alarm)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Toggle alarm active status
router.patch('/:id/toggle', authenticate, async (req, res) => {
  try {
    const alarm = await Alarm.findOne({ _id: req.params.id, user: req.user._id })

    if (!alarm) {
      return res.status(404).json({ message: 'Alarm not found' })
    }

    alarm.isActive = !alarm.isActive
    await alarm.save()
    res.json(alarm)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete an alarm
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const alarm = await Alarm.findOneAndDelete({ _id: req.params.id, user: req.user._id })

    if (!alarm) {
      return res.status(404).json({ message: 'Alarm not found' })
    }

    res.json({ message: 'Alarm deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

