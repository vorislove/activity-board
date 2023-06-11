import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import { Button } from 'shared/ui/button/Button';
import { Card } from 'shared/ui/Card';

import { isUserAuthenticatedSelector, PayLoad } from 'shared/viewer';
import { login } from 'shared/viewer';

import './Login.scss';

export const Login = () => {
	const dispatch = useAppDispatch();

	const loginHandler = () => {
		const userData = {
			displayName: null,
			email: null,
			photo: null
		};
		dispatch(login(userData));
	};

	return (
		<div className="wrapper">
			<Card>
				<div className="login">
					<div className="title">
						<h4>Авторизация</h4>
					</div>
					<div className="btns">
						<Button title="Войти через Google" icon="google-brand" onClick={loginHandler} />
					</div>
				</div>
			</Card>
		</div>
	);
};
