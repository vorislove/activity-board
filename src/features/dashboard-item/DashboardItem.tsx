import { FC, useCallback, useMemo, useState } from 'react';
import { Card } from 'shared/ui';
import { Button } from 'shared/ui';
import { Timeframes, setPrevious, updateData, updateTime } from 'shared/tracker';
import useAmountOfTime from 'shared/hooks/useAmountOfTime';
import { useAppDispatch } from 'shared/hooks/hooks';
import useTimer from 'shared/hooks/useTimer';
import { Modal } from 'entities';
import EmojiPicker from 'emoji-picker-react';
import { HexColorPicker } from 'react-colorful';
import { ITab, Tabs } from 'entities';

import './DashboardItem.scss';

interface IDashboardItem {
	id: string;
	color: string;
	title: string;
	timeframes: Timeframes;
	view?: 'hours' | 'daily' | 'weekly' | 'monthly';
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
	const { previous, start } = timeframes;
	const amountOfTime = useAmountOfTime(previous, view);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const timer = useTimer();
	const { time, formatTime, startTimer, stopTimer, isRunning, pauseTimer } = timer;
	const [titleValue, setTitlevalue] = useState<string>(title);
	const [colorView, setColorView] = useState<string>(color);
	const [emoji, setEmoji] = useState<string>(img);

	const startHandler = useCallback(() => {
		startTimer();
		dispatch(setPrevious({ id }));
	}, [startTimer, dispatch, id]);

	const stopHandler = useCallback(() => {
		if (time !== 0 && isRunning) {
			dispatch(updateTime({ time, id }));
			stopTimer();
		} else if (time !== 0 && !isRunning && start === 0) {
			stopTimer();
		}
	}, [time, isRunning, start, dispatch, id, stopTimer]);

	const pauseHandler = useCallback(() => {
		dispatch(updateTime({ time, id }));
		pauseTimer();
		if (time !== 0) dispatch(setPrevious({ id }));
	}, [time, dispatch, id, pauseTimer]);

	const viewNames = useMemo(
		() => ({
			hours: 'Часов',
			daily: 'Дней',
			weekly: 'Недель',
			monthly: 'Месяцев'
		}),
		[]
	);

	const handleOpenModal = useCallback(() => {
		setIsOpenModal(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setIsOpenModal(false);
	}, []);

	const subbmitTitle = useCallback(() => {
		dispatch(updateData({ title: titleValue, color: colorView, img: emoji, id }));
		setIsOpenModal(false);
	}, [dispatch, titleValue, colorView, emoji, id]);

	const tabs: ITab[] = useMemo(
		() => [
			{
				id: 0,
				title: 'Иконка',
				content: (
					<EmojiPicker
						onEmojiClick={(emoji) => {
							setEmoji(emoji.emoji);
						}}
					/>
				)
			},
			{
				id: 1,
				title: 'Цвет',
				content: <HexColorPicker color={colorView} onChange={setColorView} />
			}
		],
		[colorView]
	);

	return (
		<Card>
			<div className="dashboard-item" style={{ backgroundColor: color }}>
				<div className="dashboard-item__menu">
					<Button mode="icon-dark" icon="pencil" onClick={handleOpenModal} />
					<span className="emoji">{img}</span>
				</div>

				<Modal isOpen={isOpenModal} onClose={handleCloseModal}>
					<div className="modal-header">
						<span className="title">{title}</span>
						<div>
							<div className="color" style={{ backgroundColor: `${colorView}` }}>
								<span className="emoji">{emoji}</span>
							</div>
							<Button mode="icon" icon="x" onClick={handleCloseModal} />
						</div>
					</div>
					<div className="rename">
						<input
							className="modal-input"
							value={titleValue}
							onChange={(e) => setTitlevalue(e.target.value)}
						/>
						<Button mode="base" title="Сохранить" onClick={subbmitTitle} />
					</div>
					<Tabs tabs={tabs} />
				</Modal>

				<article className="tracking-card">
					<header className="tracking-card__header">
						<h4 className="tracking-card__title">{title}</h4>
						<div className="tracking-card__buttons">
							{!isRunning && <Button icon="player-play" mode="icon" onClick={startHandler} />}
							{isRunning && <Button icon="player-pause" mode="icon" onClick={pauseHandler} />}
							<Button icon="player-stop" mode="icon" onClick={stopHandler} />
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
