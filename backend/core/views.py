
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connections
from django.db.utils import OperationalError

class HealthCheckView(APIView):
    """
    系统健康检查端点
    """
    permission_classes = []
    
    def get(self, request):
        # 检查数据库连接
        try:
            connections['default'].cursor()
            db_status = 'healthy'
        except OperationalError:
            db_status = 'unhealthy'
        
        # 返回健康状态
        status_code = status.HTTP_200_OK if db_status == 'healthy' else status.HTTP_503_SERVICE_UNAVAILABLE
        return Response({
            'status': 'running',
            'database': db_status,
            'version': '1.0.0'
        }, status=status_code)
