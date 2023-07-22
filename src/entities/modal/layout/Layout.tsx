import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { ANIMATION_TIME } from 'shared/constants';
import { CSSTransition } from 'react-transition-group';

import './Layout.scss';

type TLayout = {
	children?: ReactNode;
	isOpen: boolean;
	onClose: () => void;
};

export const Layout: FC<TLayout> = ({ children, onClose, isOpen }) => {
	const overlayRef = useRef(null);
	const contentRef = useRef(null);

	const [animationIn, setAnimationIn] = useState(false);

	useEffect(() => {
		setAnimationIn(isOpen);
	}, [isOpen]);

	return (
		<div className="modal">
			<CSSTransition
				in={animationIn}
				timeout={ANIMATION_TIME}
				classNames={'modal__overlay'}
				mountOnEnter
				unmountOnExit
				nodeRef={overlayRef}
			>
				<div ref={overlayRef} className="modal__overlay" onClick={onClose}></div>
			</CSSTransition>

			<CSSTransition
				in={animationIn}
				timeout={ANIMATION_TIME}
				classNames={'modal__content'}
				mountOnEnter
				unmountOnExit
				nodeRef={contentRef}
			>
				<div ref={contentRef} className="modal__content">
					{children}
				</div>
			</CSSTransition>
		</div>
	);
};
