import { Card } from "antd";
import { Button, Form, Input, Row, Col } from "antd";
import { getCodeAPI, loginAPI } from "@/apis/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // 获取验证码
  const getCode = () => {
    const phone = form.getFieldValue("phone");
    try {
      const res = getCodeAPI({
        phone: phone,
      });
      console.log(res);
    } catch (error) {
      console.log("error");
    }
  };
  // 登录
  const onFinish = async (value) => {
    try {
      // 验证验证码登录
      const loginRes = await loginAPI(value);
      console.log("登录结果:", loginRes);
      navigate("/home");
    } catch (error) {
      console.error("登录失败:", error);
    }
  };
  return (
    <div
      className="login"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <Card
        className="card"
        title="手机验证登录"
        variant="borderless"
        style={{ width: 400, boxShadow: "0 2px 8px #f0f1f2" }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          validateTrigger="onBlur"
          form={form}
        >
          <Form.Item
            label="手机号"
            name="phone"
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
            <Input />
          </Form.Item>

          <Form.Item label="验证码">
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please input the captcha you got!",
                    },
                    {
                      pattern: /^\d{4}$/,
                      message: "请输入 4 位验证码",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button onClick={getCode}>获取验证码</Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
