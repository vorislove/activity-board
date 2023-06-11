import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'shared/hooks';
import { themeValueSelector } from 'shared/theme-slice';

export const withTheme = (component: () => React.ReactNode) => {
	const theme = useAppSelector(themeValueSelector);

	useEffect(() => {
		const body = document.body;
		body.classList.remove('light-theme', 'dark-theme');
		body.classList.add(`${theme}-theme`);
	}, [theme]);

	return <div>{component()}</div>;
};
