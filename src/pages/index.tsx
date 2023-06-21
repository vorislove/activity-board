import { lazy, useCallback, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import { isUserAuthenticatedSelector, login, logout, PayLoad } from 'entities/user';
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { auth } from 'shared/config/firebase';

const AuthPage = lazy(() => import('./auth'));
const HomePage = lazy(() => import('./home'));

export const Routing = () => {
	const authenticated = useAppSelector(isUserAuthenticatedSelector);
	const dispatch = useAppDispatch();

	const refresh = useCallback(
		async ({ displayName, email, photoURL, _id }: PayLoad) => {
			const userData = {
				displayName,
				email,
				photoURL,
				_id
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
						photoURL: user.photoURL,
						_id: user.uid
					});
				}
				if (!user && !authenticated) {
					dispatch(logout());
				}
			});
			await setPersistence(auth, browserSessionPersistence);
		};
		f();
	});

	if (authenticated === undefined || authenticated === false) {
		return (
			<Routes>
				<Route path="/login" element={<AuthPage />} />
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		);
	} else {
		return (
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		);
	}
};
