import { request } from "@/utils/request";

// 获取歌手全部歌曲
// 必选参数 id: 歌手 id
export function getSongAPI() {
  return request({
    url: "/artist/top/song?id=1191044",
    method: "GET",
  });
}
