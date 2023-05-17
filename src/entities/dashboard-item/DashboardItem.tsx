import { FC } from 'react';
import './DashboardItem.scss';
import { Card } from 'shared/ui/Card';
import { Button } from 'shared/ui/Button';
import { Timeframes } from 'shared/tracker/model';

interface IDashboardItem {
	color: string;
	title: string;
	timeframes: Timeframes;
	view?: 'daily' | 'weekly' | 'monthly';
	img: string;
}

export const DashboardItem: FC<IDashboardItem> = ({
	color,
	title,
	timeframes,
	img,
	view = 'weekly'
}) => {
	const { current, previous } = timeframes[view];

	return (
		<Card>
			<div
				className="dashboard__item"
				style={{ backgroundColor: color, backgroundImage: `url(${img})` }}
			>
				<article className="tracking-card">
					<header className="tracking-card__header">
						<h4 className="tracking-card__title">{title}</h4>
						<Button icon="dots" mode="icon" onClick={() => {}} />
					</header>
					<div className="tracking-card__body">
						<div className="tracking-card__time">{current}</div>
						<div className="tracking-card__prev-previous">
							{view} - {previous}hrs
						</div>
					</div>
				</article>
			</div>
		</Card>
	);
};
