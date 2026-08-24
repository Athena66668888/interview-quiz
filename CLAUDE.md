# AI 面试题练习器

## 项目说明
这是一个面试题练习 Web 应用，帮助学生练习 Java、算法、数据库等面试题。

## 技术栈
- 纯 HTML + CSS + JavaScript（不使用框架）
- LocalStorage 存储数据
- ECharts 画图表
- 题库数据用 JSON 文件

## 代码规范
- 所有注释使用中文
- 变量名使用英文驼峰命名（如 questionList、answerCount）
- 文件名使用小写加横线（如 main.js、question-detail.js）
- CSS 类名使用 BEM 命名法（如 .question-card__title）
- HTML 使用语义化标签（如 header、main、section、footer）

## 目录结构
```
interview-quiz/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── main.js         # 主逻辑
│   ├── quiz.js         # 答题逻辑
│   ├── storage.js      # LocalStorage 管理
│   └── chart.js        # 图表逻辑
├── data/
│   └── questions.json  # 题库数据
└── CLAUDE.md           # 项目规范（本文件）
```

## 回复要求
- 永远用中文回复
- 修改代码前先说明要改什么
- 写代码时加中文注释
- 每次只做一个功能，做完确认后再做下一个
