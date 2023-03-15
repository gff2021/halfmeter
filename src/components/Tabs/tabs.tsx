import React, { createContext, useState } from 'react'
import classNames from 'classnames';
import {TabPaneProps} from './tabPane'

interface TabsProps {
	activeKey?: string,
	defaultActiveKey?: string,
	onChange?: (activeKey: string) => void,
	children: React.ReactNode,
	className?: string,
	style?: React.CSSProperties
}

interface ITabsContext {
	defaultActiveKey?: string,
	onChange?: (activeKey: string) => void,
	handleChangeContent?: (content: any) => void
}

export const TabsContext = createContext<ITabsContext>({});

const Tabs: React.FC<TabsProps> = props => {
	const {className, children, onChange, defaultActiveKey} = props;
	const [content, setContent] = useState()

	const classes = classNames('tabs', className, {
		
	})

	const renderChildren = () => {
		const childrenElement = React.Children.map(children, (child, index) => {
			const childElement = child as React.FunctionComponentElement<TabPaneProps>;
			const {displayName} = childElement.type
			if (displayName === 'TabPane') {
				return React.cloneElement(childElement, {
					index: index.toString()
				})
			} else {
				console.error('there is a child element which is not a TabPane');
			}
		})
		return childrenElement
	}

	const handleChangeContent = (content: any) => {
		setContent(content)
	}

	return (
		<div className={classes}>
			<div className='tabs-nav'>
				<TabsContext.Provider value={{onChange, handleChangeContent, defaultActiveKey}}>
					<ul className='tabs-nav-list'>
						{renderChildren()}
					</ul>
				</TabsContext.Provider>
			</div>
			<div className='tabs-content'>
				{content}
			</div>
		</div>
	)
}

Tabs.defaultProps = {
	defaultActiveKey: '1'
}

export default Tabs;