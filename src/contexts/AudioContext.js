import React, { createContext, useRef, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsPlaying, setCurrentTime, setDuration } from '@/store/modules/player';

// 创建音频上下文
const AudioContext = createContext(null);

// 音频上下文提供者组件
export const AudioProvider = ({ children }) => {
  // 创建音频引用
  const audioRef = useRef(new Audio());
  const dispatch = useDispatch();
  
  // 从Redux获取状态
  const song = useSelector(state => state.song);
  const isPlaying = useSelector(state => state.player.isPlaying);
  
  // 监听歌曲变化
  useEffect(() => {
    if (song && song.url) {
      // 只有当音频源变化时才更新
      if (audioRef.current.src !== song.url) {
        audioRef.current.src = song.url;
        dispatch(setCurrentTime(0));
      }
    } else if (!song) {
      audioRef.current.src = '';
      dispatch(setCurrentTime(0));
      dispatch(setDuration(0));
      dispatch(setIsPlaying(false));
    }
  }, [song, dispatch]);

  // 监听播放状态变化
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error('播放失败:', err);
        if (err.name === 'NotAllowedError') {
          dispatch(setIsPlaying(false));
          console.warn('由于浏览器策略限制，无法自动播放音频，请点击播放按钮开始播放');
        }
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, dispatch]);

  // 监听音频事件
  useEffect(() => {
    const audio = audioRef.current;

    // 更新当前播放时间
    const handleTimeUpdate = () => {
      dispatch(setCurrentTime(audio.currentTime));
    };

    // 设置音频持续时间
    const handleDurationChange = () => {
      dispatch(setDuration(audio.duration));
    };

    // 音频播放结束
    const handleEnded = () => {
      console.log('播放结束');
      // 这里可以添加播放结束后的逻辑
    };

    // 监听错误
    const handleError = (e) => {
      console.error('音频错误:', e);
    };

    // 添加事件监听器
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // 清理函数
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [dispatch]);

  // 提供音频控制方法
  const audioMethods = {
    play: () => audioRef.current.play(),
    pause: () => audioRef.current.pause(),
    seek: (time) => {
      audioRef.current.currentTime = time;
    },
    setVolume: (volume) => {
      audioRef.current.volume = volume;
    },
    toggleMute: () => {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  return (
    <AudioContext.Provider value={{ audioRef, audioMethods }}>
      {children}
    </AudioContext.Provider>
  );
};

// 自定义钩子，便于使用音频上下文
export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (context === null) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
};