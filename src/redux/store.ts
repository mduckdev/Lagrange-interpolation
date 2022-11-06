import { configureStore } from '@reduxjs/toolkit'
import cardsReducer from './cardsSlice'

export const store = configureStore({
    reducer: {
        cards: cardsReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch