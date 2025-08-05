import { Card } from "antd";
import Captcha from "./Captcha";
import Code from "./Code";
import "./index.scss";
import React, { useState } from "react";

const tabList = [
  {
    key: "tab1",
    label: "手机验证码登录",
    tab: "tab1",
  },
  {
    key: "tab2",
    label: "二维码登录",
    tab: "tab2",
  },
];
const contentList = {
  tab1: <Captcha />,
  tab2: <Code />,
};
const Login = () => {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  return (
    <div className="login">
      <Card
        className="content"
        title="请登录用户"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </div>
  );
};

export default Login;
