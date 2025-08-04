import Swiper from "@/components/Swiper";
import "./index.scss";
import { Divider } from "antd";
import { getSongAPI } from "@/apis/singer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setId, fetchUrl, fetchSongInfo } from "@/store/modules/song";
import { setIsPlaying } from "@/store/modules/player";

const Like = () => {
  const [song, setSong] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getSong();
  }, []);
  const getSong = async () => {
    const res = await getSongAPI();
    // console.log(res.data.songs);
    setSong(res.data.songs);
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
      <Swiper data={song} itemsPerPage={6} playSong={playSong} />
      <Divider />
    </div>
  );
};

export default Like;
