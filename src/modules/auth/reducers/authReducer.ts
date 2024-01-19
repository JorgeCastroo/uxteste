import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserData} from '../../../interfaces/UserData';

interface State {
  userData: UserData | null;
  isLogged: boolean;
  authLoading: boolean;
  isMeli: boolean;
  isCancelOperation: boolean;
}

const initialState: State = {
  userData: null,
  isLogged: false,
  authLoading: true,
  isMeli: false,
  isCancelOperation: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    setAuthLogin: (state, action?: PayloadAction<boolean>) => {
      state.authLoading = false;
      state.isLogged = true;
      state.isMeli = action?.payload || false;
    },

    setAuthLogout: state => {
      state.userData = null;
      state.isLogged = false;
      state.authLoading = false;
      state.isMeli = false;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload;
    },
    setIsCancelOperation: (state, action: PayloadAction<boolean>) => {
      state.isCancelOperation = action.payload;
    },
  },
});

export const {
  setAuthUserData,
  setAuthLogin,
  setAuthLogout,
  setAuthLoading,
  setIsCancelOperation,
} = authSlice.actions;
export default authSlice.reducer;
