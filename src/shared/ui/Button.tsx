import React, { FC } from 'react';
import Icon from './Icon';
import { ReactNode } from 'react';
import clsx from 'clsx';
import './Button.scss';

interface IButton {
	title?: string;
	icon?: string;
	type?: 'submit' | 'button' | 'reset';
	mode?: 'light' | 'base' | 'icon' | 'icon-dark' | 'text' | 'light-text';
	disabled?: boolean;
	bl?: 'button' | 'link';
	url?: string;
	onClick: () => void;
}

export const Button: FC<IButton> = ({
	title = '',
	icon,
	onClick,
	type = 'button',
	mode = 'base',
	disabled = false,
	bl = 'button',
	url = ''
}) => {
	const styles = clsx({
		btn: bl === 'button',
		link: bl === 'link',
		mode__light: mode === 'light',
		mode__color: mode === 'base',
		mode__icon: mode === 'icon',
		mode__icon__dark: mode === 'icon-dark',
		mode__text: mode === 'text',
		mode__text__light: mode === 'light-text'
	});

	if (bl === 'link') {
		return (
			<a href={url} className={styles} onClick={onClick}>
				<div className="button__title">{title}</div>
			</a>
		);
	} else {
		return (
			<button className={styles} onClick={onClick} type={type} disabled={disabled}>
				{icon ? (
					<div className="btn__icon">
						<Icon name={icon} />
					</div>
				) : null}
				<div className="btn__title">{title}</div>
			</button>
		);
	}
};
