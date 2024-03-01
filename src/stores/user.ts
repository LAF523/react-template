import { createSlice } from '@reduxjs/toolkit';

export interface userType {
  name: string;
  token: string;
}
const initialState: userType = {
  name: '',
  token: ''
};

// createSlice自动生成对应的action creator和reduce
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export default userSlice.reducer; // 导出其中的reduce
export const { setUserInfo } = userSlice.actions; // 导出其中的action creator
