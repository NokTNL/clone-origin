import { createStore } from "@reduxjs/toolkit";

/* import exampleSlice from "./exampleSlice";

const store = configureStore({
  reducer: {
    example: exampleSlice.reducer,
  },
});

export const actions = {
  example: exampleSlice.actions,
}; */

const countdownReducer = (state = { timeNow: Date.now() }, action) => {
  switch (action.type) {
    case "tick":
      return { ...state, timeNow: Date.now() };
    default:
      return state;
  }
};

const store = createStore(countdownReducer);

export default store;
