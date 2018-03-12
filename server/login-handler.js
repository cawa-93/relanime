require('dotenv').config()

const axios = require('axios')
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

const shiki = axios.create({
  baseURL: 'https://shikimori.org/',
  headers: {'User-Agent': 'Find Sequel'}
})

app.get('/generate', async function (req, res) {
  if (!req.query.code) {
    res.status(500).end()
  } else {
    const {data: auth} = await shiki.post(`/oauth/token`, {
      code: req.query.code,
      grant_type: 'authorization_code',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI
    })

    res
      .cookie('session', auth.access_token, {
        maxAge: auth.expires_in * 1000,
        secure: process.env.NODE_ENV === 'production'
      })
      .cookie('refresh', auth.refresh_token, {
        secure: process.env.NODE_ENV === 'production'
      })
      .redirect('/')
  }
})

app.get('/refresh', async function (req, res) {
  if (!req.cookies.refresh) {
    res.status(500).end()
  } else {
    const {data: auth} = await shiki.post(`/oauth/token`, {
      refresh_token: req.cookies.refresh,
      grant_type: 'refresh_token',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI
    })

    res
      .cookie('session', auth.access_token, {
        maxAge: auth.expires_in * 1000,
        secure: process.env.NODE_ENV === 'production'
      })
      .cookie('refresh', auth.refresh_token, {
        secure: process.env.NODE_ENV === 'production'
      })
      .redirect('/')
  }
})

module.exports = {
  path: 'login-handler',
  handler: app
}
