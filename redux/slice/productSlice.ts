import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';

interface productState {
  actionType: string,
  product: any,
  singleProduct: any,
}

const initialState: productState = {
    actionType: "",
    product: [],
    singleProduct: null,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<any>) => {
      state.product = action.payload.product;
      state.actionType = action.payload.actionType
    },
    setSingleProduct: (state, action) => {
        state.singleProduct = action.payload.product
        state.actionType = action.payload.actionType
    }
  },
  extraReducers: {
    [HYDRATE] : (state, action) => {
        if(action.payload.products.actionType === "getAll"){
            state.product = action.payload.products.product;
        }else if(action.payload.products.actionType === "getSingle"){
            state.singleProduct = action.payload.products.singleProduct; 
        }
    },
  },
})

export const { setProduct, setSingleProduct } = productSlice.actions

export const getProductState = ( state:RootState ) => state.products;

export default productSlice.reducer