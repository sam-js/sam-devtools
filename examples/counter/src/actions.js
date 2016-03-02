import { present } from './model'


// Input: Model
// Output: Dispatch, i.e. a function which accepts an action and presents values to the model
const dispatch = action => {

  console.log('Dispatch:', action)

  switch (action.type) {
    case 'INC':
      present({ increaseBy: 1 })
  }
}

export default dispatch