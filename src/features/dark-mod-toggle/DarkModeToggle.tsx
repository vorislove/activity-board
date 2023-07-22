import { Theme, useColorScheme } from 'entities/theme';
import clsx from 'clsx';
import './DarkModeToggle.scss';

export function DarkModeToggle() {
	const { theme, handleChangeTheme } = useColorScheme();

	return (
		<div className="theme-toggle">
			<div
				className={clsx(
					{
						active: theme === Theme.AUTO
					},
					'theme-toggle__item'
				)}
				onClick={() => handleChangeTheme(Theme.AUTO)}
			>
				Авто
			</div>
			<div
				className={clsx(
					{
						active: theme === Theme.LIGHT
					},
					'theme-toggle__item'
				)}
				onClick={() => handleChangeTheme(Theme.LIGHT)}
			>
				Светлая
			</div>
			<div
				className={clsx(
					{
						active: theme === Theme.DARK
					},
					'theme-toggle__item'
				)}
				onClick={() => handleChangeTheme(Theme.DARK)}
			>
				Тёмная
			</div>
		</div>
	);
}
