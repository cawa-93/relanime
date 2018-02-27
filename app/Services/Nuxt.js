'use strict'

const Env = use('Env')
const Config = use('Config')
const { Nuxt, Builder } = require('nuxt')

class NuxtService {
  constructor () {
    this.nuxt = null
  }

  /**
   * Starts the build process
   *
   * @method boot
   *
   * @return {void}
   */
  build (dev = Env.get('NODE_ENV') === 'development') {
    const config = Config.merge('nuxt', { dev })
    console.log(`${config.dev ? 'development' : 'production'} mod`)
    this.nuxt = new Nuxt(config)
    if (Env.get('NODE_ENV') === 'development')
      return new Builder(this.nuxt).build()
    else
      return Promise.resolve()
  }

  /**
   * Handles the HTTP request by making the appropriate
   * response, based upon the URL.
   *
   * @method render
   *
   * @param  {Object} req
   * @param  {Object} res
   *
   * @return {Promise}
   */
  render (req, res) {
    return new Promise((resolve, reject) => {
      this.nuxt.render(req, res, promise => {
        promise.then(resolve).catch(reject)
      })
    })
  }
}

module.exports = new NuxtService()
