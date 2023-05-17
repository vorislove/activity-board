import { FC } from 'react';

import './Icon.scss';

const Icon: FC<{ name: string }> = ({ name }) => {
	return <div className={`icon ti ti-${name}`}></div>;
};

export default Icon;
