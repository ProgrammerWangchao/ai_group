
#!/bin/bash

# 生产环境部署检查脚本

echo "=== 生产环境部署检查 ==="

# 检查服务状态
check_service() {
    service=$1
    port=$2
    if nc -z localhost $port; then
        echo "[✓] $service 服务运行正常 (端口: $port)"
    else
        echo "[×] $service 服务未运行 (端口: $port)"
        return 1
    fi
}

# 检查数据库连接
check_db() {
    echo "检查数据库连接..."
    python manage.py check_db_connection
    if [ $? -eq 0 ]; then
        echo "[✓] 数据库连接正常"
    else
        echo "[×] 数据库连接失败"
        return 1
    fi
}

# 检查静态文件
check_staticfiles() {
    echo "检查静态文件..."
    if [ -d "staticfiles" ] && [ "$(ls -A staticfiles)" ]; then
        echo "[✓] 静态文件已正确收集"
    else
        echo "[×] 静态文件未收集或目录为空"
        return 1
    fi
}

# 检查所有服务
check_service "Nginx" 80
check_service "Gunicorn" 8000
check_db
check_staticfiles

# 检查API健康状态
echo "检查API健康状态..."
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/health/)
if [ "$API_STATUS" -eq 200 ]; then
    echo "[✓] API服务健康状态正常"
else
    echo "[×] API服务健康状态异常 (HTTP状态码: $API_STATUS)"
fi

echo "=== 检查完成 ==="
