import dispatch from './actions.js'

import { createModel } from 'sam'

// Input: Current store, dataset presented
// Output: New store
const container = (store = {}, dataset) => {
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

const model = createModel(container, state, nap, initialStore)

export default  model

export let { present } = model
