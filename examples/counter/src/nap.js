// Input: State
// Output: NAP, i.e. a function which accepts a function (present) and may or may not call it
const nap = state => {
  return present => {
    if (state.counter < 10) {
      present({ increaseBy: 1 })
    }
  }
}

export default nap
