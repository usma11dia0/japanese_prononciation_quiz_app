import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer } from "../redux/reducer";

export const store = configureStore({
  reducer: {
    reducer: reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
