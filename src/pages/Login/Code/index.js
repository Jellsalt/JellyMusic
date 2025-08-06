import React, { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { getQrKeyAPI, createQrCodeAPI, checkQrStatusAPI } from "@/apis/user";
import "./index.scss";

const Code = () => {
  const [qrCode, setQrCode] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pollingInterval, setPollingInterval] = useState(null);
  const navigate = useNavigate();

  // 清除轮询
  const clearPolling = useCallback(() => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
  }, [pollingInterval]);

  // 获取二维码key并生成二维码
  const startPolling = useCallback(
    (key) => {
      console.log(`开始轮询检测扫码状态，key: ${key}`);
      // 先清除之前的轮询
      clearPolling();

      // 创建新的轮询
      const interval = setInterval(async () => {
        try {
          const timestamp = Date.now();
          const statusRes = await checkQrStatusAPI(key, timestamp);
          console.log("扫码状态响应:", statusRes);

          if (!statusRes?.data?.code) {
            throw new Error("状态检查响应数据异常");
          }

          const code = statusRes.data.code;

          switch (code) {
            case 800:
              setStatus("二维码已过期，请重新生成");
              clearPolling();
              break;
            case 801:
              setStatus("等待扫码中...");
              break;
            case 802:
              setStatus("请在手机上确认登录");
              break;
            case 803:
              clearPolling();
              setStatus("登录成功，正在跳转...");
              if (statusRes.data.cookie) {
                localStorage.setItem("cookie", statusRes.data.cookie);
                setTimeout(() => {
                  navigate("/home");
                }, 1000);
              }
              break;
            default:
              setStatus("扫码状态异常，请刷新重试");
              clearPolling();
              break;
          }
        } catch (error) {
          console.error("轮询检查状态出错:", error);
          message.error("检查扫码状态失败，请刷新二维码重试");
          clearPolling();
        }
      }, 1000);

      setPollingInterval(interval);
    },
    [clearPolling, navigate]
  );

  const generateQrCode = useCallback(async () => {
    try {
      setIsLoading(true);
      setStatus("正在生成二维码...");

      // 1. 获取二维码key
      const keyRes = await getQrKeyAPI(Date.now());
      if (!keyRes?.data?.data?.unikey) {
        throw new Error("获取二维码key失败");
      }

      // 2. 生成二维码
      const key = keyRes.data.data.unikey;
      const qrRes = await createQrCodeAPI(key);
      if (!qrRes?.data?.data?.qrimg) {
        throw new Error("生成二维码图片失败");
      }

      // 3. 设置二维码并开始轮询
      setQrCode(qrRes.data.data.qrimg);
      setStatus("等待扫码中...");
      startPolling(key);
    } catch (error) {
      console.error("生成二维码失败:", error);
      message.error("生成二维码失败，请重试");
      setStatus("生成失败，请重试");
      setQrCode("");
    } finally {
      setIsLoading(false);
    }
  }, [startPolling]);

  // 刷新二维码
  const refreshQrCode = useCallback(() => {
    setQrCode("");
    clearPolling();
    generateQrCode();
  }, [clearPolling, generateQrCode]);

  // 组件挂载时生成二维码
  useEffect(() => {
    generateQrCode();
    // 组件卸载时清除轮询
    return () => {
      clearPolling();
    };
  }, [generateQrCode, clearPolling]);

  return (
    <div className="qr-code-container">
      <div className="qr-code-box">
        {isLoading ? (
          <div className="loading">正在加载二维码...</div>
        ) : qrCode ? (
          <>
            <img src={qrCode} alt="登录二维码" className="qr-img" />
            <p className="status-message">{status}</p>
            <button className="refresh-btn" onClick={refreshQrCode}>
              刷新二维码
            </button>
          </>
        ) : (
          <div className="error">
            <p>二维码加载失败</p>
            <button className="refresh-btn" onClick={refreshQrCode}>
              重新加载
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Code;
