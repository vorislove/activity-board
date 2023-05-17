import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, PayLoad } from './types';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from 'shared/config/firebase';

const initialState: AuthState = {
	displayName: undefined,
	_id: undefined,
	email: undefined,
	photoURL: undefined,
	authenticated: undefined,
	error: undefined
};

const provider = new GoogleAuthProvider();

export const login = createAsyncThunk<AuthState, PayLoad>('login', async (req, thunkApi) => {
	try {
		if (req.displayName === null) {
			const res = await signInWithPopup(auth, provider);
			const _id = res.user.uid;
			const displayName = res.user?.displayName;
			const email = res.user?.email;
			const photoURL = res.user?.photoURL;
			const q = await query(collection(db, 'users'), where('_id', '==', _id));
			const querySnapshot = await getDocs(q);
			if (querySnapshot.size === 0) {
				await addDoc(collection(db, 'users'), { displayName, email, photoURL, _id });
			}
			return { displayName, email, photoURL, _id } as PayLoad;
		} else {
			const displayName = req.displayName;
			const email = req.email;
			const photoURL = req.photoURL;
			const _id = req._id;
			return { displayName, email, photoURL, _id } as PayLoad;
		}
	} catch (error) {
		return thunkApi.rejectWithValue({ error });
	}
});

export const logout = createAsyncThunk('logout', async (_, thunkApi) => {
	try {
		await signOut(auth);
	} catch (error) {
		return thunkApi.rejectWithValue({ error });
	}
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.displayName = action.payload.displayName;
			state.email = action.payload.email;
			state._id = action.payload._id;
			state.photoURL = action.payload.photoURL;
			state.authenticated = true;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.error = action.error;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.authenticated = false;
			state.displayName = initialState.displayName;
			state.email = initialState.email;
			state.photoURL = initialState.photoURL;
			state._id = initialState._id;
		});
		builder.addCase(logout.rejected, (state, action) => {
			state.error = action.error;
		});
	}
});
