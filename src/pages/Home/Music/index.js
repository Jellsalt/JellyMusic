import { useState, useRef, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  EllipsisOutlined,
  StepBackwardFilled,
  CaretRightFilled,
  StepForwardFilled,
  SoundOutlined,
  MutedOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { setIsPlaying } from "@/store/modules/player";

const Music = () => {
  // 当前播放的歌曲
  const song = useSelector((state) => state.song);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // 歌曲是否收藏
  const [isLiked, setIsLiked] = useState(false);
  // 播放器状态
  const isPlaying = useSelector((state) => state.player.isPlaying);
  // 静音状态
  const [isMuted, setIsMuted] = useState(false);

  const dispatch = useDispatch();
  // 音频引用
  const audioRef = useRef(null);
  // 导航钩子
  const navigate = useNavigate();

  // 跳转到纯享界面
  const gotoEnjoy = () => {
    navigate("/enjoy");
  };

  // 播放/暂停切换
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    dispatch(setIsPlaying(!isPlaying));
    console.log("当前歌曲信息:", song);
  };

  // 切换喜欢状态
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  // 切换静音
  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
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
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  };

  // 监听 song 的变化，更新当前歌曲信息
  useEffect(() => {
    if (song && song.id) {
      setCurrentTime(0); // 重置当前时间
      setDuration(0);
      dispatch(setIsPlaying(true)); // 设置为播放状态
    } else if (!song) {
      // 当没有歌曲时，重置状态
      setCurrentTime(0);
      setDuration(0);
      dispatch(setIsPlaying(false));
      if (audioRef.current) {
        audioRef.current.src = "";
      }
    }
  }, [song, dispatch]);

  // 音频源改变时播放
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = song?.url;

      // 只有在有用户交互后才尝试播放
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error("播放失败:", err);
          // 如果是自动播放限制，提示用户
          if (err.name === "NotAllowedError") {
            dispatch(setIsPlaying(false));
            // 可以选择显示一个提示，但不要用alert影响用户体验
            console.warn(
              "由于浏览器策略限制，无法自动播放音频，请点击播放按钮开始播放"
            );
          }
        });
      }
    }
  }, [song, isPlaying, dispatch]);

  // 格式化时间
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="main">
      <div className="music">
        <audio
          src={song?.url || song?.src || ""}
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleDurationChange}
          onEnded={() => {
            console.log("播放结束");
          }}
        />

        <div className={"logo"} onClick={gotoEnjoy}>
          <img
            src={song?.info?.al?.picUrl || song.cover}
            alt={song?.info?.al?.name || song.title}
            className={isPlaying && "rotate"}
          />
        </div>
        {/* 歌曲信息 */}
        <div className="all">
          <div className="info">
            <span className="songName">
              {song?.info?.al?.name || song.title}
            </span>
            <span className="sep"> - </span>
            <span className="singerName">{song.artist}</span>
          </div>
          {/* 喜欢、评论、更多操作 */}
          <div className="icon">
            <ul>
              <li onClick={toggleLike}>
                {isLiked ? (
                  <HeartFilled style={{ color: "orange" }} />
                ) : (
                  <HeartOutlined />
                )}
              </li>
              <li>
                <MessageOutlined />
              </li>
              <li>
                <EllipsisOutlined />
              </li>
            </ul>
          </div>
        </div>
        {/* 播放器 */}
        <div className="player">
          <div className="icon">
            <ul>
              <li>
                <MutedOutlined
                  style={{
                    fontSize: "18px",
                    paddingRight: "50px",
                  }}
                />
              </li>
              <li>
                <StepBackwardFilled style={{ fontSize: "20px" }} />
              </li>
              <li onClick={togglePlay} style={{ fontSize: "32px" }}>
                {isPlaying ? <PauseOutlined /> : <CaretRightFilled />}
              </li>
              <li>
                <StepForwardFilled style={{ fontSize: "20px" }} />
              </li>
              <li
                onClick={toggleMute}
                style={{
                  fontSize: "18px",
                  paddingLeft: "50px",
                }}
              >
                {isMuted ? <MutedOutlined /> : <SoundOutlined />}
              </li>
            </ul>
          </div>
          <div className="progress-wrapper">
            <div className="beginTime">{formatTime(currentTime)}</div>
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onProgressChange={handleProgressChange}
            />
            <div className="endTime">{formatTime(duration || 0)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
