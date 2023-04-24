import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cameraImage: null
};


export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCameraImage: (state, action) => {
      state.cameraImage = action.payload
    },
    resetCameraImage: (state) => {
      state.cameraImage = null;
    },

  },
});

export const {setCameraImage, resetCameraImage} = cameraSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCameraImage = (state) => state.camera.cameraImage;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default cameraSlice.reducer;
