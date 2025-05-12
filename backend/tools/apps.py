
from django.apps import AppConfig

class ToolsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tools'

    def ready(self):
        # 在这里可以添加应用启动时的初始化代码
        pass
