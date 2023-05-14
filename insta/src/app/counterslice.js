import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    userid: null,
    isLoggedIn: false,
  },
  reducers: {
    setUserId: (state,action) => {
        state.userid=action.payload
    }, 
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
},
})
export const { setUserId,setIsLoggedIn } = counterSlice.actions
export const selectuser = (state) => state.counter.userid
export const selectIsLoggedIn = (state) => state.counter.isLoggedIn;


export default counterSlice.reducer
