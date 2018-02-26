'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')
const Env = use('Env')
const Shiki = use('App/Services/Shiki')


Route.get('/login-handler/', async ({session, response, request}) => {
  const code = request.input('code', null)
  if (code) {
    const {data: auth} = await Shiki.post('/oauth/token', {
      code,
      grant_type: 'authorization_code',
      client_id: Env.get('CLIENT_ID'),
      client_secret: Env.get('CLIENT_SECRET'),
      redirect_uri: 'https://search-sequels.herokuapp.com/login-handler'
    })


    if (auth.access_token) {
      const {data: user} = await Shiki.get('/api/users/whoami', {
        headers:{
          'Authorization': `Bearer ${auth.access_token}`
        }
      })
      session.put('auth', auth)
      session.put('user', user)
    }
  }

  await response.redirect('/')
})

Route.get('/api/list', 'AnimeController.index')
Route.get('/api/list/:id', 'AnimeController.show')

Route.any('*', 'NuxtController.render')
