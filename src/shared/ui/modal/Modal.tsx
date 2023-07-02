import { FC, useRef } from 'react';
import './Modal.scss';

import { CSSTransition } from 'react-transition-group';

interface IModal {
	isOpen: boolean;
	onClose: () => void;
	children?: any;
}

export const Modal: FC<IModal> = ({ isOpen = false, onClose, children }) => {
	const modalRef = useRef(null);

	return (
		<>
			<CSSTransition
				in={isOpen}
				timeout={300}
				classNames={'modal'}
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
