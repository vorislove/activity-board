import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { themeSlice } from 'entities/theme/model/sliceTheme';
import { dataSlice } from 'entities/tracker';
import { authSlice } from 'entities/user';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		data: dataSlice.reducer,
		theme: themeSlice.reducer
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
