import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Data, DataPayLoad, DataState, PayLoad, Timeframes, ViewType } from './types';
import {
	query,
	collection,
	getDocs,
	where,
	addDoc,
	getDoc,
	doc,
	updateDoc
} from 'firebase/firestore';
import { db } from 'shared/config/firebase';

export const initialState: DataState = {
	userData: undefined,
	isLoading: false,
	view: 'hours',
	error: undefined
};
export const initData = createAsyncThunk<Data[], string>('data/initData', async (id, thunkAPI) => {
	try {
		const userData: Data[] = [];
		const q = await query(collection(db, 'data'), where('uid', '==', id));
		const queryAllSnap = await getDocs(q);
		if (queryAllSnap.size === 0) {
			const querySnapshot = await getDocs(collection(db, 'initialData'));
			const promises = querySnapshot.docs.map(async (document) => {
				const data = document.data() as DataPayLoad;
				const newData = { ...data, uid: id };
				const docRef = await addDoc(collection(db, 'data'), newData);
				const docSnap = await getDoc(docRef);
				await updateDoc(doc(db, 'data', docSnap.id), { dataId: docSnap.id });
				userData.push({ ...newData, dataId: docSnap.id });
			});
			await Promise.all(promises);
			return userData;
		} else {
			queryAllSnap.forEach((document) => {
				const data = document.data() as Data;
				userData.push(data);
			});
			return userData;
		}
	} catch (error) {
		throw thunkAPI.rejectWithValue({ error });
	}
});

export const updateTime = createAsyncThunk<Data[], { time: number; id: string }>(
	'data/updateTime',
	async ({ time, id }, { getState, rejectWithValue }) => {
		try {
			const state = getState() as { data: DataState };
			const userData = state.data?.userData || [];
			const index = userData.findIndex((item) => item.dataId === id);
			if (index === -1) throw new Error(`Документ с id ${id} не найден`);
			const { timeframes } = userData[index];
			let newTimeframes = { ...timeframes };
			if (time !== 0) {
				newTimeframes = {
					...timeframes,
					previous: timeframes.previous + (Date.now() - timeframes.start),
					start: 0
				};
			}
			const newData = [
				...userData.slice(0, index),
				{ ...userData[index], timeframes: newTimeframes },
				...userData.slice(index + 1)
			];
			const docRef = doc(collection(db, 'data'), id);
			await updateDoc(docRef, { ...newData[index] });
			return newData;
		} catch (e) {
			throw rejectWithValue({ e });
		}
	}
);

export const updateData = createAsyncThunk<
	Data[],
	{ title: string; color: string; img: string; id: string }
>('data/updateData', async ({ title, color, img, id }, { getState, rejectWithValue }) => {
	try {
		const state = getState() as { data: DataState };
		const userData = state.data?.userData || [];
		const index = userData.findIndex((item) => item.dataId === id);
		if (index === -1) throw new Error(`Документ с id ${id} не найден`);
		const newData = [
			...userData.slice(0, index),
			{ ...userData[index], img, color, title },
			...userData.slice(index + 1)
		];
		const docRef = doc(collection(db, 'data'), id);
		await updateDoc(docRef, { ...newData[index] });
		return newData;
	} catch (e) {
		throw rejectWithValue({ e });
	}
});

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setView: (state, action: PayloadAction<ViewType['view']>) => {
			state.view = action.payload;
		},
		setPrevious: (state, action: PayloadAction<{ id: string }>) => {
			const index = state.userData?.findIndex((item) => item.dataId === action.payload.id);
			if (index !== undefined && index !== -1 && state.userData) {
				const now = Date.now();
				state.userData[index].timeframes.start = now;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(initData.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(initData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.userData = action.payload;
		});
		builder.addCase(initData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error;
		});
		builder.addCase(updateTime.fulfilled, (state, action) => {
			state.userData = action.payload;
		});
		builder.addCase(updateTime.rejected, (state, action) => {
			state.error = action.error;
		});
		builder.addCase(updateData.fulfilled, (state, action) => {
			state.userData = action.payload;
		});
		builder.addCase(updateData.rejected, (state, action) => {
			state.error = action.error;
		});
	}
});
export const { setView, setPrevious } = dataSlice.actions;
