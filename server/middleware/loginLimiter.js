const rateLimit = require('express-rate-limit')
const { logEvents } = require('./logger')

const loginLimiter = rateLimit({
	windowMs: 60 * 1000,// 1 minute
	max: 5, // Limit each IP to 5 login requests er "window" per minute
	message:
		{ message: 'Too many login attempts, Please try again after one minute' },
	handler: (req, res, next, options) => {
		logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errlog.log')
		res.status(options.statusCode).send(options.message)
	},
	standardHeaders: true,
	legacyHeaders: false,
})

module.exports = loginLimiter