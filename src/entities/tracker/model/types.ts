import { SerializedError } from '@reduxjs/toolkit';

export type Timeframes = {
	previous: number;
	start: number;
	paused: number;
};

export type Data = {
	title: string;
	timeframes: Timeframes;
	color: string;
	img: string;
	uid: string;
	dataId: string | null;
};

export type DataState = {
	userData?: Data[] | null;
	error?: SerializedError;
	isLoading: boolean;
	isLoadingAdd: boolean;
	view: 'minutes' | 'hours' | 'daily' | 'weekly';
};

export type DataPayLoad = {
	title: string;
	timeframes: Timeframes;
	color: string;
	img: string;
};

export type PayLoad = {
	userData?: Data[] | null;
};

export type ViewType = {
	view: DataState['view'];
};
