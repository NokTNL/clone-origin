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

const rootReducer = (
  state = { timeNow: Date.now(), isDataLoaded: false },
  action
) => {
  switch (action.type) {
    case "tickTimer":
      return { ...state, timeNow: Date.now() };
    case "CONFIRM_DATA_LOADED":
      return { ...state, isDataLoaded: true };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
