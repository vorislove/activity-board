import React, { FC, useRef } from 'react';
import clsx from 'clsx';
import './Modal.scss';
import { Button } from 'shared/ui/button';
import { CSSTransition } from 'react-transition-group';

interface IModal {
	isOpen: boolean;
	onClose: () => void;
	children?: any;
}

export const Modal: FC<IModal> = ({ isOpen = false, onClose, children }) => {
	const modalRef = useRef(null);
	// if (!isOpen) {
	// 	return null;
	// }

	return (
		<>
			<CSSTransition
				in={isOpen}
				timeout={300}
				classNames={'modal__content'}
				unmountOnExit
				nodeRef={modalRef}
			>
				<div className="modal">
					<div className="modal__overlay" onClick={onClose}></div>
					<div className="modal__content" ref={modalRef}>
						{children}
					</div>
				</div>
			</CSSTransition>
		</>
	);
};
