import { DashboardItem } from 'entities/dashboard-item/DashboardItem';
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import { initData, trackerSelector, viewSelector } from 'shared/tracker/model';
import { idSelector } from 'shared/viewer/model';
import { query, collection, getDocs, where, addDoc } from 'firebase/firestore';
import { db } from 'shared/config/firebase';

export const Dashboard = () => {
	const data = useAppSelector(trackerSelector);
	const view = useAppSelector(viewSelector);
	const id = useAppSelector(idSelector);
	const dispatch = useAppDispatch();

	const memoizedId = useMemo(() => id, [id]);

	useEffect(() => {
		if (memoizedId) {
			dispatch(initData(memoizedId));
			console.log(memoizedId);
		}
		// f();
	}, [dispatch, memoizedId]);

	const f = async () => {
		data?.forEach((item) => {
			addDoc(collection(db, 'initialData'), item);
		});
	};

	const items = data?.map((item) => (
		<DashboardItem
			key={item.title}
			color={item.color}
			title={item.title}
			img={`/assets/${item.img}`}
			timeframes={item.timeframes}
			view={view}
		/>
	));
	return <>{items}</>;
};
