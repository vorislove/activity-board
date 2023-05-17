import { useState, useEffect } from 'react';

const useDeviceType = (): string => {
	const [deviceType, setDeviceType] = useState<string>('desktop');

	useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 1024px)');

		const handleDeviceTypeChange = (e: MediaQueryListEvent | MediaQueryList) => {
			if (e.matches) {
				setDeviceType('desktop');
			} else {
				setDeviceType('mobile');
			}
		};

		handleDeviceTypeChange(mediaQuery);
		mediaQuery.addEventListener('change', handleDeviceTypeChange);

		return () => {
			mediaQuery.removeEventListener('change', handleDeviceTypeChange);
		};
	}, []);

	return deviceType;
};

export default useDeviceType;
