
from django.core.management.base import BaseCommand
from django.db import connections
from django.db.utils import OperationalError

class Command(BaseCommand):
    help = '检查数据库连接是否正常'

    def handle(self, *args, **options):
        self.stdout.write("正在检查数据库连接...")
        db_conn = connections['default']
        try:
            db_conn.cursor()
            self.stdout.write(self.style.SUCCESS('数据库连接正常'))
        except OperationalError as e:
            self.stdout.write(self.style.ERROR(f'数据库连接失败: {e}'))
            raise
