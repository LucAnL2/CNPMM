import React, { useContext, useState } from "react";
import {
  UsergroupAddOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context.tsx";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, setAuth } = useContext(AuthContext); // ✅ sửa lại
  const [current, setCurrent] = useState("home");

  console.log(">>> check auth: ", { isAuthenticated, user });

  const items = [
    {
      label: <Link to="/">Home Page</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    ...(isAuthenticated
      ? [
          {
            label: <Link to="/user">Users</Link>,
            key: "user",
            icon: <UsergroupAddOutlined />,
          },
        ]
      : []),
    {
      label: `Welcome ${user?.email ?? ""}`,
      key: "submenu",
      icon: <SettingOutlined />,
      children: [
        ...(isAuthenticated
          ? [
              {
                label: (
                  <span
                    onClick={() => {
                      localStorage.removeItem("access_token");
                      setCurrent("home");
                      setAuth({
                        isAuthenticated: false,
                        user: {
                          email: "",
                          name: "",
                        },
                      });
                      navigate("/");
                    }}
                  >
                    Đăng xuất
                  </span>
                ),
                key: "logout",
              },
            ]
          : [
              {
                label: <Link to="/login">Đăng nhập</Link>,
                key: "login",
              },
            ]),
      ],
    },
  ];

  // ✅ fix lỗi implicit any
  const onClick = (e: { key: string }) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
