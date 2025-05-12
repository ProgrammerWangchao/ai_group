chcp 65001
#!/bin/bash
REM Path: start_dev_win.bat
@echo off

REM 停止开发环境脚本
echo === 停止AI工具集合平台开发环境 ===

REM 查找并停止后端服务
echo 停止后端服务...
taskkill /F /IM python.exe /FI "WINDOWTITLE eq runserver"
if %errorlevel% neq 0 (
    echo 后端服务停止失败，可能没有找到运行中的python进程或权限不足。
)

REM 查找并停止前端服务
echo 停止前端服务...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq npm"
if %errorlevel% neq 0 (
    echo 前端服务停止失败，可能没有找到运行中的node进程或权限不足。
)

echo === 服务停止完成 ===