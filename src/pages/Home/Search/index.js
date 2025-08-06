import React from "react";
import { useSearchContext } from "@/contexts/SearchContext";
import "./index.scss";
import { CaretRightOutlined } from "@ant-design/icons";
import { List, Skeleton, Alert } from "antd";
import { useDispatch } from "react-redux";
import { setId, fetchUrl, fetchSongInfo } from "@/store/modules/song";
import { setIsPlaying } from "@/store/modules/player";

function Search() {
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSearchContext();
  const songs = searchResults.songs || [];
  console.log(songs);
  const songCount = searchResults.songCount || 0;

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
        padding: "20px",
      }}
    >
      {error && (
        <Alert message="搜索错误" description={error} type="error" showIcon />
      )}

      {loading ? (
        <div style={{ width: "100%" }}>
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              title
              paragraph={{ rows: 1 }}
              active
              style={{ marginBottom: "16px" }}
            />
          ))}
        </div>
      ) : (
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
                // 列表元素的标题
                title={item.name}
                // 列表元素的描述
                description={
                  item.artists && item.artists[0] && item.artists[0].name
                    ? item.artists[0].name
                    : "未知艺术家"
                }
              />
              {item.content || ""}
            </List.Item>
          )}
        ></List>
      )}
    </div>
  );
}

export default Search;
