import { FC, ReactNode, memo } from 'react';
import { useMount } from 'shared/hooks';
import { Portal } from 'shared/ui';
import { Layout } from 'entities/modal/layout/Layout';
import { ANIMATION_TIME } from 'shared/constants';

type TModal = {
	isOpen: boolean;
	onClose: () => void;
	children?: ReactNode;
};

export const Modal: FC<TModal> = memo(({ isOpen, onClose, children }) => {
	const { mounted } = useMount(isOpen, ANIMATION_TIME);

	if (!mounted) {
		return null;
	}

	return (
		<Portal>
			<Layout isOpen={isOpen} onClose={onClose}>
				{children}
			</Layout>
		</Portal>
	);
});
