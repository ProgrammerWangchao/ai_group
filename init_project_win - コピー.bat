chcp 65001
#!/bin/bash
REM Path: start_dev_win.bat
REM Compare this snippet from init_project_win.bat:
@echo off

REM 初始化项目脚本
echo === 初始化AI工具集合平台项目 ===

REM 安装前端依赖
echo 安装前端依赖...
cd frontend
npm install
if %errorlevel% neq 0 (
    echo 前端依赖安装失败
    exit /b 1
)

REM 安装后端依赖
echo 安装后端依赖...
cd ..\backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo 后端依赖安装失败
    exit /b 1
)

REM 设置环境变量
echo 设置环境变量...
if not exist ".env" (
    copy .env.example .env
    echo 请编辑backend/.env文件配置环境变量
)

REM 初始化数据库
echo 初始化数据库...
python manage.py migrate
if %errorlevel% neq 0 (
    echo 数据库初始化失败
    exit /b 1
)

REM 创建超级用户
echo 创建超级用户...
python manage.py createsuperuser --username admin --email admin@example.com

echo === 项目初始化完成 ===
echo 启动开发服务器:
echo   后端: cd backend && python manage.py runserver
echo   前端: cd frontend && npm run dev