
from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self):
        # 在这里可以添加应用启动时的初始化代码
        import users.signals  # 如果有信号处理的话
