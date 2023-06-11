import { UserCard } from 'entities';
import { displayNameSelector, photoSelector } from 'shared/viewer';
import { useAppSelector, useAppDispatch } from 'shared/hooks/hooks';
import { ViewType, setView, viewSelector } from 'shared/tracker';
import './User.scss';

export const User = () => {
	const photo = useAppSelector(photoSelector);
	const name = useAppSelector(displayNameSelector);
	const dispatch = useAppDispatch();
	const view = useAppSelector(viewSelector);

	const viewHandler = (view: ViewType['view']) => {
		dispatch(setView(view));
	};

	return (
		<UserCard photo={photo ? photo : ''} name={name ? name : ''}>
			<div className="view-selector">
				<div
					className={`view-selector__item ${view === 'hours' ? 'view-selector__item--active' : ''}`}
					onClick={() => viewHandler('hours')}
				>
					Часы
				</div>
				<div
					className={`view-selector__item ${view === 'daily' ? 'view-selector__item--active' : ''}`}
					onClick={() => viewHandler('daily')}
				>
					Дни
				</div>
				<div
					className={`view-selector__item ${
						view === 'weekly' ? 'view-selector__item--active' : ''
					}`}
					onClick={() => viewHandler('weekly')}
				>
					Недели
				</div>
				<div
					className={`view-selector__item ${
						view === 'monthly' ? 'view-selector__item--active' : ''
					}`}
					onClick={() => viewHandler('monthly')}
				>
					Месяцы
				</div>
			</div>
		</UserCard>
	);
};
