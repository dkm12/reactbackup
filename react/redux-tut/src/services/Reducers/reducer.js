import { ADD_TO_CART, REMOVE_TO_CART } from '../constant'
const initialState = {
  cardData: []
  

}

export default function CardIteams(state = [], action) {
  // console.log("card data",cardData)
  console.log(action.type)
  switch (action.type) {
    case ADD_TO_CART:
      return [
        ...state, 
       {cardData: action.data}
      ]

      case REMOVE_TO_CART:
        state.pop();
        return [
          ...state, 
         
        ]

    default:
      return state
  }

}