import useDeviceType from 'shared/hooks/useTypeDevices';
import { Skeleton } from 'shared/ui';

export const TrackerListSkeltons = () => {
	const skeletons = new Array(6).fill(null);
	const typeDevice = useDeviceType();
	const height = typeDevice === 'mobile' ? '159px' : '186px';

	return (
		<>
			{skeletons.map((_, index) => (
				<Skeleton height={height} key={index} />
			))}
		</>
	);
};
