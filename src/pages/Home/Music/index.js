import { useState, useRef, useEffect } from "react";
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
  // 默认播放列表
  const playlist = [
    {
      id: 0,
      title: "Oh Tell Me Why",
      artist: "喻言",
      cover:
        "https://y.qq.com/music/photo_new/T002R300x300M000001R6tiK4PNAEo_1.jpg?max_age=2592000",
      src: "https://ws6.stream.qqmusic.qq.com/O400001RtoVO13I1ej.ogg?guid=2333318974&vkey=D03D3B2A0C4997337B19E5DE41114EB0C78B16A112E4EBF5E8101BF80F384CACBF1C008072D60FEC5AE646EF5909E522D13EDE1339120510__v2b94c10f&uin=211135200&fromtag=120532",
    },
  ];

  const song = useSelector((state) => state.song);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  // 当前播放的歌曲状态
  const [currentSong, setCurrentSong] = useState(playlist[currentSongIndex]);
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

  // 上一首;
  const prevSong = () => {
    const newIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(newIndex);
  };

  // 下一首;
  const nextSong = () => {
    const newIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(newIndex);
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
  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  // 格式化时间
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // 监听 song 的变化，更新当前歌曲信息
  useEffect(() => {
    if (song.id) {
      console.log("当前歌曲信息:", song.info.name);
      const newCover = song?.info?.al?.picUrl || currentSong.cover;
      const newTitle = song?.info?.name || currentSong.title;
      const newArtist = song?.info?.ar[0]?.name || currentSong.artist;
      const newUrl = song?.url || currentSong.src;
      setCurrentSong({
        id: song.id,
        title: newTitle,
        artist: newArtist,
        cover: newCover,
        src: newUrl,
      });
      setCurrentSongIndex(0); // 重置索引
      setCurrentTime(0); // 重置当前时间
      setDuration(0);
      if (audioRef.current) {
        audioRef.current.src = newUrl;
        audioRef.current.play();
      }
      dispatch(setIsPlaying(true)); // 设置为播放状态
    }
  }, [song]);

  // 音频源改变时播放
  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.src = currentSong.src;
  //     if (isPlaying) {
  //       audioRef.current.play();
  //     }
  //   }
  // }, [currentSong, isPlaying]);

  return (
    <div className="main">
      <div className="music">
        <audio
          src={song?.url ? song.url : currentSong.src}
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleDurationChange}
          onEnded={nextSong}
        />

        <div className="logo" onClick={gotoEnjoy}>
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className={!isPlaying ? "" : "rotate"}
          />
        </div>
        {/* 歌曲信息 */}
        <div className="all">
          <div className="info">
            <span className="songName">{currentSong.title}</span>
            <span className="singerName"> - {currentSong.artist}</span>
          </div>
          {/* 喜欢、评论、更多操作 */}
          <div className="icon">
            <ul>
              <li className="liked" onClick={toggleLike}>
                {isLiked ? (
                  <HeartFilled style={{ color: "red" }} />
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
                    color: "#f5f5f5",
                    paddingRight: "50px",
                  }}
                />
              </li>
              <li>
                <StepBackwardFilled
                  style={{ fontSize: "20px", color: "#ffffff" }}
                />
              </li>
              <li
                onClick={togglePlay}
                style={{ fontSize: "32px", color: "#ffffff" }}
              >
                {isPlaying ? <PauseOutlined /> : <CaretRightFilled />}
              </li>
              <li>
                <StepForwardFilled
                  style={{ fontSize: "20px", color: "#ffffff" }}
                />
              </li>
              <li
                onClick={toggleMute}
                style={{
                  fontSize: "18px",
                  color: "#f5f5f5",
                  paddingLeft: "50px",
                }}
              >
                {isMuted ? <MutedOutlined /> : <SoundOutlined />}
              </li>
            </ul>
          </div>
          <div className="progress">
            <div className="beginTime">{formatTime(currentTime)}</div>
            <div
              className="line"
              style={{
                position: "relative",
                width: "240px",
                margin: "0 8px",
                display: "inline-block",
              }}
            >
              <div
                className="point"
                style={{
                  left: `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
              ></div>
              <div
                className="progress-bar"
                style={{
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
              ></div>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleProgressChange}
                className="progress-range"
              />
            </div>
            <div className="endTime">{formatTime(duration || 0)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
