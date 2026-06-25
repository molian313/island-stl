---
schema_version: "3.0"
domain: tauri
priority: 5
last_triggered: 2025-06-24
status: active
description: Tauri 2 桌面应用开发约束
trigger: 修改 src-tauri/ 或 Cargo.toml 时
---

# Tauri 2 规则

## Core Constraints / 核心约束

- MUST Vite dev server 端口 1420（`strictPort: true`），Tauri 依赖此端口
- MUST 新增 Win32 API 需在 `Cargo.toml` 添加对应 feature flags（`windows` crate v0.61）
- MUST 文件操作走 Rust commands，不用 `@tauri-apps/plugin-fs`
- NEVER 修改 `tauri.conf.json` 的 window 配置，除非用户明确要求
- NEVER 在前端直接调用系统 API

## Rationale / 理由

Tauri 2 的安全模型要求前端通过 IPC 与 Rust 通信。直接调用系统 API 会绕过权限控制。

## Procedure / 流程

1. 新增 Rust command：在对应 `.rs` 文件定义 `#[tauri::command]`
2. 注册 command：在 `lib.rs` 的 `invoke_handler` 中添加
3. 前端调用：`import { invoke } from "@tauri-apps/api/core"`

## Pitfalls / 陷阱

- Vite 端口被占用会导致 `tauri dev` 启动失败
- 忘记注册 command 会导致前端 invoke 报错
- `windows` crate API 签名变化会导致编译失败
