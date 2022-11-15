import { useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'; 

interface message {
    message: string,
    title: string,
}

interface notificationState {
  notifications: message[],
}

const initialState: notificationState = {
    notifications: [],
}

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<any>) => {
      state.notifications = [...state.notifications, action.payload]
    },
    setAllNotification: (state, action: PayloadAction<any>)=> {
      state.notifications = action.payload
    }

  },
});

export const { setNotification, setAllNotification} = NotificationSlice.actions
export const getNotification = () => useSelector((state: RootState) => state.notification);
export default NotificationSlice.reducer