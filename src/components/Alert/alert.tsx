import React, { ReactNode } from 'react';
import classNames from 'classnames';

export enum AlertType {
    Default = 'default',
    Success = 'success',
    Warning = 'warning',
}

interface CancelFunc {
    (): void
}

interface AlertProps {
    type?: AlertType,
    width?: number,
    visible: boolean,
    title?: string,
    children?: ReactNode,
    className?: string,
    onCancel?: CancelFunc
}

const Alert: React.FC<AlertProps> = props => {
    const { type, visible, title, children, className, width, onCancel } = props;

    const classes = classNames('alert', className, {
        [`alert-${type}`]: type ? true : false,
    })

    if (visible) {
        return (
            <div className={classes} style={{width: width}}>
                <div className="alert-head">
                    <h4 className='alert-head-title'>{title}</h4>
                    <p className='alert-head-close' onClick={onCancel}>关闭</p>
                </div>
                <div className="alert-body">
                    <p>{children}</p>
                </div>
            </div>
        )
    } else {
        return null
    }
}


Alert.defaultProps = {
    // type: AlertType.Default,
    visible: false,
    width: 800
}

export default Alert;