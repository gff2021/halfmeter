import React from 'react';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button, {ButtonProps, ButtonSize, ButtonType} from './button'

const defaultProps = {
    onClick: jest.fn()
}
const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'klass'
}
const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('test Button component', () => {
    test('should render the correct default button', async () => {
        render(<Button {...defaultProps}>Yes</Button>)
        const element = screen.getByText('Yes') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        expect(element.disabled).toBeFalsy();

        await userEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled();
    })

    test('should render the correct component based on different props', () => {
        render(<Button {...testProps}>Yes</Button>)
        const element = screen.getByText('Yes');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg klass')
    })

    test('should render a link when btnType equals link and href is provided', () => {
        render(<Button btnType={ButtonType.Link} href='http://'>Link</Button>)
        const element = screen.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn-link')
    })

    test('should render disabled button when disabled set to true', async () => {
        render(<Button {...disabledProps}>Yes</Button>)
        const element = screen.getByText('Yes') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();

        await userEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    })
})

