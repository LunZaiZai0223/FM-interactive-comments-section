import { configureStore } from '@reduxjs/toolkit';

// children reducers
import currentUserReducer from './currentUserSlice';
import commentsReducer from './commentsSlice';

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    comments: commentsReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
