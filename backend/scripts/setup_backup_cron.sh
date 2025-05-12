
#!/bin/bash

# 设置每天凌晨3点自动备份
CRON_JOB="0 3 * * * /bin/bash /app/scripts/backup_db.sh >> /var/log/db_backup.log 2>&1"

# 检查是否已存在该任务
(crontab -l | grep -q "backup_db.sh") && echo "Cron job already exists" || (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

# 检查结果
if [ $? -eq 0 ]; then
    echo "Cron job setup successfully:"
    crontab -l | grep "backup_db.sh"
else
    echo "Failed to setup cron job"
    exit 1
fi
