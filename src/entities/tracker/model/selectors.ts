import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store/store';
import { DataState } from './types';

export const dataSelector: (state: RootState) => DataState = (state: RootState) => state.data;

export const trackerSelector = createSelector(dataSelector, (data) => {
	return data.userData;
});

export const errorSelector = createSelector(dataSelector, (data) => {
	return data.error;
});

export const isLoadingSelector = createSelector(dataSelector, (data) => {
	return data.isLoading;
});

export const isLoadingAddSelector = createSelector(dataSelector, (data) => {
	return data.isLoadingAdd;
});

export const viewSelector = createSelector(dataSelector, (data) => {
	return data.view;
});
