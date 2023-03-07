import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu'

export interface MenuItemProps {
	index?: string,
	disabled?: boolean,
	className?: string,
	children?: React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = props => {
	const { selectedKeys, onSelect } = useContext(MenuContext);
	const { index, className, disabled, children } = props;

	const isActive = selectedKeys && selectedKeys.indexOf(index as string) > -1 ? true : false;

	const classes = classNames('menu-item', className, {
		[`menu-item-disabled`]: disabled,
		[`menu-item-active`]: isActive
	})

	const handleClick = () => {
		if (onSelect) {
			onSelect(index as string)
		}
	}

	return (
		<li key={index} className={classes} onClick={handleClick}>{children}</li>
	)
}

MenuItem.defaultProps = {
	disabled: false
}
MenuItem.displayName = 'MenuItem';
export default MenuItem