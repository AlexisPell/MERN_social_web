const express = require('express')
const router = express.Router()
const auth = require('./../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('./../../models/User')

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
	try {
		// Get a copy of User model without password(cuz its jwted already)
		const user = await User.findById(req.user.id).select('-password')
		res.json(user)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
	'/',
	[
		check('email', 'Please, include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body

		try {
			//  Get instance of user
			let user = await User.findOne({ email })
			//  validation if user doesnt exist already
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials' }] })
			}

			// Check if password correct (req.password, encrypted password from user = User)
			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials' }] })
			}

			// Return JWT
			const payload = {
				user: {
					id: user.id,
				},
			}

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err
					res.json({ token })
				}
			)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server error')
		}
	}
)

module.exports = router
