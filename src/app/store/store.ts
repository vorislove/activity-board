import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { dataSlice } from 'shared/tracker/model';
import { authSlice } from 'shared/viewer/model';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		data: dataSlice.reducer
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
