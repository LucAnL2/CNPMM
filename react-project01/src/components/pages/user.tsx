import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../../utils/api";

interface User {
  _id: string;
  email: string;
  name: string;
  role?: string;
}

const UserPage = () => {
  const [dataSource, setDataSource] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserApi();
        setDataSource(res.data); // ✅ lấy danh sách user từ res.data
      } catch (err: any) {
        notification.error({
          message: "Unauthorized",
          description: err?.response?.data?.message || "Error fetching users",
        });
      }
    };

    fetchUser();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  return (
    <div style={{ padding: 30 }}>
      <Table bordered dataSource={dataSource} columns={columns} rowKey="_id" />
    </div>
  );
};

export default UserPage;
