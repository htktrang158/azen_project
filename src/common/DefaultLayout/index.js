import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  IdcardFilled,
  UserOutlined,
  PayCircleFilled,
  SmileFilled,
  HomeFilled,
  CarFilled,
} from "@ant-design/icons";
import { Dropdown, Button, Layout, Menu, theme, Select } from "antd";
import { useEffect, useState } from "react";
import "./style.css";
import Home from "../../components/Home";
import Policy from "../../components/Policy";
import Customers from "../../components/Customers";
import Drivers from "../../components/Drivers";
import Register from "../../components/Register";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { getUserProfileService } from "../../services/authServices";
const { Header, Sider, Content } = Layout;
import { useTranslation } from "react-i18next";

const DefaultLayout = () => {
  const { i18n, t } = useTranslation();
  const translate = (lang) => {
    i18n.changeLanguage(lang);
  };
  const [collapsed, setCollapsed] = useState(false);
  const [contentComponent, setContentComponent] = useState(<Home />);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    getUserFrofile();
  }, []);
  const getUserFrofile = async () => {
    const res = await getUserProfileService();
    console.log(res);
    if (res.status !== 200) {
      navigate("/login");
    }
  };

  const handleMenuClick = (key) => {
    navigate(`${key}`);
    console.log(key);
  };
  const menu = (
    <Menu className="logout">
      <Menu.Item>
        <a href="/login">Logout</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout className="container">
      <Sider trigger={null} collapsible collapsed={collapsed} className="sider">
        <div className="home_logo">
          <img src="https://vantaianzen.vn/wp-content/uploads/2020/08/logo-chinh@4x-1-300x294.png"></img>
          <h1>ANZEN</h1>
        </div>
        <Menu
          className="navbar"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: "/home",
              icon: <HomeFilled />,
              label: t("KhuVucDonHang"),
            },

            {
              key: "/policy",
              icon: <PayCircleFilled />,
              label: t("BangKe"),
            },
            {
              key: "/customer",
              icon: <SmileFilled />,
              label: t("KhachHang"),
            },
            {
              key: "/driver",
              icon: <CarFilled />,
              label: t("TaiXe"),
            },

            {
              key: "/register",
              icon: <IdcardFilled />,
              label: t("TaoTaiKhoan"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div>
            <Select defaultValue="Language" onChange={translate}>
              <Option value="en">English</Option>
              <Option value="vi">Vietnamese</Option>
            </Select>
            <Dropdown overlay={menu} trigger={["hover"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <UserOutlined /> {}
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/driver" element={<Drivers />} />
            <Route path="/customer" element={<Customers />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Content>
        <span className="footer-home">
          {" "}
          2023 All rights reserved by 2THboys
        </span>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
