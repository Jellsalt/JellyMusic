# Jelly Music 集成网易云音乐 API 说明

## 项目结构
- `NeteaseCloudMusicApi_1`: 网易云音乐 API 服务端
- `jelly-music`: 前端音乐播放器

## 如何启动

### 1. 启动网易云音乐 API 服务
```bash
cd d:\myProject\NeteaseCloudMusicApi_1
npm install
npm start
```
服务将运行在 http://localhost:3000

### 2. 启动 Jelly Music 前端
```bash
cd d:\myProject\jelly-music
npm install
npm start
```
前端将运行在 http://localhost:3001 (具体端口可能不同，请查看启动日志)

## 已实现功能
1. **音乐搜索**: 支持搜索歌曲、歌手、专辑等
2. **歌曲播放**: 点击搜索结果中的播放按钮可以播放歌曲
3. **歌曲详情**: 播放歌曲时会获取并显示歌曲详情

## 代码修改说明
1. 创建了 `src/apis/index.js` 文件，封装了 API 调用函数
2. 修改了 `src/utils/request.js` 文件，将请求 baseURL 指向本地 API 服务
3. 在 `src/pages/Home/index.js` 中添加了搜索功能和结果展示

## 注意事项
1. 确保网易云音乐 API 服务先启动
2. 如果遇到跨域问题，可以在 NeteaseCloudMusicApi 服务中配置 CORS
3. 某些高级功能可能需要登录网易云音乐账号