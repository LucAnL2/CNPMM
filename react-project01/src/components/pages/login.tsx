import React, { useContext } from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { loginApi } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context.tsx";
import { ArrowLeftOutlined } from "@ant-design/icons";

// 🟢 Khai báo kiểu dữ liệu cho form
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values: LoginFormValues) => {
    const { email, password } = values;

    try {
      const res = await loginApi(email, password);
      const data = res.data; // data: LoginResponse

      if (data.EC === 0) {
        localStorage.setItem("access_token", data.access_token);

        notification.success({
          message: "LOGIN USER",
          description: "Success",
        });

        setAuth({
          isAuthenticated: true,
          user: {
            email: data.user.email,
            name: data.user.name,
          },
        });

        navigate("/");
      } else {
        notification.error({
          message: "LOGIN USER",
          description: data.EM,
        });
      }
    } catch (error) {
      notification.error({
        message: "LOGIN USER",
        description: "Something went wrong",
      });
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Đăng Nhập</legend>
          <Form<LoginFormValues> // 🟢 dùng generic cho Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>

          <Link to="/">
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>

          <Divider />

          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
