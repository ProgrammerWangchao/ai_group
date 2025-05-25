# backend/tools/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
# from .models import Tag
# from .serializers import TagSerializer
from .models import Tool, Category, Tag 
from .serializers import ToolSerializer, CategorySerializer, TagSerializer

class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAdminUser]
