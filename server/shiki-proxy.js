import axios from 'axios'
import { Router } from 'express'

const router = Router()

const shiki = axios.create({
	baseURL: 'https://shikimori.org/api',
	headers: {'User-Agent': 'Find Sequel'}
})

router.use('/shiki', async function (req, res) {
	try {
		const config = {
			method: req.method,
			url: req.path,
			params: req.query,
			data: req.body,
			responseType: 'stream'
		}

		if (req.cookies.session || req.cookies._kawai_session) {
			config.headers = {
				Authorization: `Bearer ${req.cookies.session || req.cookies._kawai_session}`
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

export default router
