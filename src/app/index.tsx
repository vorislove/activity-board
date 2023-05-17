import { withProviders } from './providers';
import { Routing } from '../pages';

import './index.scss';

function App() {
	return (
		<div className="App">
			<Routing />
		</div>
	);
}

export default withProviders(App);
