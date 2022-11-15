import { useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'; 

interface buyState {
  buy: any,
}

const initialState: buyState = {
    buy: [],
}

export const adminProductSlice = createSlice({
  name: 'buy',
  initialState,
  reducers: {
    setBuy: (state, action: PayloadAction<any>) => {
      state.buy = action.payload;
    },

  },
});

export const { setBuy, } = adminProductSlice.actions
export const getBuyData = () => useSelector((state: RootState) => state.buy);
export default adminProductSlice.reducer