import { Button, Checkbox, Form, FormInstance, Input } from 'antd';
import React, { Component, createRef, RefObject } from 'react';
class Login extends Component {
  fromRef: RefObject<FormInstance>;
  constructor(props: any) {
    super(props);

    this.fromRef = createRef<FormInstance>();
  }
  render() {
    return (
      <>
        <Form
          name="normal_login"
          ref={this.fromRef}
          initialValues={{ remember: true }}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input your Username!' }
            ]}>
            <Input
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your Password!' }
            ]}>
            <Input
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </>
    );
  }
}
export default Login;
