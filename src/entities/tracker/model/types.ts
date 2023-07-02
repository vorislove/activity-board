import { SerializedError } from '@reduxjs/toolkit';

export interface Timeframes {
	previous: number;
	start: number;
}

export interface Data {
	title: string;
	timeframes: Timeframes;
	color: string;
	img: string;
	uid: string;
	dataId: string | null;
}

export interface DataState {
	userData?: Data[] | null;
	error?: SerializedError;
	isLoading: boolean;
	isLoadingAdd: boolean;
	view: 'minutes' | 'hours' | 'daily' | 'weekly';
}

export interface DataPayLoad {
	title: string;
	timeframes: Timeframes;
	color: string;
	img: string;
}

export interface PayLoad {
	userData?: Data[] | null;
}

export interface ViewType {
	view: DataState['view'];
}
