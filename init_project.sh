
#!/bin/bash

# 初始化项目脚本

echo "=== 初始化AI工具集合平台项目 ==="

# 安装前端依赖
echo "安装前端依赖..."
cd frontend && npm install
if [ $? -ne 0 ]; then
    echo "前端依赖安装失败"
    exit 1
fi

# 安装后端依赖
echo "安装后端依赖..."
cd ../backend && pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "后端依赖安装失败"
    exit 1
fi

# 设置环境变量
echo "设置环境变量..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "请编辑backend/.env文件配置环境变量"
fi

# 初始化数据库
echo "初始化数据库..."
python manage.py migrate
if [ $? -ne 0 ]; then
    echo "数据库初始化失败"
    exit 1
fi

# 创建超级用户
echo "创建超级用户..."
python manage.py createsuperuser --username admin --email admin@example.com

echo "=== 项目初始化完成 ==="
echo "启动开发服务器:"
echo "  后端: cd backend && python manage.py runserver"
echo "  前端: cd frontend && npm run dev"
