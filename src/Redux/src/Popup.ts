import { Dispatch } from "redux";

// Popup state interface
interface IPopupState {
    message: string | undefined,
}

// Popup actions
export const actions = {
  // Call `ADD_MESSAGE` action with a message string
  // Add element to `IPopupState.messages`
  addMessage: (dispatch:Dispatch, message:string) => {
    dispatch({
        type: 'ADD_MESSAGE',
        message
    })
  },
  // Call `DELETE_MESSAGE` action with an index to delete message from `IPopupState.message`
  deleteMessage: (dispatch:Dispatch) => {
    dispatch({
        type: 'DELETE_MESSAGE'
    })
  }
};

//Reducer
export const reducer = (state = {}, action:any) => {
    let newState = {...state} as IPopupState
    switch (action.type) {
        case 'ADD_MESSAGE':
            newState.message = action.message
            break;
        case 'DELETE_MESSAGE':
          newState.message = undefined
          break;
        default:
            break;
    }
    return newState
}

export default {
  reducer,
  actions
}