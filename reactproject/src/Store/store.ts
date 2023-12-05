import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as favoriteReducer } from './favorite/favorite.slice'

const reducers = combineReducers({
	favorites: favoriteReducer,
})

export const store = configureStore({
	reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>
