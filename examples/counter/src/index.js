import React from 'react'
import { render } from 'react-dom'

import dispatch from './actions'
import model from './model'

import App from './containers/App'

// import { subscribe } from './timeTravelStore'
// import timeTravelUI from './timeTravelUI'

model.subscribe(state => {
  console.log('View received new state', state)
  render(
    <App state={state} dispatch={dispatch} />,
      document.getElementById('root')
  )
})


// TimeTravelUI
// subscribe(snapshots => timeTravelUI(snapshots))
// window.loadSnapshot = model.loadSnapshot
