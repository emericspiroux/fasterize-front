import { Dispatch } from "redux";

// Api Action interface
interface IApiAction {
  isDown: boolean,
  isTimeout: boolean
}


// Api Actions
export const actions = {
  /**
   * Set value to redux state `api.isDown`
   * @param dispatch Redux dispatch 
   * @param isDown true if API is down
   */
  setIsDown(dispatch:Dispatch, isDown:boolean) {
    dispatch({
      type: "API_DOWN",
      isDown: isDown
    });
  },
  /**
   * Set value to redux state `api.isTimeout`
   * @param dispatch Redux dispatch 
   * @param isTimeout true if internet connection is down
   */
  setIsTimeout(dispatch:Dispatch, isTimeout:boolean) {
    dispatch({
      type: "API_TIMEOUT",
      isTimeout: isTimeout
    });
  }
}

// api Reducer
export const reducer = (state = {}, action:any) => {
  let newState = {...state} as IApiAction
  switch (action.type) {
    case "API_DOWN":
      newState.isDown = action.isDown;
      break;
    case "API_TIMEOUT":
      newState.isTimeout = action.isTimeout;
      break;
    default:
      return newState;
  }
  return newState;
}

export default {
  reducer,
  actions
}