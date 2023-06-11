import { FC } from 'react';
import Icon from 'shared/ui/Icon/Icon';
import './Loader.scss';

interface ILoader {
	message?: string;
}

const Loader: FC<ILoader> = ({ message = '' }) => {
	return (
		<div className="wrapper-loader">
			<div className="loader">
				<Icon name="loader" />
			</div>
			{message ? <span className="message">{message}</span> : null}
		</div>
	);
};

export default Loader;
