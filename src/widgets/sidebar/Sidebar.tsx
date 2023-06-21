import { DarkModeToggle, User } from 'features';

import './Sidebar.scss';

export function Sidebar() {
	return (
		<div className="sidebar">
			<User />
			<DarkModeToggle />
		</div>
	);
}
