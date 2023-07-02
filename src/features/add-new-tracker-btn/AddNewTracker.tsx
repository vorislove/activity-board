import React from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { Button } from 'shared/ui';
import { addNewTracker as addTracker, isLoadingAddSelector } from 'entities/tracker';
import { idSelector } from 'entities/user';

export function AddNewTracker() {
	const dispatch = useAppDispatch();
	const uid = useAppSelector(idSelector);
	const isLoading = useAppSelector(isLoadingAddSelector);
	const addHandler = () => {
		if (!uid) return;
		dispatch(addTracker(uid));
	};

	return (
		<>
			<Button icon="plus" title="Добавить" onClick={addHandler} disabled={isLoading} />
		</>
	);
}
