import { User } from 'features';
import './index.scss';
import { Dashboard } from 'widgets';

const HomePage = () => {
	return (
		<div className="dashboard">
			<div className="content">
				<User />
				<Dashboard />
			</div>
		</div>
	);
};

export default HomePage;
