import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Button, Drawer, Radio } from 'antd';

import './MyAvatar.css'
import '../utilities.css'

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const MyAvatar = (props) => {

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const showDrawer = () => {
    console.log("Drawer open");
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <Space size={16} wrap>
        <Avatar
          icon={<UserOutlined />}
          onClick={showDrawer}
          style={{ cursor: "pointer" }} />
      </Space >
      <Drawer
        title={<DrawerTitle />}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>

  );
};


export default MyAvatar;

const DrawerTitle = () => (
  <div className='u-flex u-flex-justifyCenter'>
    <Avatar
      icon={<UserOutlined />}
    // className='MyAvatar-title'
    >U</Avatar>
    <p className='MyAvatar-title'>Username</p>
  </div>

)