import Swiper from "../../../components/Swiper";
import "./index.scss";
import { Divider } from "antd";
function Song() {
  return (
    <div className="recommend">
      <h1 style={{ color: "white" }}>歌 曲 推 荐</h1>
      <Divider />
      <Swiper />
      <Divider />
      <div className="song-list">
        <h1>宝藏歌曲推荐</h1>
      </div>
    </div>
  );
}

export default Song;
