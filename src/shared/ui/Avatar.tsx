import { FC } from 'react';
import './Avatar.scss';

export const Avatar: FC<{ url: string }> = ({ url = '' }) => {
	return (
		<div className="avatar-container">
			<img className="avatar" src={url} alt="Avatar" />
		</div>
	);
};
