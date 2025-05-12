
#!/bin/bash

# 检查参数
if [ -z "$1" ]; then
    echo "Usage: $0 <backup_file.dump>"
    exit 1
fi

BACKUP_FILE=$1

# 检查备份文件是否存在
if [ ! -f "$BACKUP_FILE" ]; then
    echo "Backup file not found: $BACKUP_FILE"
    exit 1
fi

# 终止所有现有连接
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$DB_NAME' AND pid <> pg_backend_pid();"

# 删除并重建数据库
psql -h $DB_HOST -U $DB_USER -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
psql -h $DB_HOST -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;"

# 执行恢复
PGPASSWORD=$DB_PASSWORD pg_restore -h $DB_HOST -U $DB_USER -d $DB_NAME -v $BACKUP_FILE

# 输出结果
if [ $? -eq 0 ]; then
    echo "Database restored successfully from: $BACKUP_FILE"
else
    echo "Database restore failed"
    exit 1
fi
