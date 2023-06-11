import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { themeSlice } from 'shared/theme-slice/sliceTheme';
import { dataSlice } from 'shared/tracker';
import { authSlice } from 'shared/viewer';

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
