
#!/bin/bash

# 设置环境变量
export DJANGO_SETTINGS_MODULE=core.settings
export PYTHONPATH=$PYTHONPATH:$(pwd)

# 检查并安装依赖
pip install -r requirements.txt

# 应用数据库迁移
python manage.py migrate

# 创建超级用户（如果不存在）
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'admin')" | python manage.py shell

# 收集静态文件
python manage.py collectstatic --noinput

# 启动开发服务器
python manage.py runserver 0.0.0.0:8000
