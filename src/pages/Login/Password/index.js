import { Button, Form, Input, message } from "antd";
import "./index.scss";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";
import { useNavigate } from "react-router-dom";

const Password = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    await dispatch(fetchLogin(values));
    navigate("/home");
    message.success("登陆成功");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="password">
      <Form
        name="basic"
        labelCol={{ span: 5, offset: 0 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateTrigger="onBlur"
        size="large"
      >
        <Form.Item
          label="手机号"
          name="mobile"
          rules={[
            {
              required: true,
              message: "请输入手机号",
            },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: "请输入正确的手机号",
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="code"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
            {
              pattern: /^\d{6}$/,
              message: "请输入正确密码",
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "50%",
              marginTop: "10px",
              backgroundColor: "#4db052a1",
              color: "#ffffffff",
            }}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Password;
