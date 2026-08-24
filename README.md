# AI 面试题练习器

> 基于 AI 编程工具（Claude Code + GLM 大模型）开发的 Java 面试题练习 Web 应用，支持答题、错题回顾、积分等级、计时统计等功能。

## 项目背景

本项目是学长布置的 AI 编程入门实践任务，要求学习 Claude Code、CC Switch、MCP、Skill 等 AI 编程工具，并按公司化流程开发一个作品用于答辩展示。

**核心思路**：人负责架构设计和决策，AI 负责代码实现。通过自然语言指令驱动 AI 完成需求分析、编码、测试、迭代的完整开发流程。

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端 | HTML + CSS + JavaScript（纯原生，不使用框架） |
| 数据存储 | localStorage（本地持久化） |
| 图表 | Canvas 手绘饼图 + 条形图 |
| AI 工具 | Claude Code + 智谱 GLM-4.5-Air 大模型 |
| 模型配置 | CC Switch（图形化模型供应商切换） |
| 版本控制 | Git + GitHub |

## 功能清单

### 核心功能
- **题库浏览** — 50 道 Java 面试题，5 大分类（Java基础、并发编程、JVM、Spring、数据库）
- **顺序答题** — 按顺序逐题作答，支持上一题/下一题导航
- **随机出题** — 随机抽取 10 题，打乱选项顺序
- **答案解析** — 每题附带详细解析说明

### 学习辅助
- **错题本** — 自动记录答错的题目，答对后自动移除
- **收藏夹** — 标记重要题目，方便复习
- **题目搜索** — 关键词搜索快速定位题目
- **答题计时** — 记录每题用时，统计页展示用时分布

### 游戏化元素
- **积分系统** — 答对加分（首次 +10，重复 +5），答错扣分（-3）
- **等级系统** — 7 个等级（Java小白 → 技术专家），进度条可视化
- **连对奖励** — 连对 3 题触发撒花特效 + 特殊庆祝贴纸，2 倍积分加成
- **连错惩罚** — 连错 3 题全屏变灰抖动特效
- **趣味贴纸** — 答对/答错显示不同可爱贴纸动画

### 数据统计
- **正确率统计** — 总体正确率 + 各分类正确率饼图
- **用时分析** — 平均/最快/最慢用时，条形图分布展示
- **等级卡片** — 当前等级、积分、升级进度

### UI/UX
- **高级灰色调主题** — 精致灰配色方案
- **暗色模式** — 一键切换深色主题
- **响应式布局** — 适配桌面和移动端
- **动画效果** — 卡片入场、按钮悬停、贴纸弹跳、撒花飘落等

## 目录结构

```
interview-quiz/
├── index.html              # 主页面（页面骨架、导航栏、主内容区）
├── css/
│   └── style.css           # 全部样式（约 33KB，含动画、主题、响应式）
├── js/
│   ├── app.js              # 核心逻辑（约 50KB，题库数据、答题、积分、特效等）
│   └── chart.js            # 图表绘制（饼图、条形图）
├── images/
│   ├── mascot.jpg           # 吉祥物图片（导航栏 Logo + 首页欢迎区）
│   ├── correct-sticker.jpg  # 答对庆祝贴纸
│   ├── wrong-sticker.jpg   # 答错鼓励贴纸
│   └── streak-sticker.jpg   # 三连击特殊庆祝贴纸
├── data/
│   └── questions.json      # 题库数据文件
├── CLAUDE.md               # Claude Code 项目规范
├── .gitignore              # Git 忽略规则
└── README.md              # 项目文档（本文件）
```

## 代码架构

### index.html — 页面骨架
- 导航栏（Logo、首页/题库/错题本/收藏夹/统计、积分显示、主题切换）
- 欢迎栏（吉祥物、答题进度、开始答题按钮、随机出题按钮）
- 分类列表 + 题目列表容器
- 全屏特效遮罩层

### js/app.js — 核心逻辑（按模块划分）

| 模块 | 说明 |
|------|------|
| 题库数据 | 50 道题内嵌在 `QUESTIONS` 数组中 |
| 状态管理 | localStorage 存储错题、收藏、连击、积分、用时等 |
| 等级系统 | `LEVELS` 数组定义 7 个等级，`getLevel()` 计算当前等级 |
| 积分计算 | `addPoints()` / `deductPoints()` 处理积分增减和连击加成 |
| 页面渲染 | `navigateTo()` 统一管理页面切换 |
| 答题逻辑 | `showQuiz()` 渲染题目，`selectOption()` 处理答题结果 |
| 特效系统 | `spawnConfetti()` 撒花，`triggerScreenEffect()` 变灰抖动 |
| 计时系统 | `startTimer()` / `stopTimer()` 记录每题用时 |
| 错题本 | `renderWrongQuestions()` 渲染错题列表 |
| 统计页面 | `renderStats()` 渲染正确率、用时、等级等统计 |

### css/style.css — 样式系统
- CSS 变量系统统一管理颜色、圆角、阴影、过渡动画
- 亮色/暗色双主题
- 响应式断点适配移动端
- 关键帧动画：`stickerPop`、`stickerShake`、`confettiFall`、`bodyShake`、`fadeInUp` 等

## 开发流程

本项目采用 AI 辅助的迭代开发模式：

1. **需求分析** — 明确功能需求，编写需求文档
2. **架构设计** — 人决定技术选型、目录结构、代码规范
3. **AI 编码** — 通过自然语言指令驱动 Claude Code 实现功能
4. **测试验证** — 浏览器中测试每个功能，截图反馈问题
5. **迭代修复** — 根据测试结果调整指令，让 AI 修复和优化
6. **代码审查** — 检查 AI 生成的代码，确保逻辑正确、风格一致

## AI 工具使用经验

### Claude Code
- AI 编程工具，支持自然语言生成代码
- 通过 `claude` 命令在终端启动
- 配合 `CLAUDE.md` 文件定义项目规范

### CC Switch
- 图形化管理 AI 模型供应商和配置
- 支持 API Key、Base URL、模型名称的切换
- 用于将 Claude Code 接入智谱 GLM 大模型

### MCP（Model Context Protocol）
- 模型上下文协议，允许 AI 访问外部系统
- 如文件系统 MCP 让 AI 读写本地文件

### Skill
- 可复用的提示词模板，用于触发特定工作流
- 封装常见操作，提高 AI 编程效率

## 踩坑经验

1. **网络问题** — 国内无法直接访问 Claude API，改用智谱 GLM 大模型通过国内 API 端点访问
2. **Token 消耗** — AI 自主搜索网页导致死循环，一次性耗尽 2000 万 Token 额度
3. **PowerShell 限制** — 默认执行策略阻止脚本运行，需改为 RemoteSigned
4. **中文乱码** — PowerShell 编码需设为 UTF-8（chcp 65001）
5. **文件写入失败** — 环境限制导致 AI 无法写入文件，需确认工作目录正确
6. **模型切换** — GLM-4-Flash 高峰期响应慢，切换为 GLM-4.5-Air 提升速度

## 题目来源

- [小林 AI 面试题](https://www.xiaolinnote.com/)
- [JavaGuide](https://javaguide.cn/)
- [二哥的 Java 之路](https://javabetter.cn/)

## 运行方式

直接用浏览器打开 `index.html` 即可，无需安装任何依赖。

```bash
# 克隆仓库
git clone https://github.com/Athena66668888/interview-quiz.git

# 进入目录
cd interview-quiz

# 用浏览器打开
start index.html
```

## License

MIT
