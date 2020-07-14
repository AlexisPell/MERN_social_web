const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token')

	// Check if no token here
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorisation denied' })
	}

	//  Verify token
	try {
		// Decode jwt with token and secret key of config
		const decoded = jwt.verify(token, config.get('jwtSecret'))

		req.user = decoded.user

		next()
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' })
	}
}
