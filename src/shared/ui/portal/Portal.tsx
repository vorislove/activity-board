import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type TPortal = {
	children: React.ReactNode;
};

export const Portal: FC<TPortal> = ({ children }) => {
	const [container] = useState(() => document.createElement('div'));
	const root = document.querySelector('#root');

	useEffect(() => {
		root && root.appendChild(container);
		return () => {
			root && root.removeChild(container);
		};
	}, []);

	return ReactDOM.createPortal(children, container);
};
