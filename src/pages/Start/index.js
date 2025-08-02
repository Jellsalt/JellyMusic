import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/home");
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "transparent",
        borderRadius: 32,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 32px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
          alt="music"
          style={{ width: 80, marginBottom: 24 }}
        />
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#333",
            marginBottom: 16,
            letterSpacing: 2,
          }}
        >
          欢迎来到 Jelly Music
        </h2>
        <p
          style={{
            fontSize: 18,
            color: "#666",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          发现、收藏和畅听你喜欢的音乐，享受极致的听觉体验。
        </p>
        <Button
          onClick={goToLogin}
          type="primary"
          size="large"
          style={{
            borderRadius: 24,
            padding: "0 32px",
            fontSize: 18,
            background: "#eeba52ff",
          }}
        >
          立即探索
        </Button>
      </div>
    </div>
  );
}

export default Start;
