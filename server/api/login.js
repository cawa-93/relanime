import { Router } from 'express'
import axios from 'axios'
const router = Router()

router.get('/login-handler', async function (req, res) {
	try {
		if (!req.query.code) {
			res.status(500).end()
		}

		const {data: auth} = await axios.post(`https://shikimori.org/oauth/token`, {
			code: req.query.code,
			grant_type: 'authorization_code',
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			redirect_uri: process.env.REDIRECT_URI
		})

		res.cookie('session', auth.access_token, {
			maxAge: auth.expires_in * 1000,
			secure: process.env.NODE_ENV === 'production'
		}).redirect('/')
	} catch (e) {
		console.error(e)
		res.status(500).send(e).end()
	}
})

export default router
