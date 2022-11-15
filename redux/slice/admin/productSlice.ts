import { useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'; 

interface productState {
  product: any,
  category: any,
  singleProduct: any,
  loading: boolean,
}

const initialState: productState = {
    product: [],
    category: [],
    singleProduct: null,
    loading: false
}

export const adminProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<any>) => {
      state.product = action.payload;
    },
    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload
    },
    setLoading: (state, action)=> {
      state.loading = action.payload;
    },
    setCategory: (state, action)=> {
      state.category = action.payload;
    },

  },
});

export const { setProduct, setSingleProduct, setLoading, setCategory ,} = adminProductSlice.actions
export const getAdminProductState = () => useSelector((state: RootState) => state.adminProduct);
export default adminProductSlice.reducer