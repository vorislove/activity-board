import { TrackerListSkeltons } from 'entities/skeltons';
import { DashboardItem } from 'features/dashboard-item/DashboardItem';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import { initData, isLoadingSelector, trackerSelector, viewSelector } from 'shared/tracker/model';
import { idSelector } from 'shared/viewer/model';

export const Dashboard = () => {
	const data = useAppSelector(trackerSelector);
	const view = useAppSelector(viewSelector);
	const id = useAppSelector(idSelector);
	const loading = useAppSelector(isLoadingSelector);
	const dispatch = useAppDispatch();

	const memoizedId = useMemo(() => id, [id]);

	useEffect(() => {
		if (memoizedId) {
			dispatch(initData(memoizedId));
			console.log(memoizedId);
		}
	}, [dispatch, memoizedId]);

	const items = data?.map((item) => (
		<DashboardItem
			key={item.dataId}
			color={item.color}
			title={item.title}
			img={item.img}
			timeframes={item.timeframes}
			view={view}
			id={item.dataId}
		/>
	));
	return <>{loading ? <TrackerListSkeltons /> : items}</>;
};
