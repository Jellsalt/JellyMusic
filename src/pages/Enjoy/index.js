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
import { useRef, useEffect, useState } from "react";
import { setIsPlaying } from "@/store/modules/player";
import ProgressBar from "@/components/ProgressBar";
import { Slider, ConfigProvider } from "antd";
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
  // 进度条状态
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  // 音量状态
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
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

  // 更新当前播放时间;
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // 设置音频持续时间;
  const handleDurationChange = () => {
    setDuration(audioRef.current.duration);
  };

  // 拖动进度条改变播放位置;
  const handleProgressChange = (value) => {
    if (!audioRef.current) return;
    setIsDragging(true);
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  };

  // 处理拖动结束
  const handleDragEnd = () => {
    setIsDragging(false);
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  };

  // 音量调节处理
  const handleVolumeChange = (value) => {
    if (!audioRef.current) return;
    setVolume(value);
    setIsMuted(value === 0);
    audioRef.current.volume = value;
  };

  // 切换静音状态
  const toggleMute = () => {
    if (!audioRef.current) return;
    setIsMuted(!isMuted);
    if (!isMuted) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = volume;
    }
  };

  // 格式化时间
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (isPlaying && !isDragging && audioRef.current) {
      audioRef.current.play();
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, isDragging]);

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

  // 初始化音量和监听音量变化
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 监听静音状态变化
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [isMuted, volume]);

  // 监听歌曲变化，更新音频源
  useEffect(() => {
    if (audioRef.current && song && (song.url || song.src)) {
      const newSrc = song.url || song.src;
      // 只有当音频源发生变化时才更新
      if (audioRef.current.src !== newSrc) {
        audioRef.current.src = newSrc;
        // 重置当前时间
        setCurrentTime(0);
        // 如果当前是播放状态，则继续播放
        if (isPlaying) {
          audioRef.current
            .play()
            .catch((err) => console.error("播放失败:", err));
        }
      }
    }
  }, [song, isPlaying]);

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
        <audio
          src={song?.url || song?.src || ""}
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleDurationChange}
          onError={(e) => console.error("音频加载错误:", e)}
        />
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
