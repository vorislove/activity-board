import { FC, ReactNode } from 'react';
import { Avatar } from 'shared/ui/avatar/Avatar';
import { useAppDispatch } from 'shared/hooks/hooks';
import { Card } from 'shared/ui/card/Card';
import { Button } from 'shared/ui/button/Button';
import { logout } from 'shared/viewer';
import './UserCard.scss';
import useDeviceType from 'shared/hooks/useTypeDevices';

export const UserCard: FC<{ children?: ReactNode; photo: string; name: string }> = ({
	children,
	photo,
	name
}) => {
	const dispatch = useAppDispatch();

	const typeDevice = useDeviceType();

	const btn =
		typeDevice === 'desktop' ? (
			<Button bl="link" mode="light-text" title="Выйти" onClick={() => dispatch(logout())} />
		) : (
			<Button icon="logout" mode="icon-dark" onClick={() => dispatch(logout())} />
		);

	return (
		<Card className="user-card">
			<div className="user">
				<div className="user-info">
					<>
						<Avatar url={photo ? photo : ''} />
						<span className="display-name">{name}</span>
					</>
				</div>
				{btn}
			</div>
			{children}
		</Card>
	);
};
