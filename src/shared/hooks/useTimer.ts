import { useRef, useState, useMemo, useEffect, useCallback } from 'react';

type TTimer = (
	start: number,
	paused: number
) => {
	time: number;
	isRunning: boolean;
	formatTime: (time: number) => string;
	startTimer: () => void;
	pauseTimer: () => void;
	stopTimer: () => void;
};

export const useTimer: TTimer = function (start, paused) {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const intervalRef = useRef<any | null>(null);

	useMemo(() => {
		const time = Math.floor((Date.now() - start) / 1000);
		const timeInPaused = Math.floor((paused - start) / 1000);
		if (start !== 0 && paused === 0) {
			setTime(time);
		} else if (start !== 0 && paused !== 0) {
			setTime(timeInPaused);
		}
	}, []);

	const formatTime = (time: number) => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time - hours * 3600) / 60);
		const seconds = time - hours * 3600 - minutes * 60;

		const formattedHours = hours.toString().padStart(2, '0');
		const formattdMiuntes = minutes.toString().padStart(2, '0');
		const formattesSeconds = seconds.toString().padStart(2, '0');

		return `${formattedHours}:${formattdMiuntes}:${formattesSeconds}`;
	};

	function startTimer() {
		setIsRunning(true);

		intervalRef.current = setInterval(() => {
			setTime((prevTime) => prevTime + 1);
		}, 1000);
	}

	const pauseTimer = () => {
		setIsRunning(false);
		clearInterval(intervalRef.current);
	};

	const stopTimer = () => {
		setTime(0);
		setIsRunning(false);
		clearInterval(intervalRef.current);
	};

	useEffect(() => {
		return () => {
			clearInterval(intervalRef.current);
		};
	}, []);

	return {
		time,
		isRunning,
		formatTime,
		startTimer,
		pauseTimer,
		stopTimer
	};
};

export default useTimer;
