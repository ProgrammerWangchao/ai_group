
#!/bin/bash

# 备份目录
BACKUP_DIR="/var/backups/aitools"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/aitools_$TIMESTAMP.dump"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 执行备份
PGPASSWORD=$DB_PASSWORD pg_dump -h $DB_HOST -U $DB_USER -F c -b -v -f $BACKUP_FILE $DB_NAME

# 保留最近7天备份
find $BACKUP_DIR -type f -name "aitools_*.dump" -mtime +7 -exec rm {} \;

# 输出结果
if [ $? -eq 0 ]; then
    echo "Database backup completed successfully: $BACKUP_FILE"
else
    echo "Database backup failed"
    exit 1
fi
