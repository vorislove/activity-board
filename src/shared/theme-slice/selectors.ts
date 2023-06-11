import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store/store';
import { ITheme } from 'shared/theme-slice/types';

export const themeSelector: (state: RootState) => ITheme = (state: RootState) => state.theme;

export const themeValueSelector = createSelector(themeSelector, (theme) => {
	return theme.theme;
});

export const themeAutoSelector = createSelector(themeSelector, (theme) => {
	return theme.auto;
});
