chcp 65001
@echo off
setlocal EnableDelayedExpansion

REM 初始化项目脚本
echo === 初始化AI工具集合平台项目 ===
REM 安装前端依赖
REM cd frontend
REM echo ===安装前端依赖开始===
REM npm install --silent >NUL 2>&1
REM if !ERRORLEVEL! neq 0 (
REM     echo 前端依赖安装失败
REM     exit /b 1
REM )
REM echo ===安装前端依赖完成===

REM 安装后端依赖
cd backend
echo ===安装后端依赖开始===
pip install -r requirements.txt
if !ERRORLEVEL! neq 0 (
    echo 后端依赖安装失败
    exit /b 1
)
echo ===安装后端依赖完成===

pause

endlocal
