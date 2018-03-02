import { Router } from 'express'
import Anime from './Anime.class.js'

const router = Router()

router.get('/login-handler', async function (req, res) {
  try {
    if (!req.query.code) {
      res.status(500).end();
    }

    const anime = new Anime()
    const auth = await anime.getToken(req.query.code)

    res.cookie('session', auth.access_token, {
    	maxAge: auth.expires_in*1000,
      secure: process.env.NODE_ENV === 'production',
    }).redirect('/');

  } catch (e) {
    console.error(e)
    res.status(500).send(e).end()
  }
})

export default router