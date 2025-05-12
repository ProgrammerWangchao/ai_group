
#!/bin/bash

# 启动开发环境脚本

echo "=== 启动AI工具集合平台开发环境 ==="

# 启动后端服务
echo "启动后端服务..."
cd backend && python manage.py runserver &
BACKEND_PID=$!

# 启动前端服务
echo "启动前端服务..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

# 捕获Ctrl+C信号
trap "kill $BACKEND_PID $FRONTEND_PID" SIGINT

echo "后端服务运行在: http://localhost:8000"
echo "前端服务运行在: http://localhost:3000"
echo "按Ctrl+C停止服务"

# 保持脚本运行
wait $BACKEND_PID $FRONTEND_PID
