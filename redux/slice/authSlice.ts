import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';

interface authState {
  user: any,
  loading: boolean,
}

const initialState: authState = {
  user: null,
  loading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE] : (state, action) => {
      state.user = action.payload.auth.user;
    },
  },
})

export const { setAuth, setLoading } = authSlice.actions

export const getAuthData = (state: RootState) => state.auth;

export default authSlice.reducer