import { request } from "../utils/request";

// 搜索音乐
export const searchMusic = async (keywords, limit = 20, offset = 0) => {
  return request.get("/search", {
    params: {
      keywords,
    },
  });
};

// 获取歌曲URL
export const getSongUrl = async (id, level = "exhigh") => {
  return request.get("/song/url/v1", {
    params: {
      id,
      level,
    },
  });
};

// 获取歌曲详情
export const getSongDetail = async (ids) => {
  return request.get("/song/detail", {
    params: {
      ids,
    },
  });
};
