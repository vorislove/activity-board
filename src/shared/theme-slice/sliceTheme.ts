import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITheme } from 'shared/theme-slice/types';

const initialState: ITheme = {
	theme: 'light',
	auto: false
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
			state.theme = action.payload;
		},
		setAuto: (state, action: PayloadAction<boolean>) => {
			state.auto = action.payload;
		}
	}
});
