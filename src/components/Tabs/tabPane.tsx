import React, {useContext, useEffect} from 'react'
import {TabsContext} from './tabs'
import classNames from 'classnames'

export interface TabPaneProps {
	label: string,
	disabled?: boolean,
	key: string,
	children: React.ReactNode,
	className?: string,
	style?: React.CSSProperties,
	index?: string
}

const TabPane: React.FC<TabPaneProps> = props => {
	const {onChange, handleChangeContent, defaultActiveKey} = useContext(TabsContext)

	const {className, label, children, key} = props;
	console.log(props);
	
	useEffect(() => {
		if (defaultActiveKey && defaultActiveKey === key) {
			handleChangeContent && handleChangeContent(children)
		}
	}, [])

	const classes = classNames('tabpane', className, {

	})

	const handleClick = () => {
		if (onChange) {
			onChange(key)
		}
		handleChangeContent && handleChangeContent(children)
	}

	return (
		<li className={classes} onClick={handleClick}>
			{label}
		</li>
	)
}

TabPane.displayName = 'TabPane';

export default TabPane