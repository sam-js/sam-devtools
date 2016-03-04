import React from 'react'
import { render } from 'react-dom'

import actions from './actions'
import configureModel from './configureModel'

const model = configureModel({
  // Initial Store
  counter: 5,
})

import App from './containers/App'

const dispatch = actions(model.present)

model.subscribe(state => {
  console.log('View received new state', state)
  render(
    <App state={state} dispatch={dispatch} />,
      document.getElementById('root')
  )
})
