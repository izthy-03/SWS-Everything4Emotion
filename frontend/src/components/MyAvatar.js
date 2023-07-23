import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Button, Drawer, Radio } from 'antd';

import './MyAvatar.css'
import '../utilities.css'

import { client } from '../pages/Login';

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';


const MyAvatar = (props) => {

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const [user] = useState(props.user);
  const [currentUser, setCurrentUser] = useState(true);

  useEffect(() => {

  }, []);

  const showDrawer = () => {
    console.log("Drawer open", user);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const submitLogout = (e) => {
    e.preventDefault();
    client.get(
      "/users/logout"
    ).then((res) => {
      console.log("logged out");
      sessionStorage.removeItem("userInfo");
      window.location.reload();
    });
  }


  return (
    <>
      <Space size={16} wrap>
        <Avatar
          icon={<UserOutlined />}
          onClick={showDrawer}
          style={{ cursor: "pointer" }} />
      </Space >
      <Drawer
        title={<DrawerTitle user={user} />}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <Button type="link" danger onClick={submitLogout}>
          Log out
        </Button>
      </Drawer>
    </>

  );
};


export default MyAvatar;

const DrawerTitle = (props) => (
  <div className='u-flex u-flex-justifyCenter'>
    <Avatar
      icon={<UserOutlined />}
    // className='MyAvatar-title'
    >U</Avatar>
    <p className='MyAvatar-title'>{props.user.username}</p>
  </div>

)