import Swiper from "@/components/Swiper/index";
import "./index.scss";
import { Divider, Skeleton } from "antd";
import { getSongAPI } from "@/apis/singer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setId, fetchUrl, fetchSongInfo } from "@/store/modules/song";
import { setIsPlaying } from "@/store/modules/player";

const Like = () => {
  const [song, setSong] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getSong();
  }, []);
  const getSong = async () => {
    try {
      const res = await getSongAPI();
      setSong(res.data.songs);
    } finally {
      // 模拟网络延迟，确保骨架屏有足够的显示时间
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };
  const playSong = async (id) => {
    console.log(id);
    dispatch(setId(id));
    await dispatch(fetchUrl(id));
    await dispatch(fetchSongInfo(id));
    dispatch(setIsPlaying(true));
  };
  return (
    <div className="like">
      <h1 className="title">歌曲推荐</h1>
      <div className="tuijian">
        {loading ? (
          <div className="skeleton-container">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="skeleton-item">
                <Skeleton
                  avatar={{ shape: "square", size: 100 }}
                  title={false}
                  paragraph={false}
                  active
                />
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            className="tuijian"
            data={song}
            itemsPerPage={6}
            playSong={playSong}
          />
        )}
      </div>

      <Divider />
    </div>
  );
};

export default Like;
