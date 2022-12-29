const express = require('express')
const router = express.Router()
const path = require('path')

//handles GET requests made to a specfic path or route

//The regular expression consists of two alternatives: '^/$', which matches the root path (i.e., the path '/'), and '/index(.html)?', which matches the path '/index' or '/index.html'.

// followed by a callback function, which will be executed when a GET request is made to one of the matching paths.
router.get('^/$|/index(.html)?',(req, res) => {
	res.sendfile(path.join(__dirname, "..", "views", "index.html"))
})

module.exports = router