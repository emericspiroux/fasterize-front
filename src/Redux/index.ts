import { combineReducers, Reducer, AnyAction } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import history from './src/history'
import api from './src/api'

// List of redux actions availables
const actions = {
    history: history.actions,
    api: api.actions
}

// Combine reducer give more understandability about redux state
const rootPersistReducer = combineReducers({
    history: history.reducer
})

// Persist options
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
    blacklist: ['api']
}

export default {
    persistedReducer: persistReducer(persistConfig, rootPersistReducer as Reducer<unknown, AnyAction>),
    actions
}