const express = require('express')
const User = require('../../../models/user/User')
const router = express.Router()
const auth = require('../../../middleware/auth')

router.post('/', async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ user, token })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/login', async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
      return res
        .status(401)
        .json({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.json({ user, token })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get('/me', auth, async (req, res) => {
  // View logged in user profile
  res.json(req.user)
})

router.post('/me/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token
    })
    await req.user.save()
    res.json()
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/me/logoutall', auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.json()
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
