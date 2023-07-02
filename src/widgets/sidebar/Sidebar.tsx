import { DarkModeToggle, User } from 'features';

import './Sidebar.scss';
import { AddNewTracker } from 'features/add-new-tracker-btn/addNewTracker';

export function Sidebar() {
	return (
		<div className="sidebar">
			<User />
			<AddNewTracker />
			<DarkModeToggle />
		</div>
	);
}
