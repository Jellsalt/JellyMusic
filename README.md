# Jelly Music

一个现代化的音乐播放器应用，基于React构建，提供优雅的用户界面和丰富的音乐体验。

## 功能特性

- 🎵 音乐搜索与播放
- 📊 分页浏览搜索结果
- 🎧 音频播放控制（播放/暂停/上一首/下一首）
- 🔍 智能搜索建议
- 🎨 现代化UI设计，基于Ant Design
- 📱 响应式布局，适配不同设备
- 💾 本地音乐收藏
- 🔄 播放模式切换（顺序播放/随机播放/单曲循环）

## 技术栈

- **前端框架**：React 19.1.0
- **状态管理**：Redux Toolkit 2.8.2
- **UI组件库**：Ant Design 5.26.6
- **路由管理**：React Router 7.7.1
- **HTTP请求**：Axios 1.11.0
- **样式处理**：SASS 1.89.2
- **构建工具**：Create React App + Craco

## 项目结构

```
/src
  /apis            - API接口封装
  /assets          - 静态资源
  /components      - 通用组件
  /contexts        - React Context
  /pages           - 页面组件
    /Enjoy         - 音乐欣赏页
    /Home          - 首页
    /Login         - 登录页
    /Start         - 启动页
  /router          - 路由配置
  /store           - Redux状态管理
  /utils           - 工具函数
  App.js           - 应用入口组件
  index.js         - 程序入口文件
```

## 快速开始

### 前提条件

- Node.js 14.0.0+ 和 npm 6.0.0+
- 现代浏览器

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/your-username/jelly-music.git
cd jelly-music
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm start
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 可用脚本

在项目目录中，可以运行：

### `npm start`

以开发模式运行应用程序。
打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看。

当你修改文件时，页面会自动重新加载。
你也可以在控制台中看到任何lint错误。

### `npm test`

以交互式监视模式启动测试运行器。
有关更多信息，请参阅关于 [运行测试](https://facebook.github.io/create-react-app/docs/running-tests) 的部分。

### `npm run build`

将应用程序构建到 `build` 文件夹中。
它正确地捆绑了生产模式下的React，并优化了构建以获得最佳性能。

构建被缩小，文件名包含哈希值。
你的应用已准备好部署！

有关更多信息，请参阅关于 [部署](https://facebook.github.io/create-react-app/docs/deployment) 的部分。

### `npm run eject`

**注意：这是一个单向操作。一旦你 `eject`，就不能回去了！**

如果你对构建工具和配置选择不满意，可以随时 `eject`。 此命令将从你的项目中删除单个构建依赖项。

相反，它会将所有配置文件和传递依赖项（webpack、Babel、ESLint等）复制到你的项目中，以便你完全控制它们。 除 `eject` 之外的所有命令仍将工作，但它们将指向复制的脚本，以便你可以调整它们。 此时你只能靠自己了。

你不必使用 `eject`。 精心策划的功能集适用于小型和中型部署，你不应感到有义务使用此功能。 但是我们理解，如果当你准备好自定义时不能自定义，那么这个工具就不会有用。

## API集成

本项目使用网易云音乐API作为后端服务。以下是集成相关的详细信息：

### 项目结构
- `NeteaseCloudMusicApi_1`: 网易云音乐 API 服务端
- `jelly-music`: 前端音乐播放器

### 如何启动

#### 1. 启动网易云音乐 API 服务
```bash
cd d:\myProject\NeteaseCloudMusicApi_1
npm install
npm start
```
服务将运行在 http://localhost:3000

#### 2. 启动 Jelly Music 前端
```bash
cd d:\myProject\jelly-music
npm install
npm start
```
前端将运行在 http://localhost:3001 (具体端口可能不同，请查看启动日志)

### 已实现功能
1. **音乐搜索**: 支持搜索歌曲、歌手、专辑等
2. **歌曲播放**: 点击搜索结果中的播放按钮可以播放歌曲
3. **歌曲详情**: 播放歌曲时会获取并显示歌曲详情
4. **分页浏览**: 支持搜索结果的分页展示
5. **音频控制**: 提供播放、暂停、上一首、下一首等控制功能

### 代码修改说明
1. 创建了 `src/apis/index.js` 文件，封装了 API 调用函数
2. 修改了 `src/utils/request.js` 文件，将请求 baseURL 指向本地 API 服务
3. 在 `src/pages/Home/index.js` 中添加了搜索功能和结果展示
4. 实现了分页逻辑，包括页码管理和每页结果数量控制

### 注意事项
1. 确保网易云音乐 API 服务先启动
2. 如果遇到跨域问题，可以在 NeteaseCloudMusicApi 服务中配置 CORS
3. 某些高级功能可能需要登录网易云音乐账号
4. 音频播放使用 React.useRef 来创建 audio 对象，以避免不必要的组件渲染

## 贡献指南

1. Fork 仓库
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 许可证

本项目采用MIT许可证。详情请见 [LICENSE](LICENSE) 文件。

---

© 2023 Jelly Music. 保留所有权利。
