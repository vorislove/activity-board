import { Dashboard } from 'widgets/dashboard';
import { Sidebar } from 'widgets/sidebar';

import './index.scss';

const HomePage = () => {
	return (
		<div className="dashboard">
			<Sidebar />
			<div className="content">
				<Dashboard />
			</div>
		</div>
	);
};

export default HomePage;
