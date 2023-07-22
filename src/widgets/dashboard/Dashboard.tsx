import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import { initData, isLoadingSelector, trackerSelector, viewSelector } from 'entities/tracker';
import { idSelector } from 'entities/user';
import { DashboardItem } from 'features';
import { TrackerListSkeltons } from 'entities/skeletons';

export const Dashboard = () => {
	const data = useAppSelector(trackerSelector);
	const view = useAppSelector(viewSelector);
	const id = useAppSelector(idSelector);
	const loading = useAppSelector(isLoadingSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			dispatch(initData(id));
		}
	}, []);

	const items = data?.map((item) => {
		if (item.dataId) {
			return (
				<DashboardItem
					key={item.dataId}
					color={item.color}
					title={item.title}
					img={item.img}
					timeframes={item.timeframes}
					view={view}
					id={item.dataId}
				/>
			);
		}
		return null;
	});
	return <>{loading ? <TrackerListSkeltons /> : items}</>;
};
