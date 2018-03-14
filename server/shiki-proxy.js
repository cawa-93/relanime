const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

const shiki = axios.create({
	baseURL: 'https://shikimori.org/api',
	headers: {'User-Agent': 'Find Sequel'}
})

app.use(async function (req, res) {
	try {
		const config = {
			method: req.method,
			url: req.url,
			data: req.body,
			responseType: 'stream',
      timeout: 5000
		}

		if (req.cookies.session) {
			config.headers = {
				Authorization: `Bearer ${req.cookies.session}`
			}
		}

		const response = await shiki(config)

		res.type('json').status(response.status)
		response.data.pipe(res)
	} catch (e) {
		if (e.response) {
			res.type('json').status(e.response.status)
			e.response.data.pipe(res)
		} else {
			res.status(500).send(e.stack)
		}
	}
})

module.exports = {
	path: 'shiki',
	handler: app
}
