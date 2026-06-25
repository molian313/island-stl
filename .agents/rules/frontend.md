---
schema_version: "3.0"
domain: frontend
priority: 5
last_triggered: 2025-06-24
status: active
description: 前端开发约束（TypeScript + CSS）
trigger: 修改 src/ 或 island.css 时
---

# 前端规则

## Core Constraints / 核心约束

- MUST 无框架（Vanilla TypeScript + Vite），不引入 React/Vue
- MUST `island.css` 通过 `<link>` 加载，不经 Vite 处理
- MUST CSS 动画用 `transform`/`opacity`，不用 `width`/`height`（避免 reflow）
- MUST flex 容器内偏移用 `transform: translateX()`，不用 `margin-left`
- NEVER 给胶囊添加 hover brightness filter（GPU 合成闪烁）
- NEVER 使用 `::before` 伪元素做玻璃效果（灰色渐变带）

## Rationale / 理由

- `backdrop-filter` 在内容重绘时会短暂失效，`contain: layout paint` 可缓解
- `margin-left` 在 flex 容器中被居中计算吸收
- `::before` + `filter: blur()` 在宽面板上产生灰色渐变带

## Procedure / 流程

1. 新增模块：在 `src/modules/` 创建 `.ts` 文件
2. 在 `main.ts` 的 `init()` 中导入并调用
3. DOM 引用统一放 `dom.ts`

## Pitfalls / 陷阱

- `contain: layout paint` 会裁切 `position: absolute` 子元素
- `::before` 伪元素在展开面板上显示异常
- 硬刷新浏览器才能看到 CSS 变更（Vite HMR 有时失效）
