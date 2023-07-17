import React from 'react';
import { Card, Input, Space, Button, Form, message, AutoComplete } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { HttpStatusCode } from "axios";
import { Link } from 'react-router-dom'
import "./Login.css"


export let currentUser = {
  userID: -1,
  username: "",
  password: "",
  role: -1,
};

export const getCurrentUser = () => {
  return currentUser;
}

const Login = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    //try {
    const response = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });


    if (response.ok) {
      const data = await response.json();
      console.log("data: ", data)
      if (data.userState === 0) {
        message.error("Account has been blocked!")
      }

      else {
        // 登录成功
        // 重置表单
        form.resetFields();
        message.success("Logged in successfully!")

        currentUser.userID = data.userId
        currentUser.username = values.username
        currentUser.password = values.password
        currentUser.role = data.role            // role: 0=>普通用户 1=>管理员
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser))

        console.log("currentUser: ", currentUser)
        setTimeout(() => {
          window.location.replace('/root/homePage')
        }, 1000);
        //window.location.replace('/root/homePage')
      }
    }
    else {
      // 登录失败
      // 处理错误信息
      console.log(response.status)
      if (response.status === HttpStatusCode.Conflict) {
        message.error("Wrong username or password!")
      }
      else if (response.status === HttpStatusCode.Unauthorized) {
        message.error("User not exist!")
      }

      console.log(currentUser)
    }
    //}
    //catch (error) {
    // 处理异常
    // ...
    //    console.log(currentUser)
    //}
  };

  return (
    <Card
      // title={"Log In"}
      style={{ width: 450, height: 265, margin: "auto", top: 20 }}
    >
      <Form form={form} onFinish={handleSubmit} align={"center"}>
        <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input
            rootClassName={"Username"}
            size="large"
            placeholder="Username"
            prefix={<UserOutlined />}
            style={{ width: 300 }}
          />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password
            rootClassName={"Password"}
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
            style={{ width: 300 }}
            visibilityToggle={true}
          />
        </Form.Item>
        <Form.Item>
          <Button size={"large"} htmlType="submit">Login</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;


