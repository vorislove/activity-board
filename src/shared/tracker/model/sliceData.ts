import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Data, DataPayLoad, DataState, PayLoad, ViewType } from './types';
import { query, collection, getDocs, where, addDoc } from 'firebase/firestore';
import { db } from 'shared/config/firebase';

export const initialState: DataState = {
	userData: undefined,
	isLoading: false,
	view: 'weekly',
	error: undefined
};

export const initData = createAsyncThunk<Data[], string>('initData', async (id) => {
	try {
		const userData: Data[] = [];
		const q = await query(collection(db, 'data'), where('uid', '==', id));
		const queryAllSnap = await getDocs(q);
		if (queryAllSnap.size === 0) {
			const querySnapshot = await getDocs(collection(db, 'initialData'));
			querySnapshot.forEach((doc) => {
				const data = doc.data() as DataPayLoad;
				const newData: Data = { ...data, uid: id, dataId: doc.id };
				userData.push(newData);
				addDoc(collection(db, 'data'), newData);
			});
			return userData;
		} else {
			queryAllSnap.forEach((doc) => {
				const data = doc.data() as Data;
				userData.push(data);
			});
			return userData;
		}
	} catch (error) {
		throw error;
	}
});

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setView: (state, action: PayloadAction<ViewType['view']>) => {
			state.view = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(initData.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(initData.fulfilled, (state, action) => {
			state.isLoading = false;
			// state._id = action.payload._id;
			state.userData = action.payload;
		});
		builder.addCase(initData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error;
		});
	}
});

export const { setView } = dataSlice.actions;
