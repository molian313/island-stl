---
schema_version: "3.0"
domain: printer
priority: 5
last_triggered: 2025-06-24
status: active
description: 打印机监控模块规则
trigger: 修改 printer.ts 或 printer.rs 时
---

# 打印机规则

## Core Constraints / 核心约束

- MUST 双打印机通过 `.printer-unit`（index 0）和 `.printer-unit-2`（index 1）CSS selector 区分
- MUST SVG viewBox 30×30 时 `circumference = 2 * Math.PI * 12`，JS 需同步更新
- MUST `set_printer_configs` 更新 configs 时同步重建 statuses
- MUST 配置变更通过 `watch` 通道通知 MQTT 循环重连
- NEVER 同时重置所有打印机 status（会导致不必要的 UI 刷新）

## Rationale / 理由

- 打印机状态通过 MQTT 长连接获取，配置变更需要断开重连
- 只重置被删除/新增的打印机 status，保留未变更的

## Procedure / 流程

1. 修改 SVG 尺寸：同步更新 `index.html` viewBox + `printer.ts` circumference
2. 新增打印机字段：更新 `PrinterStatus` struct + 前端 `updatePrinter()`

## Pitfalls / 陷阱

- `get_secondary_status()` 需排除 priority index，否则返回同一台
- MQTT 连接断开后 5 秒才重连，期间显示 "未连接"
