// @flow

import isoFetch from 'isomorphic-fetch'

const testableUrl = (path) => {
  const TESTING = process.env.NODE_ENV === 'test'
  return `${TESTING ? 'http://localhost' : ''}${path}`
}

const prepareUrl = path => testableUrl(`/rest${path}`)

const fetch = (url: string, opts: Object = {}) => {
  const DEFAULT_OPTIONS = {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }

  const headers = {...DEFAULT_OPTIONS.headers, ...opts.headers}
  const options = {...DEFAULT_OPTIONS, ...opts, ...{ headers }}

  if (options.method === 'POST' || options.method === 'PUT') {
    options.headers['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').attributes.content.value
  }

  return isoFetch(prepareUrl(url), options)
}

export default fetch