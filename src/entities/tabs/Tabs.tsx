import { FC, useState } from 'react';
import './Tabs.scss';
import clsx from 'clsx';

export interface ITab {
	id: number;
	title: string;
	content: JSX.Element | React.ReactNode;
}

interface Tabs {
	tabs: ITab[];
}

export const Tabs: FC<Tabs> = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState<number>(0);

	const handleTabClick = (id: number) => {
		setActiveTab(id);
	};

	return (
		<div>
			<div className="tab">
				{tabs.map((tab) => (
					<span
						key={tab.id}
						className={clsx({
							active: activeTab === tab.id
						})}
						onClick={() => handleTabClick(tab.id)}
					>
						{tab.title}
					</span>
				))}
			</div>
			<div className="tab-content">
				{tabs.map((tab) => {
					if (activeTab !== tab.id) {
						return null;
					}
					return <div key={tab.id}>{tab.content}</div>;
				})}
			</div>
		</div>
	);
};
