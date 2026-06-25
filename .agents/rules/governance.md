---
schema_version: "3.0"
domain: governance
priority: 1
last_triggered: 2025-06-24
status: active
description: 项目治理规则，定义最高优先级约束
trigger: always
---

# 项目治理 / Governance

## Core Constraints / 核心约束

- MUST 用中文与用户交流
- MUST 用户要求"先不要改"时，只分析不修改
- MUST 用户对 Agent 过度修改很敏感——只做用户明确要求的改动
- NEVER 修改窗口尺寸（500×150）或圆角参数，除非用户明确要求
- NEVER 在未确认的情况下删除用户文件

## Rationale / 理由

用户明确表示不喜欢 Agent 自作主张修改代码，所有改动必须经过确认。

## Procedure / 流程

1. 收到任务后先确认理解
2. 如有不确定的地方，先问用户
3. 执行修改后告诉用户改了什么

## Pitfalls / 陷阱

- 过度修改会导致用户失去信任
- 不确认就删除文件可能丢失用户数据
