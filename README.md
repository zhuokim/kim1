# 电学术语记忆翻牌游戏 (Electrical Terms Memory Game)

一个基于 React 和 TypeScript 开发的记忆翻牌游戏，专门用于帮助学习电学相关的英语术语。

## 功能特点 (Features)

- 🎮 8组单词记忆游戏
- ⏱️ 实时计时功能
- 🔄 7秒预览时间
- 🎯 匹配成功动画效果
- 📊 成绩记录和排行榜
- 🔒 防作弊机制
- 👨‍💼 管理员后台
- 📱 响应式设计

## 技术栈 (Tech Stack)

- ⚛️ React 18
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🎭 Framer Motion
- 📦 PM2

## 单词列表 (Word List)

游戏包含以下13个电学相关的英语-中文词对：
1. Charge —— 电荷
2. Electron —— 电子
3. Battery —— 电池
4. Circuit —— 电路
5. Current —— 电流
6. Voltage —— 电压
7. Ammeter —— 电流表
8. Voltmeter —— 电压表
9. Switch —— 开关
10. Load —— 负载
11. Resistance —— 电阻
12. Conductor —— 导体
13. Insulator —— 绝缘体

## 安装和运行 (Installation & Running)

1. 安装依赖：
```bash
npm install
```

2. 开发模式运行：
```bash
npm start
```

3. 生产环境构建：
```bash
npm run build
```

4. 使用 PM2 运行生产版本：
```bash
pm2 serve build 3000 --name "memory-game" --spa
```

## 游戏规则 (Game Rules)

1. 选择游戏组别（1-8组）
2. 游戏开始时有7秒预览时间
3. 每次可以翻开两张卡片
4. 匹配成功的卡片会保持1秒后消失
5. 匹配失败的卡片会自动翻回
6. 完成所有匹配后显示用时
7. 成绩会自动保存到排行榜

## 管理员功能 (Admin Features)

- 查看所有成绩记录
- 按组别筛选成绩
- 查看平均完成时间
- 清除成绩记录
- 密码保护机制

## 作者 (Author)

- **Kim**
- 邮箱：zhuo.jin@mail.polimi.it

## 部署 (Deployment)

游戏默认运行在 `http://192.168.2.6:3000`，支持局域网访问。

## 开发说明 (Development Notes)

- 使用 TypeScript 确保类型安全
- 采用 Tailwind CSS 实现响应式设计
- 使用 Framer Motion 实现流畅动画
- 实现防截屏机制防止作弊
- PM2 确保服务稳定运行
