import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'


interface SubMenuProps {
    title: string,
    children?: any,
    className?: string,
    style?: React.CSSProperties
}

const SubMenu: React.FC<SubMenuProps> = props => {
    // const { selectedKeys } = useContext(MenuContext);
    const { title, className, children } = props;


    const classes = classNames('sub-menu', className, {
        // [`submenu-active`]: isActive
    })

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.error('SubMenu has a child which is not a MenuItem')
            }
        })
    }

    return (
        <div className={classes}>
            <div className='sub-menu-title'>{title}</div>
            <ul className='sub-menu-list'>
                {
                    renderChildren()
                }
            </ul>
        </div>
    )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;