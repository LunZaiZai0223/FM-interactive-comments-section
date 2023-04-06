import { createSlice } from '@reduxjs/toolkit';

import data from '../data.json';

interface CurrentUser {
  username: string;
}

const CURRENT_USER = JSON.parse(JSON.stringify(data.currentUser));
const initialState: CurrentUser = CURRENT_USER;

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
});

export default currentUserSlice.reducer;
