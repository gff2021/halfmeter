import React, { createContext } from 'react';
import classNames from 'classnames'
import MenuItem, { MenuItemProps } from './menuItem'

type MenuMode = 'vertical' | 'horizontal';
export type MenuItems = React.ReactElement<MenuItemProps> | React.ReactElement<MenuItemProps>[]
type SelectCallback = (key: React.Key) => void

export interface MenuProps {
	mode?: MenuMode,
	defaultSelectedKeys?: string | string[],
	className?: string,
	style?: React.CSSProperties,
	onSelect?: SelectCallback,
	children?: any,
}

interface IMenuContext {
	selectedKeys?: string | string[],
	onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContext>({});

const Menu: React.FC<MenuProps> = props => {
	const { mode, defaultSelectedKeys, style, className, onSelect, children } = props;

	const classes = classNames('menu', className, {
		[`menu-${mode}`]: true,
	})

	const menuContext = {
		selectedKeys: defaultSelectedKeys || undefined,
		onSelect: onSelect || undefined
	}

	const renderChildren = () => {
		return React.Children.map(children, (child, index) => {
			const childElement = child as React.FunctionComponentElement<MenuItemProps>;
			const { displayName } = childElement.type
			if (displayName === 'MenuItem' || displayName === 'SubMenu') {
				return React.cloneElement(childElement, {
					index: index.toString()
				})
			} else {
				console.error('Warning: Menu has a child which is not a MenuItem component.');
			}
		})
	}

	return (
		<ul style={style} className={classes} data-testid='test-menu'>
			<MenuContext.Provider value={menuContext}>
				{
					renderChildren()
				}
			</MenuContext.Provider>
		</ul>
	)
}

Menu.defaultProps = {
	mode: 'horizontal'
}

export const Item = MenuItem

export default Menu