
#!/bin/bash

# 设置环境变量
export DJANGO_SETTINGS_MODULE=core.settings
export PYTHONPATH=$PYTHONPATH:$(pwd)

# 创建迁移文件
python manage.py makemigrations

# 应用迁移
python manage.py migrate

# 检查结果
if [ $? -eq 0 ]; then
    echo "Database migrations applied successfully"
else
    echo "Database migration failed"
    exit 1
fi
