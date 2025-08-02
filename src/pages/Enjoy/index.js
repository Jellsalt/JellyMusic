import { useNavigate } from "react-router-dom";
import "./enjoy.scss";
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  LeftOutlined,
  SoundFilled,
  PauseOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import { setIsPlaying } from "@/store/modules/player";

function Enjoy() {
  const dispatch = useDispatch();
  // 音频引用
  const audioRef = useRef(null);
  // 当前播放歌曲
  const song = useSelector((state) => state.song);
  // 播放状态
  const isPlaying = useSelector((state) => state.player.isPlaying);
  // 导航钩子
  const navigate = useNavigate();
  // 跳转到主页
  const gotoHome = () => {
    navigate("/home");
  };
  // 播放暂停
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    dispatch(setIsPlaying(!isPlaying));
    console.log("当前歌曲信息:", song);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, []);
  return (
    <div className="enjoyContainer">
      <audio src={song?.url} ref={audioRef} />
      <div className="music-big">
        <div className="music-header">
          <div className="back">
            <LeftOutlined
              onClick={gotoHome}
              style={{ color: "#bfbfbf", fontSize: "24px", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="cover">
          <div className="img">
            <img
              className="rotate"
              src="https://y.qq.com/music/photo_new/T002R300x300M000001R6tiK4PNAEo_1.jpg?max_age=2592000"
              alt="歌曲封面"
            />
          </div>
        </div>
        <div className="cover-info">
          <span>
            <span style={{ fontSize: "18px" }}>Oh Tell Me Why</span>
            <br />
            <span style={{ fontSize: "14px" }}>喻言</span>
          </span>
          <p style={{ fontSize: "16px" }}>歌词</p>
        </div>
      </div>
      <div className="player-big">
        <div className="player-icon">
          <StepBackwardOutlined
            style={{ color: "#595959", fontSize: "36px" }}
          />
          {isPlaying ? (
            <PauseOutlined
              style={{ color: "#595959", fontSize: "48px" }}
              onClick={togglePlay}
            />
          ) : (
            <CaretRightOutlined
              style={{ color: "#595959", fontSize: "48px" }}
              onClick={togglePlay}
            />
          )}
          <StepForwardOutlined style={{ color: "#595959", fontSize: "36px" }} />
        </div>
        <div className="player-main">
          <div className="player-song">
            <div className="song-info">
              <span>Oh Tell Me Why </span>
              <span> - </span>
              <span>喻言</span>
            </div>
            <div className="song-time">
              <span>00:15</span>
              <span> / </span>
              <span>03:27</span>
            </div>
          </div>
          <div className="player-progress">
            <div className="progress-point"></div>
          </div>
        </div>
        <div className="player-volumn">
          <SoundFilled style={{ color: "#595959", fontSize: "24px" }} />
          <div className="volumn-progress">
            <div className="volumn-point"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enjoy;
