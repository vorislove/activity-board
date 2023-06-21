import React from 'react';
import './Toggle.scss';

type ToggleProps = {
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	icons: {
		checked: string;
		unchecked: string;
	};
	'aria-label': string;
};
export const Toggle: React.FC<ToggleProps> = ({
	checked,
	onChange,
	icons,
	'aria-label': ariaLabel
}) => {
	return (
		<label>
			<input type="checkbox" checked={checked} onChange={onChange} aria-label={ariaLabel} />
			<span>{checked ? icons.checked : icons.unchecked}</span>
		</label>
	);
};
