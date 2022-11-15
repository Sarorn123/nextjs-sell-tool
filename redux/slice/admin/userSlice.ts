import { useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'; 

interface productState {
  user: any,
  singleUser: any,
  loading: boolean,
}

const initialState: productState = {
    user: [],
    singleUser: null,
    loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setSingleUser: (state, action: PayloadAction<any>) => {
      state.singleUser = action.payload;
    },
  },
});

export const { setUsers,setSingleUser} = userSlice.actions
export const getUserState = () => useSelector((state: RootState) => state.user);
export default userSlice.reducer