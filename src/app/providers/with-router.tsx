import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Loader } from 'shared/ui/Loader';

export const withRouter = (component: () => React.ReactNode) => () =>
	(
		<BrowserRouter>
			<Suspense
				fallback={
					<div style={{ minWidth: '100vw', minHeight: '100vh', margin: '0 auto' }}>
						<Loader />
					</div>
				}
			>
				{component()}
			</Suspense>
		</BrowserRouter>
	);
