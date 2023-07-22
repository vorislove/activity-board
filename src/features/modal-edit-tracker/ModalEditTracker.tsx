import { Modal } from 'entities/modal';
import { FC, useCallback, useMemo, useState } from 'react';
import { Button } from 'shared/ui';
import Picker from 'emoji-picker-react';
import { HexColorPicker } from 'react-colorful';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { deleteTracker, updateData } from 'entities/tracker';
import { themeColorSelector } from 'entities/theme';
import { TTab, Tabs } from 'entities/tabs';
import './ModalEditTracker.scss';

type TModalEdit = {
	isOpen: boolean;
	onClose: () => void;
	id: string;
	img: string;
	color: string;
	title: string;
};

export const ModalEditTracker: FC<TModalEdit> = ({ isOpen, id, onClose, title, color, img }) => {
	const dispatch = useAppDispatch();
	const [emoji, setEmoji] = useState(img);
	const [titleValue, setTitlevalue] = useState(title);
	const [colorView, setColorView] = useState(color);
	const theme = useAppSelector(themeColorSelector);

	const deleteHandler = useCallback(() => {
		onClose();
		dispatch(deleteTracker(id));
	}, [id]);

	const subbmitTitle = useCallback(() => {
		dispatch(updateData({ title: titleValue, color: colorView, img: emoji, id }));
		onClose();
	}, [dispatch, titleValue, colorView, emoji, id]);

	const tabs: TTab[] = useMemo(
		() => [
			{
				id: 0,
				title: 'Иконка',
				content: (
					<Picker
						onEmojiClick={(emoji) => {
							setEmoji(emoji.emoji);
						}}
						theme={theme}
						autoFocusSearch={false}
					/>
				)
			},
			{
				id: 1,
				title: 'Цвет',
				content: <HexColorPicker color={colorView} onChange={setColorView} />
			}
		],
		[colorView, emoji]
	);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="modal-header">
				<span className="title">{title}</span>
				<div>
					<Button mode="icon-dynamic" icon="trash" onClick={deleteHandler} />
					<div className="color" style={{ backgroundColor: `${colorView}` }}>
						<span className="emoji">{emoji}</span>
					</div>
					<Button mode="icon-dynamic" icon="x" onClick={onClose} />
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
	);
};
