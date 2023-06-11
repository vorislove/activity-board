import { FC } from 'react';
import './Card.scss';

interface ICard {
	className?: string;
	children: any;
}

export const Card: FC<ICard> = ({ children, className = '' }) => {
	return <div className={`card ${className}`}>{children}</div>;
};
