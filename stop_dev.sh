#!/bin/bash

# 停止开发环境脚本
echo "=== 停止AI工具集合平台开发环境 ==="

# 查找并停止后端服务
echo "停止后端服务..."
pkill -f "python manage.py runserver"
if [ $? -ne 0 ]; then
    echo "后端服务停止失败，可能没有找到运行中的python进程或权限不足。"
fi

# 查找并停止前端服务
echo "停止前端服务..."
pkill -f "npm run dev"
if [ $? -ne 0 ]; then
    echo "前端服务停止失败，可能没有找到运行中的npm进程或权限不足。"
fi

echo "=== 服务停止完成 ==="