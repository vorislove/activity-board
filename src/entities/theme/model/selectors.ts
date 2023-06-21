import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store/store';
import { ITheme } from 'entities/theme/model/types';

export const themeSelector: (state: RootState) => ITheme = (state: RootState) => state.theme;

// export const isDarkSelector = createSelector(themeSelector, (theme) => {
// 	return theme.isDark;
// });

export const themeColorSelector = createSelector(themeSelector, (theme) => {
	return theme.theme;
});
