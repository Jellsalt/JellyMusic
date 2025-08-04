import { useEffect, useState } from "react";
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
import { Slider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsPlaying,
  setVolume,
  setIsMuted,
} from "@/store/modules/player";
import { useAudioContext } from "@/contexts/AudioContext";

const Music = () => {
  // 当前播放的歌曲
  const song = useSelector((state) => state.song);
  // 播放器状态
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentTime = useSelector((state) => state.player.currentTime);
  const duration = useSelector((state) => state.player.duration);
  const volume = useSelector((state) => state.player.volume);
  const isMuted = useSelector((state) => state.player.isMuted);
  // 歌曲是否收藏
  const [isLiked, setIsLiked] = useState(false);
  // 调节音量
  const [volumnVisible, setVolumnVisible] = useState(false);
  const dispatch = useDispatch();
  // 导航钩子
  const navigate = useNavigate();
  // 使用音频上下文
  const { audioMethods } = useAudioContext();

  // 音量调节处理
  const handleVolumeChange = (value) => {
    dispatch(setVolume(value));
    dispatch(setIsMuted(value === 0));
    audioMethods.setVolume(value);
  };
  // 跳转到纯享界面
  const gotoEnjoy = () => {
    navigate("/enjoy");
  };

  // 音量调节切换
  const toggleVolumnVisible = () => {
    setVolumnVisible(!volumnVisible);
  };

  // 播放/暂停切换
  const togglePlay = () => {
    dispatch(setIsPlaying(!isPlaying));
    console.log("当前歌曲信息:", song);
  };

  // 切换喜欢状态
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  // 切换静音
  const toggleMute = () => {
    dispatch(setIsMuted(!isMuted));
    audioMethods.toggleMute();
  };

  // 拖动进度条改变播放位置;
  const handleProgressChange = (value) => {
    audioMethods.seek(value);
  };

  // 监听 song 的变化，更新当前歌曲信息
  useEffect(() => {
    if (song && song.id && !isPlaying) {
      dispatch(setIsPlaying(true)); // 设置为播放状态
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
                className="volumn"
                onClick={toggleVolumnVisible}
                style={{
                  fontSize: "18px",
                  paddingLeft: "50px",
                }}
              >
                {volumnVisible && (
                  <div className="slider-all">
                    <Slider
                      min={0}
                      max={1}
                      step={0.01}
                      defaultValue={volume}
                      onChange={handleVolumeChange}
                      tooltip={{ formatter: null }}
                      vertical={true}
                    />
                    {isMuted ? (
                      <MutedOutlined onClick={toggleMute} />
                    ) : (
                      <SoundOutlined onClick={toggleMute} />
                    )}
                  </div>
                )}
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
