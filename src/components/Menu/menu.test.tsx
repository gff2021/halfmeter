import React from 'react';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

const defaultMenuProps: MenuProps = {
    defaultSelectedKeys: '1',
    onSelect: jest.fn(),
    className: 'test',
}

// const verticalMenuProps: MenuProps = {
//     mode: 'vertical',
//     defaultSelectedKeys: '1',
// }

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem index='1'>Active</MenuItem>
            <MenuItem index='2' disabled>Disabled</MenuItem>
            <MenuItem index='3'>Primary</MenuItem>
        </Menu>
    )
}

let menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
    test('should render correct Menu and MenuItem based on default props', () => {
        render(generateMenu(defaultMenuProps))
        menuElement = screen.getByTestId('test-menu')
        activeElement = screen.getByText('Active');
        disabledElement = screen.getByText('Disabled');
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('menu test')
        expect(activeElement).toHaveClass('menu-item menu-item-active')
        expect(disabledElement).toHaveClass('menu-item menu-item-disabled')
    })

    test('click item should change active and call the right callback', async () => {
        render(generateMenu(defaultMenuProps))
        const primaryItem = screen.getByText('Primary');
        await userEvent.click(primaryItem)
        expect(defaultMenuProps.onSelect).toHaveBeenCalled();
    })
})