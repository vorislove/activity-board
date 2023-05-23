import { SerializedError } from '@reduxjs/toolkit';

export interface Timetracks {
	current: number;
	previous: number;
}

export interface Timeframes {
	daily: Timetracks;
	weekly: Timetracks;
	monthly: Timetracks;
}

export interface Data {
	title: string;
	timeframes: Timeframes;
	color: string;
	img: string;
	uid: string;
	dataId: string;
}

export interface DataPayLoad {
	title: string;
	timeframes: Timeframes;
	color: string;
	img: string;
}

export interface DataState {
	userData?: Data[] | null;
	error?: SerializedError;
	isLoading: boolean;
	view: 'daily' | 'weekly' | 'monthly';
}

export interface PayLoad {
	userData?: Data[] | null;
}

export interface ViewType {
	view: 'daily' | 'weekly' | 'monthly';
}
