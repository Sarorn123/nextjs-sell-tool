import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './roootReducer'

const makeStore = () => configureStore({
  reducer: rootReducer
});

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>
export const wrapper = createWrapper<AppStore>(makeStore)