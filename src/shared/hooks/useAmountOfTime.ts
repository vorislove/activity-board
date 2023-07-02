import { DataState } from 'entities/tracker';
import { useEffect, useState } from 'react';

type TimeType = DataState['view'];

function useAmountOfTime(time: number, type: TimeType): number {
	const [formattedTime, setFormattedTime] = useState<number>(0);
	useEffect(() => {
		if (typeof time !== 'number' || isNaN(time)) {
			console.error('Некорректное значение для времени');
			return;
		}
		if (type !== 'hours' && type !== 'daily' && type !== 'weekly' && type !== 'minutes') {
			console.error('Некорректное значение для типа');
			return;
		}

		const daysInMonth = (date: Date) =>
			new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

		const date = new Date(time * 1000);
		const hours = Math.floor(time / 3600 / 1000);
		const days = Math.floor(time / (1000 * 60 * 60 * 24));
		const weeks = Math.floor(days / 7);
		const minutes = Math.floor(time / (60 * 1000));

		let result = 0;

		switch (type) {
			case 'hours':
				result = hours;
				break;
			case 'daily':
				result = days;
				break;
			case 'weekly':
				result = weeks;
				break;
			case 'minutes':
				result = minutes;
				break;
			default:
				console.error('Неизвестный тип');
				break;
		}
		setFormattedTime(result);
	}, [time, type]);
	return formattedTime;
}
export default useAmountOfTime;
