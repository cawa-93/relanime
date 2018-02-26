'use strict'

const Shiki = use('App/Services/Shiki')


class AnimeController {
  async index ({session, response}) {
    const auth = session.get('auth', null)
    if (!auth || !auth.access_token || (auth.created_at+auth.expires_in)*1000 <= Date()) {
      session.clear()
      throw new Error ('Auth needed')
    }

    const completedPromise = Shiki.get('/api/animes', {
      params: {
        mylist: 'completed,rewatching',
        limit: 20
      },
      headers:{
        'Authorization': `Bearer ${auth.access_token}`
      }
    })

    const otherPromise = Shiki.get('/api/animes', {
      params: {
        mylist: 'planned,watching,on_hold,dropped',
        limit: 20
      },
      headers:{
        'Authorization': `Bearer ${auth.access_token}`
      }
    })

    const [{data: completed}, {data: other}] = await Promise.all([completedPromise, otherPromise])

    return {completed, other}
  }

  async show ({params, session, response}) {
    const auth = session.get('auth', null)
    if (!auth || !auth.access_token || (auth.created_at+auth.expires_in)*1000 <= Date()) {
      session.clear()
      throw new Error ('Auth needed')
    }

    const animePromise = Shiki.get(`/api/animes/${params.id}`, {
      headers:{
        'Authorization': `Bearer ${auth.access_token}`
      }
    })

    const relatedPromise = Shiki.get(`/api/animes/${params.id}/related`, {
      headers:{
        'Authorization': `Bearer ${auth.access_token}`
      }
    })

    const [{data: anime}, {data: related}] = await Promise.all([animePromise, relatedPromise])
    anime.related = related || []
    return anime
  }
}

module.exports = AnimeController
