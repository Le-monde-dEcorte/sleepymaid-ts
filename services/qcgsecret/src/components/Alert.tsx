import type { PropsWithChildren } from 'react';
import { VscFlame } from '@react-icons/all-files/vsc/VscFlame';
import { VscInfo } from '@react-icons/all-files/vsc/VscInfo';
import { VscWarning } from '@react-icons/all-files/vsc/VscWarning';
import '../styles/Alert.css';
import classnames from 'classnames';

export interface IAlert {
	title?: string | undefined;
	type: 'danger' | 'info' | 'success' | 'warning';
}

function resolveType(type: IAlert['type']) {
	switch (type) {
		case 'success':
			return {
				classNames: { 'alert-component-success': true },
				icon: <VscFlame size={20} />,
			};
		case 'danger':
			return {
				classNames: { 'alert-component-error': true },
				icon: <VscWarning size={20} />,
			};
		case 'info':
			return {
				classNames: { 'alert-component-info': true },
				icon: <VscInfo size={20} />,
			};
		case 'warning':
			return {
				classNames: { 'alert-component-warning': true },
				icon: <VscWarning size={20} />,
			};
	}
}

export default function Alert({ title, type, children }: PropsWithChildren<IAlert>) {
	const { classNames, icon } = resolveType(type);

	return (
		<div className="alert-component-ext">
			<div
				className={classnames({
					'alert-component-base': true,
					...classNames,
				})}
			>
				<div className="alert-component-middle">
					<div className="alert-component-aligned">
						<span className="alert-component-icon">{icon}</span>
						<span>{title && <h1>{title}</h1>}</span>
					</div>
				</div>
				<div className="alert-component-children">{children}</div>
			</div>
		</div>
	);
}
