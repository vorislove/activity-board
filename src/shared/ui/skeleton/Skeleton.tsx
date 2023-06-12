import clsx from 'clsx';
import { FC } from 'react';
import './Skeleton.scss';

interface ISkeleton {
	width?: string;
	height?: string;
	cirlce?: boolean;
}

export const Skeleton: FC<ISkeleton> = ({ width = '100%', height = '20px', cirlce = false }) => {
	return (
		<div
			className={clsx(
				{
					cirlce: cirlce === true
				},
				'skeleton pulse'
			)}
			style={{ width: `${width}`, height: `${height}` }}
		></div>
	);
};
