import { Router } from 'express'
import Anime from './Anime.class.js'

const router = Router()

router.get('/list', async function (req, res) {
  try {
    if (!req.query.s && !req.cookies.session) {
      res.status(404).end();
    }

    if (req.query.s) {
      const anime = new Anime()
      const list = await anime.getList({
        limit: 10,
        search: req.query.s
      })
      console.log(list)
      res.send(list)
    } else if (req.cookies.session) {

    }

  } catch (e) {
    console.error(e)
    res.status(500).send(e).end()
  }
})

router.get('/list/:id', async function (req, res) {
  try {
    const anime = new Anime()
    const related =  await anime.getRelated(req.params.id)
    res.send(related)
  } catch (e) {
    console.error(e)
    res.status(500).send(e).end()
  }
})

export default router