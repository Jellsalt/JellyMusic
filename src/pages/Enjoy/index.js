import { useNavigate } from "react-router-dom";
import "./enjoy.scss";
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  LeftOutlined,
  SoundFilled,
  PauseOutlined,
  MutedFilled,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  setIsPlaying,
  setVolume,
  setIsMuted,
} from "@/store/modules/player";
import ProgressBar from "@/components/ProgressBar";
import { Slider, ConfigProvider } from "antd";
import { useAudioContext } from "@/contexts/AudioContext";
function Enjoy() {
  const dispatch = useDispatch();
  // 当前播放歌曲
  const song = useSelector((state) => state.song);
  // 播放状态
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentTime = useSelector((state) => state.player.currentTime);
  const duration = useSelector((state) => state.player.duration);
  const volume = useSelector((state) => state.player.volume);
  const isMuted = useSelector((state) => state.player.isMuted);
  // 导航钩子
  const navigate = useNavigate();
  // 进度条拖动状态
  const [isDragging, setIsDragging] = useState(false);
  // 跳转歌曲ID
  const [currentSongId, setCurrentSongId] = useState(null);
  // 使用音频上下文
  const { audioMethods } = useAudioContext();
  // 跳转到主页
  const gotoHome = () => {
    navigate("/home");
  };

  // 播放暂停
  const togglePlay = () => {
    dispatch(setIsPlaying(!isPlaying));
    console.log("当前歌曲信息:", song);
  };

  // 拖动进度条改变播放位置;
  const handleProgressChange = (value) => {
    setIsDragging(true);
    audioMethods.seek(value);
  };

  // 处理拖动结束
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // 音量调节处理
  const handleVolumeChange = (value) => {
    dispatch(setVolume(value));
    dispatch(setIsMuted(value === 0));
    audioMethods.setVolume(value);
  };

  // 切换静音状态
  const toggleMute = () => {
    dispatch(setIsMuted(!isMuted));
    audioMethods.toggleMute();
  };

  // 格式化时间
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // 监听拖动结束事件
  useEffect(() => {
    const handleMouseUp = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // 监听歌曲变化
  useEffect(() => {
    if (song && song.id && !isPlaying) {
      dispatch(setIsPlaying(true));
    }
  }, [song, isPlaying, dispatch]);

  return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ffffffff",
          },
          components: {
            Slider: {
              dotSize: 6,
              handleSize: 6,
              handleSizeHover: 8,
              controlSize: 1,
              handleLineWidth: 1,
              handleLineWidthHover: 1,
              railSize: 3,
            },
          },
        }}
      >
        <div className="enjoyContainer">
        <div className="music-big">
          <div className="music-header">
            <div className="back">
              <LeftOutlined
                onClick={gotoHome}
                style={{
                  color: "#bfbfbf",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
          <div className="cover">
            <div className="img">
              <img
                className="rotate"
                src={song?.info?.al?.picUrl || song.cover}
                alt="歌曲封面"
              />
            </div>
          </div>
          <div className="cover-info">
            <span>
              <span style={{ fontSize: "18px" }}>
                {song?.info?.al?.name || song.title}
              </span>
              <br />
              <span style={{ fontSize: "14px" }}>{song.artist}</span>
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
            <StepForwardOutlined
              style={{ color: "#595959", fontSize: "36px" }}
            />
          </div>
          <div className="player-main">
            <div className="player-song">
              <div className="song-info">
                <span>{song?.info?.al?.name || song.title}</span>
                <span> - </span>
                <span>{song.artist}</span>
              </div>
              <div className="song-time">
                <span>{formatTime(currentTime)}</span>
                <span> / </span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onProgressChange={handleProgressChange}
            />
          </div>
          <div className="player-volumn">
            {isMuted ? (
              <MutedFilled className="mute-icon" onClick={toggleMute} />
            ) : (
              <SoundFilled className="mute-icon" onClick={toggleMute} />
            )}
            <Slider
              className="volumn-slider"
              defaultValue={0.7}
              onChange={handleVolumeChange}
              min={0}
              max={1}
              step={0.01}
              tooltip={{ formatter: null }}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Enjoy;
