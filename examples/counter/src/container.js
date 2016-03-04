// Input: Current store, dataset presented
// Output: New store
const container = (store = {}, dataset = {}) => {
  if (dataset.increaseBy !== undefined) {
    store.counter += dataset.increaseBy
  }

  return store
}

export default container
