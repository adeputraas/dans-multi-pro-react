import {  useEffect } from "react";
import PropTypes from "prop-types";
import instance from "../../http-common";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const { Title } = Typography;

function Login() {
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    const response = await instance
      .post("/user/login", values)
      .then((response) => response.data);
    console.log(response, "?");
    if (response.error) {
      api.open({
        message: "Error",
        description: response.response,
        duration: 3,
      });
    } else {
      localStorage.setItem("token", response.response);
      window.location ='/home';
    }
  };

  useEffect(() => {
    localStorage.clear();
  })

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {contextHolder}
      <Card style={{ width: 500 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={2}>Company Logo </Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
