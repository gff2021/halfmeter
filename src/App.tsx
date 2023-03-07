import React, { useState } from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import Menu, { Item } from './components/Menu/menu'
import SubMenu from './components/Menu/subMenu';

function App() {

  const [alertVisible, setAlertVisible] = useState(false);

  const handleShowAlert = () => {
    setAlertVisible(true)
  }

  const handleCloseAlert = () => {
    setAlertVisible(false)
  }

  // Menu onSelect
  const handleSelect = (key: React.Key) => {
    console.log(key);
  }

  return (
    <div className="App">
      <h1>Button</h1>
      <Button btnType={ButtonType.Primary} autoFocus>Primary Button</Button>
      <Button btnType={ButtonType.Default}>Default Button</Button>
      <Button btnType={ButtonType.Danger}>Danger Button</Button>
      <Button btnType={ButtonType.Link} href='http://www.baidu.com' target='_blank'>Link Button</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Primary</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>Small Primary</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Large}>Large Default</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Small}>Small Default</Button>
      <Button disabled btnType={ButtonType.Link} href='http://www.baidu.com'>Disabled Link</Button>
      <hr />

      <h1>Alert</h1>
      <Button btnType={ButtonType.Primary} onClick={handleShowAlert}>Success Alert</Button>
      <Alert title='提示' type={AlertType.Warning} visible={alertVisible} onCancel={handleCloseAlert}>Success Alert</Alert>

      <h1>Menu</h1>
      <Menu onSelect={handleSelect} defaultSelectedKeys='1' mode='vertical'>
        {/* {
          ['1', '2', '3'].map(item => <Item key={item} index={item}>菜单</Item>)
        } */}
        <Item index='1'>菜单1</Item>
        <Item index='2' disabled>菜单2</Item>
        <Item index='3'>菜单3</Item>
        <SubMenu title='dropdown'>
          <Item>123</Item>
          <Item>123</Item>
          <Item>123</Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default App;
