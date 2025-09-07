import React from "react";
import { CrownOutlined } from "@ant-design/icons";
import { Result } from "antd";
import type { ResultProps } from "antd";

const HomePage: React.FC = () => {
  const resultProps: ResultProps = {
    icon: <CrownOutlined />,
    title: "JSON Web Token (React/Node.JS) - iotstar.vn",
  };

  return (
    <div style={{ padding: 20 }}>
      <Result {...resultProps} />
    </div>
  );
};

export default HomePage;
