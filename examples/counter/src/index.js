import React from 'react'
import { render } from 'react-dom'

import dispatch from './actions'
import model from './model'

import App from './containers/App'

model.subscribe(state => {
  console.log('View received new state', state)
  render(
    <App state={state} dispatch={dispatch} />,
      document.getElementById('root')
  )
})

window.loadSnapshot = model.loadSnapshot
