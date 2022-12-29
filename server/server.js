require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require ('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require ('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

mongoose.set('strictQuery', true)

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors(corsOptions))

//receives and parse JSON datas
app.use(express.json())

app.use(cookieParser())

//telling express where to find static files(e.g. CSS File) that will be used in the server
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))

//handles Errors if user requests are not found or if the it did not match any of the routes
app.all('*', (req, res) => {
	res.status(404)
	if(req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'))
	} else if (req.accepts('json')) {
		res.json({ message: '404 Not Found'})
	} else {
		res.type('txt').send('404 Not Found')
	}
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB')
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
	logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.log')
})
