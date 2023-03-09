import React, { useContext, useState } from 'react';
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

    const [open, setOpen] = useState(false);

    const classes = classNames('sub-menu', className, {
        // [`submenu-active`]: isActive
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!open)
    }

    const renderChildren = () => {
        const subMenuListClasses = classNames('sub-menu-list', {
            'sub-menu-open': open
        })
        const childrenComponent =  React.Children.map(children, (child, index) => {
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
        return (
            <ul className={subMenuListClasses}>{childrenComponent}</ul>
        )
    }

    return (
        <li className={classes}>
            <div className='sub-menu-title' onClick={handleClick}>{title}</div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;