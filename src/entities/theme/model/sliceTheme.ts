import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITheme, Theme } from 'entities/theme/model/types';

const initialState: ITheme = {
	theme: Theme.AUTO
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
		}
	}
});

export const { setTheme } = themeSlice.actions;
