import { useOutletContext } from "react-router-dom";
import React from "react";
import "./index.scss";
import { CaretRightOutlined } from "@ant-design/icons";
import { List } from "antd";
import { useDispatch } from "react-redux";
import { setId, fetchUrl, fetchSongInfo } from "@/store/modules/song";
import { setIsPlaying } from "@/store/modules/player";

function Search() {
  const dispatch = useDispatch();
  const song = useOutletContext();
  const songs = song.songs || [];
  const songCount = song.songCount || 0;

  // 播放歌曲
  const playSong = async (songId) => {
    console.log("播放歌曲:", songId);
    dispatch(setId(songId));
    await dispatch(fetchUrl(songId));
    await dispatch(fetchSongInfo(songId));
    dispatch(setIsPlaying(true));
    // 这里可以添加播放歌曲的逻辑
  };

  return (
    <div
      style={{
        borderRadius: "10px",
        width: "100%",
        height: "100%",
        padding: "20px",
      }}
    >
      <List
        itemLayout="vertical"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={songs}
        footer={<div>共找到 {songCount} 首歌曲</div>}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            extra={
              <CaretRightOutlined
                style={{
                  fontSize: "30px",
                  paddingRight: "20px",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  await playSong(item.id);
                }}
              />
            }
          >
            <List.Item.Meta
              // 列表元素的图标
              avatar={<img src={item.avatar} alt={""} />}
              // 列表元素的标题
              title={item.name}
              // 列表元素的描述
              description={item.album.name}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
}

export default Search;
