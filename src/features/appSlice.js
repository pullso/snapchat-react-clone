import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  selectedImage: null
};


export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
    selectImage: (state, action) => {
      state.selectedImage = action.payload
    },
    resetImage: (state) => {
      state.selectedImage = null
    }
  },
});

export const {login, logout, selectImage, resetImage} = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.app.user;
export const selectSelectedImage = (state) => state.app.selectedImage;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default appSlice.reducer;
