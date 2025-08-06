import React, { useState } from "react";
import { SearchProvider, useSearchContext } from "@/contexts/SearchContext";
import Music from "./Music";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HeartOutlined,
  HistoryOutlined,
  DownloadOutlined,
  CustomerServiceOutlined,
  BarsOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./index.scss";
import {
  Popconfirm,
  Avatar,
  Space,
  Input,
  Button,
  Layout,
  Menu,
  ConfigProvider,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;

function Home() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [keywords, setKeywords] = useState("");
  const { executeSearch } = useSearchContext();

  // 搜索歌曲
  const handleSearch = async () => {
    if (!keywords.trim()) return;
    await executeSearch(keywords);
    navigate("");
  };

  // 退出登录
  const onConfirm = () => {
    navigate("/login");
  };
  // 菜单点击事件
  const onMenuClick = (e) => {
    console.log("点击菜单项:", e.key);
    switch (e.key) {
      case "0":
        navigate("");
        break;
      case "1":
        navigate("like");
        break;
      default:
        break;
    }
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ffffffff",
        },
        components: {
          token: {
            colorPrimaryActive: "#d9d9d9",
            colorPrimaryHover: "#d9d9d9",
            colorPrimaryText: "#d9d9d9",
            colorInfoActive: "#d9d9d9",
            colorInfo: "#d9d9d9",
            colorLink: "#d9d9d9",
            colorLinkHover: "#d9d9d9",
            colorLinkActive: "#d9d9d9",
            colorPrimary: "#d9d9d9",
            colorPrimaryTextActive: "#d9d9d9",
            colorPrimaryTextHover: "#d9d9d9",
          },
          Menu: {
            itemHeight: "55px",
            itemBg: "transparent",
            itemHoverBg: "transparent",
            itemSelectedBg: "transparent",
            itemActiveBg: "transparent",
            itemHoverColor: "orange",
            itemColor: "#8c8c8c",
            itemSelectedColor: "orange",
          },
          Input: {
            activeBorderColor: "#d9d9d9",
            hoverBorderColor: "#d9d9d9",
            activeShadow: "none",
          },
          Button: {
            defaultActiveBorderColor: "transparent",
            defaultActiveColor: "#ffffff",
            defaultHoverBorderColor: "transparent",
            defaultHoverColor: "#ffffff",
            defaultGhostBorderColor: "transparent",
            defaultGhostColor: "#d9d9d9",
          },
        },
      }}
    >
      <div className=".container" style={{ height: "100vh", width: "100vw" }}>
        <Layout style={{ height: "100%" }}>
          <Layout className="layout">
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              style={{
                background:
                  "linear-gradient(0deg, #ffffcc, #91ff0099, #ffffcc)",
              }}
            >
              <div
                className="demo-logo-vertical"
                style={{
                  height: "64px",
                  lineHeight: "64px",
                  fontSize: "24px",
                  textAlign: "center",
                  color: "#bdbdbdff",
                  overflow: "hidden",
                }}
              >
                Jelly Music
              </div>

              <Menu
                mode="inline"
                defaultSelectedKeys={["0"]}
                onClick={onMenuClick}
                items={[
                  {
                    key: "0",
                    icon: <SearchOutlined />,
                    label: "搜索音乐",
                  },
                  {
                    key: "1",
                    icon: <HeartOutlined />,
                    label: "发现音乐",
                  },
                  {
                    key: "2",
                    icon: <HistoryOutlined />,
                    label: "最近播放",
                  },
                  {
                    key: "3",
                    icon: <DownloadOutlined />,
                    label: "本地和下载",
                  },
                  {
                    key: "4",
                    icon: <CustomerServiceOutlined />,
                    label: "我的播客",
                  },
                  {
                    key: "5",
                    icon: <BarsOutlined />,
                    label: "我的歌单",
                  },
                ]}
              />
            </Sider>
            <Layout
              style={{
                background:
                  "linear-gradient(180deg, #ffffcc, #91ff0077, #ffffcc)",
              }}
            >
              <Header
                style={{
                  lineHeight: "64px",
                  padding: 0,
                  background: "transparent",
                }}
              >
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                    color: "#bfbfbf",
                    float: "left",
                  }}
                />
                <Space>
                  <div style={{ position: "relative" }}>
                    <Input
                      id="search-input"
                      allowClear
                      placeholder="请输入歌曲名称"
                      prefix={<SearchOutlined onClick={handleSearch} />}
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      style={{ width: "200px" }}
                    />
                  </div>
                </Space>
                <Space
                  size={16}
                  style={{
                    height: "64px",
                    float: "right",
                    marginRight: "20px",
                  }}
                >
                  <Avatar />
                  <p style={{ color: "#565656" }}>username</p>
                  <Popconfirm
                    title="Are you sure to logout ?"
                    okText="yes"
                    cancelText="no"
                    okType="default"
                    color="#fafafa"
                    onConfirm={onConfirm}
                  >
                    <Button
                      ghost
                      icon={<LogoutOutlined />}
                      className="myButton"
                    >
                      退出登录
                    </Button>
                  </Popconfirm>
                </Space>
              </Header>
              <Content
                style={{
                  margin: "10px 10px",
                  padding: 0,
                  minHeight: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Outlet />
              </Content>
            </Layout>
          </Layout>
          <Footer
            style={{
              textAlign: "center",
              background: "linear-gradient(180deg, #ffffcc, #a1ff00)",
              margin: 0,
              padding: 0,
            }}
          >
            <Music />
          </Footer>
        </Layout>
      </div>
    </ConfigProvider>
  );
}

export default Home;
