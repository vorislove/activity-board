import { useEffect, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { setTheme } from './model/sliceTheme';
import { themeColorSelector } from './model/selectors';
import { Theme } from './model/types';

export function useColorScheme() {
	const dispatch = useAppDispatch();
	const theme = useAppSelector(themeColorSelector);

	const savedTheme = useMemo(() => {
		const theme = localStorage.getItem('theme') as Theme;
		return theme;
	}, []);

	const isDarkMode = useMediaQuery({
		query: '(prefers-color-scheme: dark)'
	});

	const handleChangeTheme = (value: Theme) => {
		dispatch(setTheme(value));
		localStorage.setItem('theme', value);
	};

	useEffect(() => {
		if (savedTheme !== theme) {
			dispatch(setTheme(savedTheme));
		}
	}, []);

	useEffect(() => {
		const changeTheme = () => {
			if (isDarkMode) {
				document.documentElement.setAttribute('data-theme', Theme.DARK);
			} else if (!isDarkMode) {
				document.documentElement.setAttribute('data-theme', Theme.LIGHT);
			}
		};

		switch (theme) {
			case Theme.AUTO:
				changeTheme();
				break;
			case Theme.DARK:
				document.documentElement.setAttribute('data-theme', Theme.DARK);
				break;
			case Theme.LIGHT:
				document.documentElement.setAttribute('data-theme', Theme.LIGHT);
				break;
		}
	}, [theme, isDarkMode]);

	return { theme, handleChangeTheme, savedTheme };
}
