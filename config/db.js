const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')
const colors = require('colors')

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		})

		console.log('MongoDB connected...'.cyan.bold)
	} catch (err) {
		console.log(err.message.red.bold)
		// Exit process with failure
		process.exit(1)
	}
}

module.exports = connectDB