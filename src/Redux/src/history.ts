import { Dispatch } from "redux";
import IDebugHistoryElement from "../../Components/DebugHistory/IDebugHistoryElement";

// History Action interface
interface IHistory {
    elements: IDebugHistoryElement[],
    index?:number
}

// History actions
export const actions = {
  // Call `ADD_HISTORY` action with an element with type `IDebugHistoryElement`
  // Add element to `IHistory.elements`
  addElement: (dispatch:Dispatch, element:IDebugHistoryElement) => {
    dispatch({
        type: 'ADD_HISTORY',
        element
    })
  },
  // Call `UPDATE_HISTORY` action with an element with type `IDebugHistoryElement` with an index.
  // Update element to `IHistory.elements` at specified index
  updateElement: (dispatch:Dispatch, index:number, element:IDebugHistoryElement) => {
    dispatch({
        type: 'UPDATE_HISTORY',
        index,
        element
    })
  }
};

//Reducer
export const reducer = (state = {}, action:any) => {
    let newState = {...state} as IHistory
    switch (action.type) {
        case 'ADD_HISTORY':
            if (!Array.isArray(newState.elements)) newState.elements = []
            newState.elements = [action.element, ...newState.elements]
            break;
        case 'UPDATE_HISTORY':
          if (!Array.isArray(newState.elements)) break;
          if (action.index < 0 || action.index >= newState.elements.length) break;
          newState.elements[action.index] = {...action.element}
          newState.elements = [...newState.elements]
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