import React, { useRef, useState } from 'react';
import { updateTime } from '../../entities/tracker/model/sliceData';

export default function useTimer() {
	const [time, setTime] = useState<number>(0);
	const [isRunning, setIsRunning] = useState(false);
	const intervalRef = useRef<any | null>(null);

	const formatTime = (time: number) => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time - hours * 3600) / 60);
		const seconds = time - hours * 3600 - minutes * 60;

		const formattedHours = hours.toString().padStart(2, '0');
		const formattdMiuntes = minutes.toString().padStart(2, '0');
		const formattesSeconds = seconds.toString().padStart(2, '0');

		return `${formattedHours}:${formattdMiuntes}:${formattesSeconds}`;
	};

	const startTimer = () => {
		setIsRunning(true);
		intervalRef.current = setInterval(() => {
			setTime((prevTime) => {
				return prevTime + 1;
			});
		}, 1000);
	};

	const pauseTimer = () => {
		setIsRunning(false);
		clearInterval(intervalRef.current);
	};

	const stopTimer = () => {
		setIsRunning(false);
		clearInterval(intervalRef.current);
		setTime(0);
	};

	return {
		time,
		isRunning,
		formatTime,
		startTimer,
		pauseTimer,
		stopTimer
	};
}
