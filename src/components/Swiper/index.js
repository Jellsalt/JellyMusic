import "./index.scss";
import { PlayCircleFilled } from "@ant-design/icons";
function Swiper() {
  return (
    <div className="song-container">
      <div className="swiper">
        <div className="in">
          <ul>
            <li>
              <div className="img-wrap">
                <img
                  src="https://y.qq.com/music/photo_new/T002R180x180M000002XDL4N3iKJVl_1.jpg?max_age=2592000"
                  alt=""
                />
                <div className="cover-mask"></div>
                <div className="play-btn">
                  <PlayCircleFilled />
                </div>
              </div>
            </li>
            <li>
              <div className="img-wrap">
                <img
                  src="https://y.qq.com/music/photo_new/T002R300x300M000001R6tiK4PNAEo_1.jpg?max_age=2592000"
                  alt=""
                />
                <div className="cover-mask"></div>
                <div className="play-btn">
                  <PlayCircleFilled />
                </div>
              </div>
            </li>
            <li>
              <div className="img-wrap">
                <img
                  src="https://y.qq.com/music/photo_new/T002R180x180M0000042Mly22OPMMg_1.jpg?max_age=2592000"
                  alt=""
                />
                <div className="cover-mask"></div>
                <div className="play-btn">
                  <PlayCircleFilled />
                </div>
              </div>
            </li>
            <li>
              <div className="img-wrap">
                <img
                  src="https://y.qq.com/music/photo_new/T002R180x180M000000czwjk473vOx_1.jpg?max_age=2592000"
                  alt=""
                />
                <div className="cover-mask"></div>
                <div className="play-btn">
                  <PlayCircleFilled />
                </div>
              </div>
            </li>
            <li>
              <div className="img-wrap">
                <img
                  src="https://y.qq.com/music/photo_new/T002R180x180M0000047oJEt0r6bnR_1.jpg?max_age=2592000"
                  alt=""
                />
                <div className="cover-mask"></div>
                <div className="play-btn">
                  <PlayCircleFilled />
                </div>
              </div>
            </li>
            <li>
              <div className="img-wrap">
                <img
                  src="https://y.qq.com/music/photo_new/T002R300x300M000001R6tiK4PNAEo_1.jpg?max_age=2592000"
                  alt=""
                />
                <div className="cover-mask"></div>
                <div className="play-btn">
                  <PlayCircleFilled />
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="pre"></div>
        <div className="next"></div>
        <div className="bottom">
          <ul>
            <li className="active"></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Swiper;
