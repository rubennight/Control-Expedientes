import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    UserOutlined,
    FolderOutlined,
    FileSearchOutlined,
    FileAddOutlined
  } from '@ant-design/icons';
import {  Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import Home from './pages/Home';
import SubMenu from 'antd/es/menu/SubMenu';
import Expedientes from './pages/Expedientes';
import Personas from './pages/Personas';

function Dashboard() {
    const [collapsed, setCollapsed] = React.useState(true);
    const [selectedMenu, setSelectedMenu] = React.useState('nav1'); 
    const height = window.innerHeight;

    const handleMenuClick = (menuKey: string) => {
        setSelectedMenu(menuKey);
      };
    
    const renderContent = () => {
      switch (selectedMenu) {
        case 'nav1':
          return <div><Home /></div>;
        case 'buscarExp':
          return <div><Expedientes /></div>
        case 'personas':
          return <div><Personas /></div>
        default:
          return null;
      }
    };

    return(
    <Layout style={{ minHeight: height }}>
        <Sider trigger={null} collapsible collapsed={collapsed} theme='dark' style={{background: '#334257'}}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['nav1']}
            selectedKeys={[selectedMenu]}
            onClick={({ key }) => handleMenuClick(key)}
            style={{background: '#334257'}}
          >
            <Menu.Item key={"menu"} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)}>
            
            </Menu.Item>
            <Menu.Item key="nav1" icon={<HomeOutlined />}>
              Dashboard
            </Menu.Item>
            <SubMenu key="nav2" icon={<FolderOutlined />} title="Expedientes">
              <Menu.Item key="buscarExp" icon={<FileSearchOutlined />}>Buscar Expedientes</Menu.Item>
              <Menu.Item key="nuevoExp" icon={<FileAddOutlined />}>Agregar Expediente</Menu.Item>
            </SubMenu>
            <Menu.Item key="personas" icon={<UserOutlined />}>
              Personas
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ background: '#FFFFFF'}}>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #FFFFFF, #F0F0F0)'
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
    </Layout>
    
    )
}

export default Dashboard;