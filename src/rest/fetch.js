// @flow

import axios from 'axios'

const testableUrl = path => {
  // const TESTING = process.env.NODE_ENV === 'test'
  // return `${TESTING ? 'http://localhost:8989' : ''}${path}`
  return `http://localhost:3001${path}`

}

const prepareUrl = path => testableUrl(`/rest${path}`)

const fetch = (url: string, opts: Object = {}) => {
  const DEFAULT_OPTIONS = {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  }

  const headers = { ...DEFAULT_OPTIONS.headers, ...opts.headers }
  const options = { ...DEFAULT_OPTIONS, ...opts, ...{ headers } }

  return axios(prepareUrl(url), options)
}

export default fetch
