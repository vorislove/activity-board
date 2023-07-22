import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Card } from 'shared/ui';
import { Button } from 'shared/ui';
import {
	DataState,
	Timeframes,
	deleteTracker,
	setPrevious,
	updateTime,
	pauseTracker,
	startTrackerTime
} from 'entities/tracker';
import useAmountOfTime from 'shared/hooks/useAmountOfTime';
import { useAppDispatch } from 'shared/hooks/hooks';
import useTimer from 'shared/hooks/useTimer';
import { ModalEditTracker } from 'features/modal-edit-tracker';

import './DashboardItem.scss';

interface IDashboardItem {
	id: string;
	color: string;
	title: string;
	timeframes: Timeframes;
	view?: DataState['view'];
	img?: string;
	onClick?: () => void;
}
export const DashboardItem: FC<IDashboardItem> = ({
	id,
	color,
	title,
	timeframes,
	img = '',
	view = 'weekly',
	onClick = () => {}
}) => {
	const dispatch = useAppDispatch();
	const { previous, start, paused } = timeframes;
	const amountOfTime = useAmountOfTime(previous, view);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const timer = useTimer(start, paused);
	const { time, formatTime, startTimer, stopTimer, isRunning, pauseTimer } = timer;

	const startHandler = useCallback(() => {
		startTimer();
		dispatch(startTrackerTime(id));
	}, [startTimer, dispatch, id]);

	const stopHandler = useCallback(() => {
		dispatch(updateTime({ time, id }));
		stopTimer();
	}, [time, isRunning, dispatch, id, stopTimer]);

	const pauseHandler = useCallback(() => {
		dispatch(pauseTracker(id));
		pauseTimer();
		if (time !== 0) dispatch(setPrevious({ id }));
	}, [time, dispatch, id, pauseTimer]);

	const viewNames = useMemo(
		() => ({
			hours: 'Часов',
			daily: 'Дней',
			weekly: 'Недель',
			minutes: 'Минут'
		}),
		[]
	);

	const handleOpenModal = useCallback(() => {
		setIsOpenModal(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setIsOpenModal(false);
	}, []);

	useEffect(() => {
		if (start !== 0 && paused === 0) {
			startTimer();
		}
	}, []);

	return (
		<Card>
			<div className="dashboard-item" style={{ backgroundColor: color }}>
				<div className="dashboard-item__menu">
					<Button mode="icon" icon="pencil" onClick={handleOpenModal} />
					<span className="emoji">{img}</span>
				</div>
				<ModalEditTracker
					id={id}
					title={title}
					isOpen={isOpenModal}
					onClose={handleCloseModal}
					img={img}
					color={color}
				/>
				<article className="tracking-card">
					<header className="tracking-card__header">
						<h4 className="tracking-card__title">{title}</h4>
						<div className="tracking-card__buttons">
							{!isRunning && (
								<Button icon="player-play" mode="icon-dynamic" onClick={startHandler} />
							)}
							{isRunning && (
								<Button icon="player-pause" mode="icon-dynamic" onClick={pauseHandler} />
							)}
							<Button icon="player-stop" mode="icon-dynamic" onClick={stopHandler} />
						</div>
					</header>
					<div className="tracking-card__body">
						<div className="tracking-card__time">{formatTime(time)}</div>
						<div className="tracking-card__prev-previous">
							{viewNames[view]} - {amountOfTime}
						</div>
					</div>
				</article>
			</div>
		</Card>
	);
};
