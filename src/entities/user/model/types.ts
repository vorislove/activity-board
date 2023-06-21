import { SerializedError } from '@reduxjs/toolkit';

export interface AuthState {
	displayName?: string | null;
	_id?: string | null;
	email?: string | null;
	photoURL?: string | null;
	authenticated?: boolean;
	error?: SerializedError;
}

export interface PayLoad {
	displayName?: string | null;
	email?: string | null;
	_id?: string | null;
	photoURL?: string | null;
}
