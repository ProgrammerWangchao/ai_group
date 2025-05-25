chcp 65001
@echo off
setlocal EnableDelayedExpansion

REM 初始化项目脚本
echo === 初始化AI工具集合平台项目 ===
REM 安装前端依赖
cd frontend
echo ===安装前端依赖开始===
@REM npm install --silent >NUL 2>&1
@REM if !ERRORLEVEL! neq 0 (
@REM     echo 前端依赖安装失败
@REM     exit /b 1
@REM )
echo ===安装前端依赖完成===

REM 安装后端依赖
cd ../backend
#!/usr/bin/env python3

for /f "tokens=2 delims= " %%i in ('python --version 2^>^&1') do set version=%%i
for /f "tokens=1,2 delims=." %%a in ("%version%") do set major_minor=%%a.%%b
if not "%major_minor%"=="3.10" (
    echo 当前系统安装的Python版本不是3.10，请安装Python 3.10版本。
    exit /b 1
)

echo ===安装后端依赖开始===
pip install -r requirements.txt
if !ERRORLEVEL! neq 0 (
    echo 后端依赖安装失败
    exit /b 1
)
echo ===安装后端依赖完成===

echo ==设置环境变量===
if not exist ".env" (
    copy ".\.env.example" ".\.env"
    echo 请编辑backend/.env文件配置环境变量
)
echo ==环境变量设置完成===

echo 初始化数据库...
@REM 创建数据库迁移文件
python manage.py makemigrations users
@REM 进行数据库迁移
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


endlocal
