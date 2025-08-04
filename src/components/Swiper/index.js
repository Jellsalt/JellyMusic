import "./index.scss";
import { PlayCircleFilled } from "@ant-design/icons";
import { useState } from "react";

function Swiper({ data, itemsPerPage, playSong }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // 确保数据不为空
  if (!data || data.length === 0) {
    return <div className="song-container">没有数据可显示</div>;
  }

  // 上一页
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // 下一页
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalPages - 1));
  };

  // 播放音乐
  const handlePlaySong = (id) => {
    playSong(id);
  };

  // 获取当前页显示的数据
  const currentData = data.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className="song-container">
      <div className="swiper">
        <ul className="in">
          {currentData.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                handlePlaySong(item.id);
              }}
            >
              <div className="img-wrap">
                <img src={item.al?.picUrl} alt={item.name || "歌曲封面"} />
                <div className="cover-mask"></div>
                <div className="play-btn">
                  <PlayCircleFilled />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="pre" onClick={prevSlide}></div>
        <div className="next" onClick={nextSlide}></div>
        <ul className="bottom">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={index === currentIndex ? "active" : ""}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Swiper;
