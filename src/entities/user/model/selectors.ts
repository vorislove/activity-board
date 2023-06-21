import { createSelector } from 'reselect';
import { RootState } from 'app/store/store';
import { AuthState } from './types';

export const authSelector: (state: RootState) => AuthState = (state: RootState) => state.auth;

export const displayNameSelector = createSelector(authSelector, (auth) => {
	return auth.displayName;
});

export const emailSelector = createSelector(authSelector, (auth) => {
	return auth.email;
});

export const isUserAuthenticatedSelector = createSelector(authSelector, (auth) => {
	return auth.authenticated;
});

export const idSelector = createSelector(authSelector, (auth) => {
	return auth._id;
});

export const photoSelector = createSelector(authSelector, (auth) => {
	return auth.photoURL;
});

export const errorSelector = createSelector(authSelector, (auth) => {
	return auth.error;
});
