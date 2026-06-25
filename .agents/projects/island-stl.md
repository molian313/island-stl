---
schema_version: "3.0"
project: island-stl
status: active
updated: 2025-06-24
---

# Dynamic Island for Windows

## Essentials / 基本信息

- **Path / 路径**: `C:\Users\Administrator\Desktop\css\island-stl`
- **Language / 语言**: TypeScript (前端) + Rust (后端, Tauri 2)
- **Key files / 关键入口**: `index.html` → `src/main.ts` → `src-tauri/src/lib.rs`

## Current Status / 当前状态

液态玻璃主题已集成，双打印机监控正常，配置热加载已实现。版本 1.1.0。

## Blockers / 阻塞项

无。

## Key Rules / 关键规则

- 窗口固定 500×150，borderless transparent always-on-top
- CSS glass 效果仅用 `backdrop-filter` + `border: 1px double` + 内阴影
- 打印机 SVG 30×30，stroke-width 3.2

## Key Documents / 关键文档

- `AGENTS.md` — 项目架构和命令
- `capsule-layout.md` — 胶囊尺寸权威文档
- `DESIGN.md` — 设计规范
- `PRODUCT.md` — 产品需求

## Recent Milestones / 近期里程碑

- 2025-06-24: 液态玻璃主题 + 双打印机布局调整
- 2025-06-24: 打印机配置热加载（watch 通道 + MQTT 重连）
- 2025-06-24: 版本升级到 1.1.0
