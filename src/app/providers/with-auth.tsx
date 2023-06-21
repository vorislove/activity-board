import react from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import { isUserAuthenticatedSelector, PayLoad } from 'entities/user';
import { useCallback, useEffect } from 'react';
import { login, logout } from 'entities/user';
import { browserLocalPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { auth } from 'shared/config/firebase';

export const withAuth = (component: () => React.ReactNode) => {
	const authenticated = useAppSelector(isUserAuthenticatedSelector);
	const dispatch = useAppDispatch();

	const refresh = useCallback(
		async ({ displayName, email, photoURL }: PayLoad) => {
			const userData = {
				displayName,
				email,
				photoURL
			};
			return dispatch(login(userData));
		},
		[dispatch]
	);

	useEffect(() => {
		const f = async () => {
			onAuthStateChanged(auth, async (user) => {
				if (user && !authenticated) {
					return await refresh({
						displayName: user.displayName,
						email: user.email,
						photoURL: user.photoURL
					});
				}
				if (!user && !authenticated) {
					dispatch(logout());
				}
			});
			await setPersistence(auth, browserLocalPersistence);
		};
		f();
	});

	return <div>{component()}</div>;
};
