import { Outlet } from "react-router-dom";
import Header from "./components/layout/header.tsx";
import axios from "./utils/axios.customize.ts";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./components/contexts/auth.context.tsx";
import { Spin } from "antd";

interface UserResponse {
  email: string;
  name: string;
  message?: string;
}

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setAppLoading(true);

        const res = await axios.get<UserResponse>("/v1/api/user");
        if (res.data && !res.data.message) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.data.email,
              name: res.data.name,
            },
          });
        }
      } catch (error) {
        console.error("Fetch account error:", error);
      } finally {
        setAppLoading(false);
      }
    };

    fetchAccount();
  }, [setAuth, setAppLoading]);

  return (
    <div>
      {appLoading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </div>
  );
}

export default App;
