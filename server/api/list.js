import { Router } from 'express'
import Anime from './Anime.class.js'
const axios = require('axios')
const api = axios.create({
  baseURL: 'https://shikimori.org/api',
  headers: {'User-Agent': 'Find Sequel'}
})


const router = Router()

router.get('/anime', async function (req, res) {
  try {

    if (req.query.search || req.query.ids ) {
      const anime = new Anime()
      const list = await anime.getAnime({
        limit: req.query.limit || 5,
        search: req.query.search || '',
        ids: req.query.ids || '',
        page: req.query.page || 1,
      })
      res.send(list)
    } else {
      res.status(404).end();
    }

  } catch (e) {
    console.error(e.response || e.stack)
    res.status(e.response.status || 500).send(e.response.data || e.stack)
  }
})

router.get('/anime/:id', async function (req, res) {
  try {
    const anime = new Anime()
    const related =  await anime.getRelated(req.params.id)
    res.send(related)
  } catch (e) {
    console.error(e.response || e.stack)
    res.status(e.response.status || 500).send(e.response.data || e.stack)
  }
})

router.get('/list', async function (req, res) {
  try {
    if (req.cookies.session) {
      const token = req.cookies.session
      const anime = new Anime()
      const user = await anime.getMe(token)
      const user_rate = await anime.getList(token, {
        user_id: user.id,
      })
      res.send({user,user_rate})
    } else {
      res.status(403).end();
    }
  } catch (e) {
    console.error(e.response || e.stack)
    res.status(e.response.status || 500).send(e.response.data || e.stack)
  }
})

router.post('/anime/:id', async function (req, res) {
  try {
    console.log(req.body)
    console.log(req.cookies.session)
    const {data: rate} = await api.post('/v2/user_rates', req.body, {
      headers:{
        'Authorization': `Bearer ${req.cookies.session}`
      }
    })
    res.send(rate).end()
  } catch (e) {
    console.error(e.response || e.stack)
    res.status(e.response.status || 500).send(e.response.data || e.stack)
  }
})

router.delete('/anime/:id', async function (req, res) {
  try {
    console.log(req.body)
    console.log(req.cookies.session)
    const {data: rate} = await api.delete('/v2/user_rates/'+req.params.id, {
      headers:{
        'Authorization': `Bearer ${req.cookies.session}`
      }
    })
    res.send(rate).end()
  } catch (e) {
    console.error(e.response || e.stack)
    res.status(e.response.status || 500).send(e.response.data || e.stack)
  }
})

export default router