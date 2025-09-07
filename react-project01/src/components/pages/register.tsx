import React from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { createUserApi } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

// 🟢 Khai báo type cho form values
interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormValues) => {
    const { name, email, password } = values;

    try {
      const res = await createUserApi(name, email, password);
      const data = res.data; // kiểu CreateUserResponse

      if (data.EC === 0) {
        notification.success({
          message: "CREATE USER",
          description: data.EM || "Success",
        });
        navigate("/login");
      } else {
        notification.error({
          message: "CREATE USER",
          description: data.EM || "Error",
        });
      }
    } catch (error) {
      notification.error({
        message: "CREATE USER",
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
          <legend>Đăng Ký Tài Khoản</legend>
          <Form<RegisterFormValues> // 🟢 dùng generic cho Form
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

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>

          <Link to="/">
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>

          <Divider />

          <div style={{ textAlign: "center" }}>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default RegisterPage;
