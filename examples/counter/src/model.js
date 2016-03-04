import dispatch from './actions.js'

// Monitor
import { subscribe } from 'sam-devtools'
import render from 'sam-devtools-monitor'
subscribe(render)

import { createModel } from 'sam'
import { instrument } from 'sam-devtools'


// Input: Current store, dataset presented
// Output: New store
const container = (store = {}, dataset = {}) => {
  if (dataset.increaseBy !== undefined) {
    store.counter += dataset.increaseBy
  }

  return store
}

// Input: Store (from Model)
// Output: State (to View and nap)
const state = store => {
  return {
    counter: store.counter,
    isSix: (store.counter == 6),
    moreThanFive: (store.counter > 5),
  }
}

// Input: State
// Output: NAP, i.e. a function which accepts a function (present) and may or may not call it
const nap = state => {
  return present => {

    if (state.counter == 7) {
      present({ increaseBy: 1 })
    }

  }
}

const initialStore = {
  counter: 5,
}

const model = createModel(container, state, nap, initialStore, instrument)

export default model

export let { present } = model
